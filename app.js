var express     = require( 'express' );
var compression = require( 'compression' );
var md5         = require( 'MD5' );
var app         = express();
var fs          = require( 'fs' );
var fuzzify     = require( './lib/fuzzify' );
var _           = require( 'lodash' );
var minify      = require( 'html-minifier' ).minify;
var request     = require( 'request' );
var config      = require( './config/config' );


/**
 * Youtube API stuff
 */
var Youtube = ( require( 'youtube-api' ) );

Youtube.authenticate( {
  type : 'key',
  key  : config.youtube.token
} );


/**
 * Vimeo api stuff
 */
var Vimeo = require( 'vimeo-api' ).Vimeo;
var vimeo = new Vimeo(
  config.vimeo.clientId,
  config.vimeo.clientSecret,
  config.vimeo.accessToken
);


/**
 * Twitter api stuff
 */
if (
   config.twitter.consumer_key &&
   config.twitter.consumer_secret &&
   config.twitter.access_token &&
   config.twitter.access_token_secret
) {
  var Twit = require( 'twit' );
  var twit = new Twit( {
    consumer_key        : config.twitter.consumer_key,
    consumer_secret     : config.twitter.consumer_secret,
    access_token        : config.twitter.access_token,
    access_token_secret : config.twitter.access_token_secret
  } );
}


var port         = process.env.PORT || 3000;


var data         = {
  people   : {}
};

data.articles = getList( 'articles' );
data.slides   = getList( 'slides' );
data.tools    = getList( 'tools' );
data.videos   = getList( 'videos' );
data.books    = getList( 'books' );

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
  enhance   : fs.readFileSync( './public/enhance.js', 'utf8' ),
  hashes    : {
    css     : md5( fs.readFileSync( './public/main.css', 'utf8' ) ),
    js      : md5( fs.readFileSync( './public/tooling.js', 'utf8' ) )
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
 * Fetch twitter data
 */
function fetchTwitterUserMeta() {
  if ( twit ) {
    /**
     * Fetch twitter meta for people
     */
    function fetchTwitterUserData( userName, type ) {
      userName = userName.replace( '@', '' );

      if ( typeof data.people[ userName ] === 'undefined' ) {
        // block this entry until the response comes back
        // -> save same requests
        data.people[ userName ] = true;

        twit.get(
          '/users/show/:id',
          { id : userName },
          function( err, twitterData, res ) {
            if ( err ) {
              return console.log( err );
            }

            data.people[ userName ] = {
              description   : twitterData.description,
              followerCount : twitterData.followers_count,
              image         : twitterData.profile_image_url
            }

            pages.articles = renderPage( 'articles' );
            pages.books    = renderPage( 'books' );
            pages.slides   = renderPage( 'slides' );
            pages.videos   = renderPage( 'videos' );
        } );
      }
    }

    /**
     * Evaluate set authors for each entry
     * @param  {String} type entry type
     */
    function evalAuthors( type ) {
      _.each( data[ type ], function( entry ) {
        if ( entry.authors.length ) {
          _.each( entry.authors, function( author ) {
            if ( author.twitter ) {
              fetchTwitterUserData( author.twitter, type );
            }
          } );
        }
      } );
    }

    evalAuthors( 'videos' );
    evalAuthors( 'articles' );
    evalAuthors( 'slides' );
    evalAuthors( 'books' );
  } else {
    console.log( 'Twitter tokens missing' );
  }
}


/**
 * Fetch video meta data
 */
function fetchVideoMeta() {
  var youtubeNotificationShown = false;
  var vimeoNotificationShown   = false;

  _.each( data.videos, function( video ) {
    if ( config.youtube.token ) {
      if ( video.youtubeId ) {
        Youtube.videos.list( {
          part : 'snippet,statistics',
          id   : video.youtubeId
        }, function( error, data ) {
          if ( error ) {
            console.log( 'ERROR IN YOUTUBE API CALL' );
            console.log( error );

            return;
          }

          if ( data.items.length ) {
            video.publishedAt = new Date( data.items[ 0 ].snippet.publishedAt );
            video.thumbnail   =  {
              url    : data.items[ 0 ].snippet.thumbnails.medium.url,
              width  : data.items[ 0 ].snippet.thumbnails.medium.width,
              height : data.items[ 0 ].snippet.thumbnails.medium.height
            };
            video.stats       = {
              viewCount    : data.items[ 0 ].statistics.viewCount,
              likeCount    : data.items[ 0 ].statistics.likeCount,
              dislikeCount : data.items[ 0 ].statistics.dislikeCount
            };
            video.title       = data.items[ 0 ].snippet.title;
            video.url         = 'https://www.youtube.com/watch?v=' + video.youtubeId;

            pages.videos = renderPage( 'videos' );
          } else {
            console.log( 'No video matching the YoutubeId' );
          }
        } );
      }
    } else {
      if ( !youtubeNotificationShown ) {
        console.log( 'No Youtube token set!!!' );

        youtubeNotificationShown = true;
      }
    }

    if (
      config.vimeo.clientId &&
      config.vimeo.clientSecret &&
      config.vimeo.accessToken
    ) {
      if ( video.vimeoId ) {
        vimeo.request( {
          path : '/videos/' + video.vimeoId
        }, function( error, body, statusCode ) {
          if ( error ) {
            console.log( 'ERROR IN VIMEO API CALL' );
            console.log( error );
            console.log( statusCode );

            return;
          }

          video.duration    = body.duration / 60;
          video.publishedAt = new Date( body.created_time );
          video.thumbnail   = {
            url    : body.pictures.sizes[ 2 ].link,
            width  : body.pictures.sizes[ 2 ].width,
            height : body.pictures.sizes[ 2 ].height
          };
          video.stats       = {
            viewCount : body.stats.plays,
            likeCount : body.metadata.connections.likes.total
          };
          video.title       = body.name;
          video.url         = body.link;

          pages.videos = renderPage( 'videos' );
        } );
      }
    } else {
      if ( !vimeoNotificationShown ) {
        console.log( 'Vimeo credentials not set!!!' );

        vimeoNotificationShown = true;
      }
    }
  } );
}


/**
 * Read files and get tools
 *
 * @param {String} type type
 *
 * @return {Object} tools
 */
function getList( type ) {
  var list                 = [];
  var entries              = fs.readdirSync( config.dataDir + '/' + type );
  var oldAuthorFormatCount = 0;

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
          config.platforms
        ).replace( /http(s)?:\/\//, '' ).toLowerCase();
        entry.hidden = false;

        list.push( entry );
      } catch( e ) {
        console.log( entry );
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

    list   = _.cloneDeep( list ).map( function( entry ) {
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

  /**
   * Partial function to enable partials
   * in lodash templates
   *
   * @param  {String} path    file path
   * @param  {Object} options options for lodash templates
   * @return {String}         rendered partial
   */
  function partial( path, options ) {
    options = options || {};

    return _.template(
      fs.readFileSync( path ),
      options
    );
  }

  return minify(
    _.template(
      pageContent.templates[ template ],
      {
        css              : pageContent.css,
        enhance          : pageContent.enhance,
        cdn              : config.cdn,
        contributors     : contributors,
        partial          : partial,
        people           : data.people,
        platforms        : config.platforms,
        resourceCount    : {
          tools    : data.tools.length,
          articles : data.articles.length,
          videos   : data.videos.length,
          slides   : data.slides.length,
          books    : data.books.length
        },
        site             : config.site,
        svg              : pageContent.svg,
        list             : list,
        hash             : {
          css     : pageContent.hashes.css,
          js      : pageContent.hashes.js
        },
        query            : query,
        type             : type
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
 * Render all page layout with current data
 * @return {[type]} [description]
 */
function renderAllPages() {
  pages.index    = renderPage( 'index' );
  pages.articles = renderPage( 'articles' );
  pages.books    = renderPage( 'books' );
  pages.slides   = renderPage( 'slides' );
  pages.tools    = renderPage( 'tools' );
  pages.videos   = renderPage( 'videos' );
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
 * fetch twitter user meta data
 */
fetchTwitterUserMeta();

/**
 * Repeat the fetching all 12 hours
 */
setInterval( function() {
  fetchGithubStars();
  fetchVideoMeta();
  fetchTwitterUserMeta();
}, 1000 * 60 * 60 * 12 );

app.use( compression() );


/**
 * Render index page
 */
config.listPages.forEach( function( page ) {
  pages[ page ] = renderPage( page );

  app.get( '/' + page, function( req, res ) {
    res.send( renderPage( page, req.query.q ) );
  } );
} );

pages.index = renderPage( 'index' );

app.get( '/', function( req, res ) {
  res.send( pages.index );
} );

app.use( express.static( __dirname + '/public', { maxAge : 31536000000 } ) );

app.listen( port );
