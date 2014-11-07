var express     = require( 'express' );
var compression = require( 'compression' );
var md5         = require( 'MD5' );
var app         = express();
var fs          = require( 'fs' );
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
  }
};

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

          renderPage( 'index' );
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

                renderPage( 'tools' );
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
 * Render index page
 */
function renderPage( type ) {
  var template = ( type === 'index' ) ? 'index' : 'list';

  pages[ type ] = minify(
    _.template(
      fs.readFileSync( config.templates[ template ] ),
      {
        css          : fs.readFileSync( './public/main.css', 'utf8' ),
        cdn          : config.cdn,
        contributors : contributors,
        partial      : function( path, options ) {
          options = options || {};

          return _.template(
            fs.readFileSync( path ),
            options
          );
        },
        site         : config.site,
        svg          : fs.readFileSync( './public/icons.svg', 'utf8' ),
        list         : data[ type ] || null,
        hash         : {
          css : md5( fs.readFileSync( './public/main.css', 'utf8' ) ),
          js  : md5( fs.readFileSync( './public/tooling.js', 'utf8' ) )
        },
        type         : type
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

setInterval( fetchGithubStars, 1000 * 60 * 60 * 12 );


/**
 * Render index page
 */
config.listPages.forEach( function( page ) {
  renderPage( page );

  app.get( '/' + page, function( req, res ) {
    res.send( pages[ page ] );
  } );
} );

renderPage( 'index' );
app.get( '/', function( req, res ) {
  res.send( pages.index );
} );

app.use( compression() );

app.use( express.static( __dirname + '/public', { maxAge : 31536000000 } ) );

app.listen( port );
