var express = require( 'express' );
var app     = express();
var fs      = require( 'fs' );
var _       = require( 'lodash' );
var Promise = require( 'bluebird' );
var request = Promise.promisify( ( require( 'request' ) ) );
var config  = {
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
var tools   = getTools();

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
var indexPage = _.template(
  fs.readFileSync( config.templates.index ),
  {
    site  : config.site,
    tools : tools
  }
);


var options = {
  dotfiles   : 'ignore',
  etag       : false,
  maxAge     : '1y',
  redirect   : false,
  setHeaders : function ( res, path ) {
    res.set( 'x-timestamp', Date.now() )
  }
};

app.use( express.static( 'css' ) );

app.get( '/', function( req, res ) {
  res.send( indexPage );
} );
