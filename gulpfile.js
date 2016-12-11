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
var cleanCSS      = require( 'gulp-clean-css' );
var uglify        = require( 'gulp-uglify' );
var tasks         = require( 'gulp-task-listing' );
var svgstore      = require( 'gulp-svgstore' );
var mergeStream   = require( 'merge-stream' );
var mmq           = require( 'gulp-merge-media-queries' );
var rev           = require( 'gulp-rev' );
var jsoneditor    = require( 'gulp-json-editor' );
var gulpif        = require( 'gulp-if' );
var webp          = require( 'gulp-webp' );

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
  rev     : [ './rev.json' ],
  watch   : {
    styles : [ 'less/**/*.less' ]
  },
  xml : [ './*.xml' ]
};

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
 * - and save the hash in the rev json file
 */
gulp.task( 'styles', function () {
  return gulp.src( files.styles )
    .pipe( less() )
    .pipe( csslint( '.csslintrc' ) )
    .pipe( csslint.reporter() )
    .pipe( prefix( 'last 1 version', '> 1%', 'ie 8', 'ie 7' ) )
    .pipe( mmq( {
      log: true
    } ) )
    .pipe( cleanCSS() )
    .pipe( rev() )
    .pipe( gulp.dest( 'public/' ) )
    .pipe( gutil.buffer( function ( err, dataFiles ) {
      return gulp.src( files.rev )
        .pipe( jsoneditor( {
          'styles': dataFiles.map( function ( dataFile ) {
            return dataFile.revHash;
          } ).join( '' )
        } ) )
        .pipe( gulp.dest( './' ) );
    } ) );
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
 * SCRIPT TASKS
 *
 * this task is responsible for the JavaScript files
 * - uglify the js
 * - and save it to public
 */
gulp.task( 'scripts', function() {
  var keys   = Object.keys( files.scripts );

  var streams = keys.map( function( element ) {
    var condition = element === 'tooling';

    return gulp.src( files.scripts[element] )
      .pipe( concat( element + '.js' ) )
      .pipe( uglify() )
      .pipe( gulpif(condition, rev() ) )
      .pipe( gulp.dest( 'public/' ) )
      .pipe( gulpif( condition, gutil.buffer( function ( err, dataFiles ) {
        return gulp.src( files.rev )
          .pipe( jsoneditor( {
            scripts : dataFiles.map( function ( dataFile ) {
              return dataFile.revHash;
            } ).join( '' )
          } ) )
          .pipe( gulp.dest( './' ) );
      } ) ) );
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
    .pipe( rev() )
    .pipe( gulp.dest( 'public/' ) )
    .pipe( gutil.buffer( function ( err, dataFiles ) {
      return gulp.src( files.rev )
      .pipe( jsoneditor( {
        'svg': dataFiles.map( function ( dataFile ) {
          return dataFile.revHash;
        } ).join( '' )
      } ) )
      .pipe( gulp.dest( './' ) );
    } ) );
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
              .pipe( gulp.dest( 'public/' ) )
              .pipe( webp() )
              .pipe( gulp.dest( 'public/' ) );
});


/*******************************************************************************
 * XML TASK
 *
 * copy xml files over to public
 */
gulp.task( 'xml', function () {
  return gulp.src( files.xml )
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
              .pipe( jsonlint.reporter( function( file ) {
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
  gulp.watch( files.svg, [ 'svg' ] );
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
gulp.task( 'build', [ 'styles', 'scripts', 'svg', 'images', 'xml' ] );


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
