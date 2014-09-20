var express     = require( 'express' );
var compression = require( 'compression' );
var md5         = require( 'MD5' );
var app         = express();
var fs          = require( 'fs' );
var _           = require( 'lodash' );
var minify      = require( 'html-minifier' ).minify;
var config      = {
  dirs      : {
    tools : './tools'
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
 * Read files and get tools
 *
 * @return {Object} tools
 */
function getTools() {
  var tools = {};
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

        tools[ type ][ entry.name ] = entry;
      } catch( e ) {
        console.log( 'SHITTTTT' );
        console.log( e );
      }
    } );
  } );

  return tools;
}


/**
 * Rendered index page
 * @type {String}
 */
var indexPage = minify(
  _.template(
    fs.readFileSync( config.templates.index ),
    {
      site  : config.site,
      tools : tools,
      hash  : {
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

app.use( compression() );

app.use( express.static( __dirname + '/public', { maxAge : 31536000000 } ) );

app.get( '/', function( req, res ) {
  res.send( indexPage );
} );

app.listen( port );
