const _            = require( 'lodash' );
const async        = require( 'async' );
const fs           = require( 'fs' );
const minify       = require( 'html-minifier' ).minify;
const config       = require( './config/config' );
const fuzzify      = require( './lib/fuzzify' );
const revisions    = require( './rev.json' );

/**
 * Helpers to deal with API stuff
 * @type {Object}
 */
const helpers = {
  github      : ( require( './lib/helper/github' ) ).init(),
  slideshare  : ( require( './lib/helper/slideshare' ) ).init(),
  speakerdeck : ( require( './lib/helper/speakerdeck' ) ).init(),
  twitter     : ( require( './lib/helper/twitter' ) ).init(),
  vimeo       : ( require( './lib/helper/vimeo' ) ).init(),
  youtube     : ( require( './lib/helper/youtube' ) ).init()
};

const port         = process.env.PORT || 3000;
const data         = config.listPages.reduce( ( data, listPage ) => {
  data[ listPage ] = getList( listPage );

  return data;
}, { people   : {} } );

/**
 * Demo tool object containing all available properties
 * @type {Object}
 */
const demoTool = {
  name        : '_DEMO TOOL_',
  id          : '_DEMO TOOL_'.toLowerCase().replace( /[\s\.,:'"#\(\)|]/g, '-' ),
  description : 'A demo tool displaying all available platforms',
  tags        : [ 'images', 'css', 'perf', '60fps', 'http2', 'network' ],
  fuzzy       : '',
  hidden      : false,
  stars       : {}
};

/**
 * pages object representing
 * all routes
 */
const pages = config.listPages.reduce( ( pages, listPage ) => {
  pages[ listPage ] = null;

  return pages;
}, { index : null } );


/**
 * Reduce I/O and read files only on start
 */
const pageContent = {
  css       : fs.readFileSync( './public/main-' + revisions.styles + '.css', 'utf8' ),
  enhance   : fs.readFileSync( './public/enhance.js', 'utf8' ),
  hashes    : {
    css     : revisions.styles,
    js      : revisions.scripts,
    svg     : revisions.svg
  },
  templates : {
    index : fs.readFileSync( config.templates.index ),
    list  : fs.readFileSync( config.templates.list )
  }
};


/**
 * Fetch list of contributors
 */
function fetchContributors() {
  helpers.github.getContributors( ( error, contributors ) => {
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
  const queue = [];

  data.tools.forEach( tool => {
    for( let prop in tool ) {
      tool.stars = data.tools.stars || {};

      if (
        tool[prop].url &&
        /github/.test( tool[prop].url )
      ) {
        queue.push( done => {
          const project = tool[prop].url.replace( 'https://github.com/', '' ).split( '#' )[ 0 ];

          helpers.github.getStars(
            project,
            ( error, stars ) => {
              if ( error ) {
                console.warn( 'ERROR -> fetchGithubStars' );
                console.warn( 'ERROR -> ' + project );
                console.warn( error );
                return done( null );
              }

              tool.stars[ prop ] = stars;

              pages.tools = renderPage( 'tools' );

              // give it a bit of time
              // to rest and not reach the API limits
              setTimeout( () => done( null ), config.timings.requestDelay );
            }
          );
        } );
      }
    }
  } );

  async.waterfall( queue, () => console.log( 'DONE -> fetchGithubStars()' ) );
}


/**
 * Fetch twitter data
 */
function fetchTwitterUserMeta() {
  const queue          = [];
  const fetchedAuthors = [];

  /**
   * Evaluate set authors for each entry
   * @param  {String} type entry type
   */
  function evalAuthors( type ) {
    data[ type ].forEach( entry => {
      if ( entry.authors && entry.authors.length ) {
        entry.authors.forEach( author => {
          if ( author.twitter ) {
            const userName = author.twitter.replace( '@', '' );

            if ( fetchedAuthors.indexOf( userName ) === -1 ) {
              fetchedAuthors.push( userName );

              queue.push( done => {
                helpers.twitter.fetchTwitterUserData(
                  userName,
                  ( error, user ) => {
                    if ( error ) {
                      console.warn( 'ERROR -> fetchTwitterUserData' );
                      console.warn( 'ERROR -> ' + userName );
                      console.warn( 'ERROR -> ' +  error );
                      return done( null );
                    }

                    data.people[ userName ] = user;

                    // render it again
                    // because we had a data update
                    config.listPages.forEach( listPage => {
                      pages[ listPage ] = renderPage( listPage );
                    } );

                    // give it a bit of time
                    // to rest and not reach the API limits
                    setTimeout( () => done( null ), config.timings.requestDelay );
                  }
                );
              } );
            }
          }
        } );
      }
    } );
  }

  config.listPages.forEach( listPage => evalAuthors( listPage ) );

  async.waterfall( queue, () => console.log( 'DONE -> fetchTwitterUserMeta()' ) );
}


/**
 * Fetch video meta data
 */
function fetchVideoMeta() {
  const queue = [];

  data.videos.forEach( video => {
    if ( video.youtubeId ) {
      queue.push( done => {
        helpers.youtube.fetchVideoMeta( video.youtubeId, ( error, meta ) => {
          if ( error ) {
            console.warn( 'ERROR -> youtube.fetchVideoMeta' );
            console.warn( 'ERROR -> ' + video.youtubeId );
            console.warn( 'ERROR -> ' + error );
            return done( null );
          }

          Object.assign( video, meta );

          pages.videos = renderPage( 'videos' );

          // give it a bit of time
          // to rest and not reach the API limits
          setTimeout( () => done( null ), config.timings.requestDelay );
        } );
      } );
    }

    if ( video.vimeoId ) {
      queue.push( done => {
        helpers.vimeo.fetchVideoMeta( video.vimeoId, ( error, meta) => {
          if ( error ) {
            console.warn( 'ERROR -> vimeo.fetchVideoMeta' );
            console.warn( 'ERROR -> ' + video.vimeoId );
            console.warn( 'ERROR -> ' + error );
            return done( null );
          }

          Object.assign( video, meta );

          pages.videos = renderPage( 'videos' );

          // give it a bit of time
          // to rest and not reach the API limits
          setTimeout( () => done( null ), config.timings.requestDelay );
        } );
      } );
    }
  } );

  async.waterfall( queue, () => console.log( 'DONE -> fetchVideoMeta()' ) );
}


/**
 * Fetch slide meta data
 */
function fetchSlideMeta() {
  const queue = [];

  data.slides.forEach( slide => {
    const match = slide.url.match( /(slideshare|speakerdeck)/g );
    if ( match ) {
      queue.push( done => {
        if ( helpers[ match[ 0 ] ] ) {
          helpers[ match[ 0 ] ].getMeta( slide.url, ( error, meta ) => {
            if ( error ) {
              console.warn( 'ERROR -> vimeo.fetchSlideMeta' );
              console.warn( 'ERROR -> ' + slide.url );
              console.warn( 'ERROR -> ' + error );
              return done( null );
            }

            Object.assign( slide, meta );

            pages.slides = renderPage( 'slides' );

            // give it a bit of time
            // to rest and not reach the API limits
            setTimeout( () => done( null ), config.timings.requestDelay );
          } );
        } else {
          done( null );
        }
      } );
    }
  } );

  async.waterfall( queue, () => console.log( 'DONE -> fetchSlideMeta()' ) );
}


/**
 * Read files and get tools
 *
 * @param {String} type type
 *
 * @return {Object} tools
 */
function getList( type ) {
  const list                 = [];
  const entries              = fs.readdirSync( config.dataDir + '/' + type );

  entries.forEach( entry => {
    if ( entry[ 0 ] !== '.' ) {
      try {
        entry = JSON.parse(
          fs.readFileSync(
            config.dataDir + '/' + type + '/' + entry,
            'utf8'
          )
        );

        const platformsNames = config.platforms.map( platform => {
          return platform.name;
        } );

        entry.fuzzy = fuzzify(
          entry,
          platformsNames
        ).replace( /http(s)?:\/\//, '' ).toLowerCase();
        entry.id     = entry.name.toLowerCase().replace( /[\s\.,:'"#\(\)|]/g, '-' );
        entry.hidden = false;

        if ( type === 'videos' ) {
          if ( entry.youtubeId ) {
            entry.html = '<iframe width="720" height="405" src="https://www.youtube.com/embed/' + entry.youtubeId + '" frameborder="0" allowfullscreen></iframe>';
          }

          if ( entry.vimeoId ) {
            entry.html = '<iframe src="//player.vimeo.com/video/' + entry.vimeoId + '" width="720" height="405" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
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
function renderPage( type, options = {} ) {
  const template = ( type === 'index' ) ? 'index' : 'list';
  let list     = data[ type ] || null;

  /**
   * Partial function to enable partials
   * in lodash templates
   *
   * @param  {String} path    file path
   * @param  {Object} options options for lodash templates
   * @return {String}         rendered partial
   */
  function partial( path, data, options = {} ) {

    return _.template(
      fs.readFileSync( path ),
      options
    )(data);
  }

  return minify(
    _.template(
      pageContent.templates[ template ]
    )({
      css              : pageContent.css,
      enhance          : pageContent.enhance,
      cdn              : config.cdn,
      contributors     : data.contributors,
      partial          : partial,
      people           : data.people,
      platforms        : config.platforms,
      resourceCount    : {
        audits   : data.audits.length,
        tools    : data.tools.length,
        articles : data.articles.length,
        videos   : data.videos.length,
        slides   : data.slides.length,
        books    : data.books.length,
        courses  : data.courses.length
      },
      site             : config.site,
      list             : list,
      hash             : {
        css  : pageContent.hashes.css,
        js   : pageContent.hashes.js,
        svg  : pageContent.hashes.svg
      },
      type             : type,
      name             : type.charAt( 0 ).toUpperCase() + type.slice( 1 )
    }), {
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
 * Render pages
 */
pages.index = renderPage( 'index' );

if ( !fs.existsSync( './public' ) ) {
  fs.mkdirSync( './public' );
}

fs.writeFile( './public/index.html', pages.index );

config.listPages.forEach( page => {
  pages[ page ] = renderPage( page );

  if ( !fs.existsSync( `./public/${page}` ) ) {
    fs.mkdirSync( `./public/${page}` );
  }

  fs.writeFile( `./public/${page}/index.html`, pages[ page ] );
} );
