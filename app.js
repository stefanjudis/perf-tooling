var express     = require( 'express' );
var compression = require( 'compression' );
var md5         = require( 'MD5' );
var app         = express();
var fs          = require( 'fs' );
var _           = require( 'lodash' );
var minify      = require( 'html-minifier' ).minify;
var request     = require( 'request' );
var config      = {
  dirs      : {
    tools : './tools'
  },
  github    : {
    id    : process.env.GITHUB_ID,
    token : process.env.GITHUB_TOKEN
  },
  site      : {
    name : 'Performance tooling today'
  },
  templates : {
    index : './templates/index.tpl'
  }
}

var port         = process.env.PORT || 3000;
var tools        = getTools();

/**
 * List of contributors
 * will be fetched async
 */
var contributors;


/**
 * index page
 * that will be refreshed
 * continuously
 */
var indexPage;

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
        if ( !error && response && response.statusCode == 200 ) {
          try {
            contributors = JSON.parse( body );
          } catch( e ) {
            console.log( error );
            console.log( response );
            console.log( e );
          }
        }
      }
    );
  } else {
    console.log( 'No Github id and token set!!!' );
  }
}

var i = 0;

/**
 * Fetch github stars
 */
function fetchGithubStars() {
  _.each( tools, function( tool ) {
    _.forIn( tool, function( value, key ) {
      tool.stars = tools.stars || {};

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

                renderIndex();
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
function getTools() {
  var tools = [];
  var types = fs.readdirSync( config.dirs.tools );

  types.forEach( function( type ) {
    var entries = fs.readdirSync( config.dirs.tools + '/' + type );
    tools[ type ] = {};

    entries.forEach( function( entry ) {
      try {
        entry = JSON.parse(
          fs.readFileSync(
            config.dirs.tools + '/' + type + '/' + entry,
            'utf8'
          )
        );

        entry.type = type;

        tools.push( entry );
      } catch( e ) {
        console.log( 'SHITTTTT' );
        console.log( e );
      }
    } );
  } );

  return tools;
}


/**
 * Render index page
 */
function renderIndex() {
  indexPage = minify(
    _.template(
      fs.readFileSync( config.templates.index ),
      {
        contributors : contributors,
        site         : config.site,
        tools        : _.reduce( tools, function( sum, tool ) {
          if ( sum[ tool.type ] === undefined ) {
            sum[ tool.type ] = [];
          }

          sum[ tool.type ].push( tool );

          return sum;
        }, {} ),
        hash         : {
          css : md5( fs.readFileSync( './public/main.css', 'utf8' ) ),
          js  : md5( fs.readFileSync( './public/tooling.js', 'utf8' ) )
        }
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
 * Static files options
 * @type {Object}
 */
var options = {
  dotfiles   : 'ignore',
  etag       : false,
  maxAge     : '1y',
  redirect   : false,
  setHeaders : function ( res, path ) {
    res.set( 'x-timestamp', Date.now() )
  }
};

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
renderIndex();

app.use( compression() );

app.use( express.static( __dirname + '/public', { maxAge : 31536000000 } ) );

app.get( '/', function( req, res ) {
  res.send( indexPage );
} );

app.listen( port );
