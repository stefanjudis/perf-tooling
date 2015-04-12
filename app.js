var express     = require( 'express' );
var compression = require( 'compression' );
var md5         = require( 'MD5' );
var app         = express();
var fs          = require( 'fs' );
var fuzzify     = require( './lib/fuzzify' );
var _           = require( 'lodash' );
var minify      = require( 'html-minifier' ).minify;
var config      = require( './config/config' );
var async       = require( 'async' );


/**
 * Helpers to deal with API stuff
 * @type {Object}
 */
var helpers = {
  github      : ( require( './lib/helper/github' ) ).init(),
  slideshare  : ( require( './lib/helper/slideshare' ) ).init(),
  speakerdeck : ( require( './lib/helper/speakerdeck' ) ).init(),
  twitter     : ( require( './lib/helper/twitter' ) ).init(),
  vimeo       : ( require( './lib/helper/vimeo' ) ).init(),
  youtube     : ( require( './lib/helper/youtube' ) ).init()
};

var port         = process.env.PORT || 3000;
var data         = {
  people   : {},
  articles : getList( 'articles' ),
  slides   : getList( 'slides' ),
  tools    : getList( 'tools' ),
  videos   : getList( 'videos' ),
  books    : getList( 'books' )
};


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
  helpers.github.getContributors( function( error, contributors ) {
    if ( error ) {
      return console.warn( error );
    }

    data.contributors = contributors;

    pages.index = renderPage( 'index' );
  } );
}


/**
 * Fetch github stars
 */
function fetchGithubStars() {
  var queue = [];

  _.each( data.tools, function( tool ) {
    _.forIn( tool, function( value, key ) {
      tool.stars = data.tools.stars || {};

      if (
        key !== 'description' &&
        key !== 'name' &&
        key !== 'type' &&
        key !== 'tags' &&
        key !== 'fuzzy' &&
        /github/.test( value )
      ) {
        queue.push( function( done ) {
          var project = value.replace( 'https://github.com/', '' ).split( '#' )[ 0 ];

          helpers.github.getStars(
            project,
            function( error, stars ) {
              if ( error ) {
                console.warn( 'ERROR -> fetchGithubStars' );
                console.warn( 'ERROR -> ' + project );
                console.warn( error );
                return done( null );
              }

              tool.stars[ key ] = stars;

              pages.tools = renderPage( 'tools' );

              // give it a bit of time
              // to rest and not reach the API limits
              setTimeout( function() {
                done( null );
              }, config.timings.requestDelay );
            }
          );
        } );
      }
    } );
  } );

  async.waterfall( queue, function() {
    console.log( 'DONE -> fetchGithubStars()' );
  } );
}


/**
 * Fetch twitter data
 */
function fetchTwitterUserMeta() {
  var queue = [];

  /**
   * Evaluate set authors for each entry
   * @param  {String} type entry type
   */
  function evalAuthors( type ) {
    _.each( data[ type ], function( entry ) {
      if ( entry.authors && entry.authors.length ) {
        _.each( entry.authors, function( author ) {
          if ( author.twitter ) {
            var userName = author.twitter.replace( '@', '' );

            queue.push( function( done ) {
              helpers.twitter.fetchTwitterUserData(
                userName,
                function( error, user ) {
                  if ( error ) {
                    console.warn( 'ERROR -> fetchTwitterUserData' );
                    console.warn( 'ERROR -> ' + userName );
                    console.warn( 'ERROR -> ' +  error );
                    return done( null );
                  }

                  data.people[ userName ] = user;

                  // render it again
                  // because we had a data update
                  pages.articles = renderPage( 'articles' );
                  pages.books    = renderPage( 'books' );
                  pages.slides   = renderPage( 'slides' );
                  pages.videos   = renderPage( 'videos' );

                  // give it a bit of time
                  // to rest and not reach the API limits
                  setTimeout( function() {
                    done( null );
                  }, config.timings.requestDelay );
                }
              );
            } );
          }
        } );
      }
    } );
  }

  evalAuthors( 'videos' );
  evalAuthors( 'articles' );
  evalAuthors( 'slides' );
  evalAuthors( 'books' );

  async.waterfall( queue, function() {
    console.log( 'DONE -> fetchTwitterUserMeta()' );
  } );
}


/**
 * Fetch video meta data
 */
function fetchVideoMeta() {
  var queue = [];

  _.each( data.videos, function( video ) {
    if ( video.youtubeId ) {
      queue.push( function( done ) {
        helpers.youtube.fetchVideoMeta( video.youtubeId, function( error, meta ) {
          if ( error ) {
            console.warn( 'ERROR -> youtube.fetchVideoMeta' );
            console.warn( 'ERROR -> ' + video.youtubeId );
            console.warn( 'ERROR -> ' + error );
            return done( null );
          }

          _.extend( video, meta );

          pages.videos = renderPage( 'videos' );

          // give it a bit of time
          // to rest and not reach the API limits
          setTimeout( function() {
            done( null );
          }, config.timings.requestDelay );
        } );
      } );
    }

    if ( video.vimeoId ) {
      queue.push( function( done ) {
        helpers.vimeo.fetchVideoMeta( video.vimeoId, function( error, meta ) {
          if ( error ) {
            console.warn( 'ERROR -> vimeo.fetchVideoMeta' );
            console.warn( 'ERROR -> ' + video.vimeoId );
            console.warn( 'ERROR -> ' + error );
            return done( null );
          }

          _.extend( video, meta );

          pages.videos = renderPage( 'videos' );

          // give it a bit of time
          // to rest and not reach the API limits
          setTimeout( function() {
            done( null );
          }, config.timings.requestDelay );
        } );
      } );
    }
  } );

  async.waterfall( queue, function() {
    console.log( 'DONE -> fetchVideoMeta()' );
  } );
}


/**
 * Fetch slide meta data
 */
function fetchSlideMeta() {
  var queue = [];

  _.each( data.slides, function( slide ) {
    var match = slide.url.match( /(slideshare|speakerdeck)/g );
    if ( match ) {
      queue.push( function( done ) {
        if ( helpers[ match[ 0 ] ] ) {
          helpers[ match[ 0 ] ].getMeta( slide.url, function( error, meta ) {
            if ( error ) {
              console.warn( 'ERROR -> vimeo.fetchSlideMeta' );
              console.warn( 'ERROR -> ' + slide.url );
              console.warn( 'ERROR -> ' + error );
              return done( null );
            }

            _.extend( slide, meta );

            pages.slides = renderPage( 'slides' );

            // give it a bit of time
            // to rest and not reach the API limits
            setTimeout( function() {
              done( null );
            }, config.timings.requestDelay );
          } );
        } else {
          done( null );
        }
      } );
    }
  } );

  async.waterfall( queue, function() {
    console.log( 'DONE -> fetchSlideMeta()' );
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

  entries.forEach( function( entry ) {
    if ( entry[ 0 ] !== '.' ) {
      try {
        entry = JSON.parse(
          fs.readFileSync(
            config.dataDir + '/' + type + '/' + entry,
            'utf8'
          )
        );

        entry.fuzzy  = fuzzify(
          entry,
          config.platforms
        ).replace( /http(s)?:\/\//, '' ).toLowerCase();
        entry.id     = entry.name.toLowerCase().replace( /[\s\.,:'"#\(\)|]/g, '-' );
        entry.hidden = false;

        if ( type === 'videos' ) {
          if ( entry.youtubeId ) {
            entry.html = '<div class="embed embed-16-9"><iframe width="720" height="405" src="https://www.youtube.com/embed/' + entry.youtubeId + '" frameborder="0" allowfullscreen></iframe></div>';
          }

          if ( entry.vimeoId ) {
            entry.html = '<div class="embed embed-16-9"><iframe src="//player.vimeo.com/video/' + entry.vimeoId + '" width="720" height="405" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>';
          }
        }

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
 * @param  {String} type    page type
 * @param  {Object} options optional options
 *
 * @return {String}       rendered page
 */
function renderPage( type, options ) {
  options = options || {};

  var template = ( type === 'index' ) ? 'index' : 'list';
  var list     = data[ type ] || null;

  var query    = options.query;
  var debug    = options.debug;

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
        cdn              : config.cdn,
        contributors     : data.contributors,
        debug            : !! debug,
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
          css : pageContent.hashes.css,
          js  : pageContent.hashes.js
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
 * fetch slide meta data
 */
fetchSlideMeta();


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
}, config.timings.refresh );

app.use( compression() );


/**
 * Render index page
 */
config.listPages.forEach( function( page ) {
  pages[ page ] = renderPage( page );

  app.get( '/' + page, function( req, res ) {
    if (
      req.query &&
      (
        ( req.query.q && req.query.q.length ) ||
        req.query.debug
      )
    ) {
      res.send(
        renderPage(
          page,
          {
            query : req.query.q,
            debug : req.query.debug
          }
        )
      );
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
