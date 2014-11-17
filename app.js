var express     = require( 'express' );
var compression = require( 'compression' );
var md5         = require( 'MD5' );
var app         = express();
var fs          = require( 'fs' );
var fuzzify     = require( './lib/fuzzify' );
var _           = require( 'lodash' );
var minify      = require( 'html-minifier' ).minify;
var request     = require( 'request' );
var config      = {
  cdn       : process.env.CDN_URL || '',
  dataDir   : 'data',
  listPages : [ 'articles', 'slides', 'tools', 'videos' ],
  github    : {
    id    : process.env.GITHUB_ID,
    token : process.env.GITHUB_TOKEN
  },
  site      : {
    name : 'Performance tooling today'
  },
  templates : {
    index : './templates/index.tpl',
    list  : './templates/list.tpl'
  },
  youtube : {
    token : process.env.YOUTUBE_TOKEN
  }
};

var Youtube = ( require( 'youtube-api' ) );

Youtube.authenticate( {
  type : 'key',
  key  : config.youtube.token
} );

var port         = process.env.PORT || 3000;

// TODO loop this
var data         = {
  articles : getList( 'articles' ),
  slides   : getList( 'slides' ),
  tools    : getList( 'tools' ),
  videos   : getList( 'videos' )
};

/**
 * List of contributors
 * will be fetched async
 */
var contributors;


/**
 * pages object representing
 * all routes
 */
var pages = {
  index    : null,
  tools    : null,
  articles : null,
  slides   : null,
  videos   : null
};


/**
 * Reduce I/O and read files only on start
 */
var pageContent = {
  css       : fs.readFileSync( './public/main.css', 'utf8' ),
  hashes    : {
    css : md5( fs.readFileSync( './public/main.css', 'utf8' ) ),
    js  : md5( fs.readFileSync( './public/tooling.js', 'utf8' ) )
  },
  svg       : fs.readFileSync( './public/icons.svg', 'utf8' ),
  templates : {
    index : fs.readFileSync( config.templates.index ),
    list  : fs.readFileSync( config.templates.list )
  }
};


/**
 * Fetch list of contributors
 */
function fetchContributors() {
  if ( config.github.id && config.github.token ) {
    request(
      {
        url     : 'https://api.github.com/repos/stefanjudis/perf-tooling/contributors?client_id=' + config.github.id + '&client_secret=' + config.github.token,
        headers : {
          'User-Agent' : 'perf-tooling.today'
        }
      },
      function( error, response, body ) {
        if ( !error && response && response.statusCode === 200 ) {
          try {
            contributors = JSON.parse( body );
          } catch( e ) {
            contributors = false;
            console.log( error );
            console.log( response );
            console.log( e );
          }

          pages.index = renderPage( 'index' );
        }
      }
    );
  } else {
    console.log( 'No Github id and token set!!!' );
  }
}


/**
 * Fetch github stars
 */
function fetchGithubStars() {
  _.each( data.tools, function( tool ) {
    _.forIn( tool, function( value, key ) {
      tool.stars = data.tools.stars || {};

      if ( config.github.id && config.github.token ) {
        if (
          key !== 'description' &&
          key !== 'name' &&
          key !== 'type' &&
          key !== 'tags' &&
          key !== 'fuzzy' &&
          /github/.test( value )
        ) {
          var url = 'https://api.github.com/repos/' +
                      value.replace( 'https://github.com/', '' ).split( '#' )[ 0 ] +
                      '?client_id=' + config.github.id +
                      '&client_secret=' + config.github.token;

          request(
            {
              url     : url,
              headers : {
                'User-Agent' : 'perf-tooling.today'
              }
            },
            function( error, response, body ) {
              if ( !error && response && response.statusCode === 404 ) {
                console.log( 'NOT FOUND: ' + url );
              }

              try {
                var stars = JSON.parse( body ).stargazers_count;
                tool.stars[ key ] = stars;

                pages.tools = renderPage( 'tools' );
              } catch( e ) {
                console.log( error );
                console.log( response );
                console.log( e );
              }
            }
          );
        }
      }
    } );
  } );
}


/**
 * Fetch video meta data
 */
function fetchVideoMeta() {
  if ( config.youtube.token ) {
    _.each( data.videos, function( video ) {
      Youtube.videos.list( {
        part : 'snippet,statistics',
        id   : video.youtubeId
      }, function( error, data ) {
        if ( error ) {
          console.log( error );

          return;
        }

        video.meta = data.items[ 0 ].snippet;
        video.stats = data.items[ 0 ].statistics;

        pages.videos = renderPage( 'videos' );
      } );
    } );
  } else {
    console.log( 'No Youtube token set!!!' );
  }
}


/**
 * Read files and get tools
 *
 * @return {Object} tools
 */
function getList( type ) {
  var list = [];
  var entries = fs.readdirSync( config.dataDir + '/' + type );

  entries.forEach( function( entry ) {
    if ( entry[ 0 ] !== '.' ) {
      try {
        entry = JSON.parse(
          fs.readFileSync(
            config.dataDir + '/' + type + '/' + entry,
            'utf8'
          )
        );

        entry.fuzzy = fuzzify(
          entry,
          [ 'bookmarklet', 'chrome', 'firefox', 'internetExplorer', 'safari', 'mac', 'windows', 'linux', 'cli', 'module', 'grunt', 'gulp', 'script', 'service' ]
        ).toLowerCase();
        entry.hidden = false;

        list.push( entry );
      } catch( e ) {
        console.log( 'SHITTTTT' );
        console.log( e );
      }
    }
  } );

  return list;
}


/**
 * Render page
 *
 * @param  {String} type  page type
 * @param  {String} query optional search query
 *
 * @return {String}       rendered page
 */
function renderPage( type, query ) {
  var template = ( type === 'index' ) ? 'index' : 'list';
  var list     = data[ type ] || null;

  if ( query ) {
    var queryValues  = query.split( ' ' );
    var length       = queryValues.length;

    list   = list.map( function( entry ) {
      var i      = 0;
      var match  = true;

      for( ; i < length; ++i ) {
        if ( entry.fuzzy.indexOf( queryValues[ i ].toLowerCase() ) === -1 ) {
          match = false;
        }
      }

      entry.hidden = !match;

      return entry;
    } );
  }

  return minify(
    _.template(
      pageContent.templates[ template ],
      {
        css           : pageContent.css,
        cdn           : config.cdn,
        contributors  : contributors,
        partial       : function( path, options ) {
          options = options || {};

          return _.template(
            fs.readFileSync( path ),
            options
          );
        },
        resourceCount : {
          tools    : data.tools.length,
          articles : data.articles.length,
          videos   : data.videos.length,
          slides   : data.slides.length
        },
        site          : config.site,
        svg           : pageContent.svg,
        list          : list,
        hash          : {
          css : pageContent.hashes.css,
          js  : pageContent.hashes.js
        },
        query         : query,
        type          : type
      }
    ), {
      keepClosingSlash      : true,
      collapseWhitespace    : true,
      minifyJS              : true,
      removeAttributeQuotes : true,
      removeComments        : true,
      removeEmptyAttributes : true,
      useShortDoctype       : true
    }
  );
}


/**
 * Fetch contributors
 */
fetchContributors();


/**
 * Fetch Github stars
 */
fetchGithubStars();


/**
 * fetch video meta data
 */
fetchVideoMeta();


/**
 * Repeat the fetching all 12 hours
 */
setInterval( function() {
  fetchGithubStars();
  fetchVideoMeta();
}, 1000 * 60 * 60 * 12 );

app.use( compression() );


/**
 * Render index page
 */
config.listPages.forEach( function( page ) {
  pages[ page ] = renderPage( page );

  app.get( '/' + page, function( req, res ) {
    if ( req.query && req.query.q && req.query.q.length ) {
      res.send( renderPage( page, req.query.q ) );
    } else {
      res.send( pages[ page ] );
    }
  } );
} );

pages.index = renderPage( 'index' );

app.get( '/', function( req, res ) {
  res.send( pages.index );
} );

app.use( express.static( __dirname + '/public', { maxAge : 31536000000 } ) );

app.listen( port );
