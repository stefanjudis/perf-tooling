/**
 *
 *  how to speedup a landingpage with gulp.
 *
 */

'use strict';

// Require the needed packages
var concat        = require( 'gulp-concat' );
var csslint       = require( 'gulp-csslint' );
var gulp          = require( 'gulp' );
var gutil         = require( 'gulp-util' );
var jshint        = require( 'gulp-jshint' );
var jshintStylish = require( 'jshint-stylish' );
var jsonlint      = require( 'gulp-jsonlint' );
var imagemin      = require( 'gulp-imagemin' );
var pngquant      = require( 'imagemin-pngquant' );
var less          = require( 'gulp-less' );
var prefix        = require( 'gulp-autoprefixer' );
var minifyCSS     = require( 'gulp-minify-css' );
var uglify        = require( 'gulp-uglify' );
var tasks         = require( 'gulp-task-listing' );
var svgstore      = require( 'gulp-svgstore' );
var mergeStream   = require( 'merge-stream' );
var cmq           = require( 'gulp-combine-media-queries' );
var rev           = require( 'gulp-rev' );
var connect       = require( 'gulp-connect' );
var template      = require( 'gulp-template' );

var files = {
  data    : [ 'data/**/*.json' ],
  img     : [ 'img/**/*' ],
  lint    : [ 'app.js', 'gulpfile.js', 'js/**/*.js', 'lib/**/*.js' ],
  scripts : {
    tooling: [
      'js/shims/**/*.js',
      'js/helper/**/*.js',
      'js/featureDetects/**/*.js',
      'js/components/**/*.js',
      'js/tooling.js'
    ],
    enhance: [
      'js/enhance.js'
    ]
  },
  sitemap : [ './sitemap.xml' ],
  styles  : [ 'less/main.less' ],
  svg     : [ 'svg/icons/*.svg' ],
  watch   : {
    styles : [ 'less/**/*.less' ]
  }
};

var PATHS = {
  template : 'templates/**/*.html'
};

var stylesHash = '';

/*******************************************************************************
 * HELP TASK
 *
 * This task will list out other available tasks when you run `gulp help`
 */
gulp.task('help', tasks);


/*******************************************************************************
 * LINT TASK
 *
 * This task will lint all JS files for common errors
 */
gulp.task( 'lint', function() {
  return gulp.src( files.lint )
    .pipe( jshint() )
    .pipe( jshint.reporter( jshintStylish ) );
});


/*******************************************************************************
 * STYLE TASK
 *
 * this task is responsible for the style files
 * - we will compile the less files to css
 * - we will minify the css files
 * - we will run them through autoprefixer
 * - and save it to public
 * - hash the files
 * - and save the new file name in the 'stylesHash' variable
 */
gulp.task( 'styles', function () {
  return gulp.src( files.styles )
    .pipe( less() )
    .pipe( csslint( '.csslintrc' ) )
    .pipe( csslint.reporter() )
    .pipe( prefix( 'last 1 version', '> 1%', 'ie 8', 'ie 7' ) )
    .pipe( cmq( {
      log: true
    } ) )
    .pipe( minifyCSS() )
    .pipe( rev() )
    .pipe( gulp.dest( 'public/' ) )
    .pipe( gutil.buffer( function ( err, files ) {
      stylesHash = files.map( function ( file ) {
        return file.path.replace( file.base, '' );
      }).join( '' );
    }));
});

/*******************************************************************************
 * CSSLINT TASK
 *
 * this task is responsible for the style files
 * - we will compile the less files to css
 * - we will lint the generated css
 */
gulp.task( 'csslint', function () {
  return gulp.src( files.styles )
    .pipe( less() )
    .pipe( csslint( '.csslintrc' ) )
    .pipe( csslint.reporter() )
    .pipe( csslint.failReporter() );
});

/*******************************************************************************
 * STYLES PLACEHOLDERS
 *
 * this task is responsible for the HTML template
 *  - it will populate the placeholders for the optimized script & style file names
 */
gulp.task( 'stylesPlaceholder', function() {

  gulp.src( PATHS.template )
    .pipe( template( {
        styles  : stylesHash
      }
    ) )
    .pipe( gulp.dest( 'public/' ) )
    .pipe( connect.reload() );
});

/*******************************************************************************
 * SCRIPT TASKS
 *
 * this task is responsible for the JavaScript files
 * - uglify the js
 * - and save it to public
 */
gulp.task( 'scripts', function() {
  var keys   = Object.keys( files.scripts );

  var streams = keys.map( function( element ) {
    return gulp.src( files.scripts[element] )
      .pipe( concat( element + '.js' ) )
      .pipe( uglify() )
      .pipe( gulp.dest( 'public' ) );
  } );

  return mergeStream.apply( null, streams );
});


/*******************************************************************************
 * SVG TASK
 *
 * this task is responsible for crunching all svg's together
 * - crunch svg files
 * - minify the files
 */
gulp.task( 'svg', function () {
  return gulp.src( files.svg )
             .pipe( svgstore( {
                fileName  : 'icons.svg',
                prefix    : 'icon-',
                inlineSvg : true
              } ) )
             .pipe( gulp.dest( 'public/' ) );
});


/*******************************************************************************
 * IMAGE TASK
 *
 * this task is responsible for compressing images properly
 */
gulp.task( 'images', function () {
  return gulp.src( files.img )
              .pipe( imagemin( {
                  progressive: true,
                  use: [ pngquant() ]
              } ) )
              .pipe( gulp.dest( 'public/' ) );
});


/*******************************************************************************
 * SITEMAP TASK
 *
 * copy sitemap.xml over to public
 */
gulp.task( 'sitemap', function () {
  return gulp.src( files.sitemap )
              .pipe( gulp.dest( 'public/' ) );
} );


/*******************************************************************************
 * JSONLINT TASK
 *
 * this task is responsible for compressing images properly
 */
gulp.task( 'jsonlint', function () {
  return gulp.src( files.data )
              .pipe( jsonlint() )
              .pipe( jsonlint.reporter( function( file, cb ) {
                gutil.log( 'Error on file ' + file.path );
                gutil.log( file.jsonlint.message );

                throw new gutil.PluginError(
                  'gulp-jsonlint',
                  'JSONLint failed for ' + file.relative
                );
              } ) );
} );


/*******************************************************************************
 * this task will kick off the watcher for JS, CSS, HTML files
 * for easy and instant development
 */
gulp.task( 'watch', function() {
  gulp.watch( files.lint, [ 'lint' ] );
  gulp.watch( files.watch.styles, [ 'styles' ] );
  gulp.watch( files.scripts.tooling, [ 'scripts' ] );
});


/*******************************************************************************
 * TEST
 *
 * task to run in CI environments
 *
 * $ gulp test
 */
gulp.task( 'test', [ 'csslint', 'jsonlint' ] );


/*******************************************************************************
 * BUILD
 *
 * run all build related tasks with:
 *
 *  $ gulp build
 *
 */
gulp.task( 'build', [ 'styles', 'stylesPlaceholder', 'scripts', 'svg', 'images', 'sitemap' ] );


/*******************************************************************************
 * DEV
 *
 * run all build related tasks, kick of server at 8080
 * and enable file watcher with:
 *
 * $ gulp dev
 *
 */
gulp.task( 'dev', [ 'build', 'watch' ] );


/**
 * Default gulp task will run all landingpage task.
 * This is just a shorcut for $ gulp landingpage
 *
 *  $ gulp
 *
 */
gulp.task( 'default', [ 'help' ] );
