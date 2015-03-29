/**
 *
 *  how to speedup a landingpage with gulp.
 *
 */

'use strict';

// Require the needed packages
var concat        = require( 'gulp-concat' ),
    csslint       = require( 'gulp-csslint' ),
    gulp          = require( 'gulp' ),
    jshint        = require( 'gulp-jshint' ),
    jshintStylish = require( 'jshint-stylish' ),
    imagemin      = require( 'gulp-imagemin' ),
    pngquant      = require( 'imagemin-pngquant' ),
    less          = require( 'gulp-less' ),
    prefix        = require( 'gulp-autoprefixer' ),
    minifyCSS     = require( 'gulp-minify-css' ),
    uglify        = require( 'gulp-uglify' ),
    tasks         = require( 'gulp-task-listing' ),
    svgstore      = require( 'gulp-svgstore' );

var files = {
  img     : [ 'img/**/*' ],
  lint    : [ 'app.js', 'gulpfile.js', 'js/**/*.js', 'lib/**/*.js' ],
  scripts : [
    'js/shims/**/*.js',
    'js/helper/**/*.js',
    'js/featureDetects/**/*.js',
    'js/components/**/*.js',
    'js/tooling.js'
  ],
  styles  : [ 'less/main.less' ],
  svg     : [ 'svg/icons/*.svg' ],
  watch   : {
    styles : [ 'less/**/*.less' ]
  }
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
 */
gulp.task( 'styles', function () {
  return gulp.src( files.styles )
    .pipe( less() )
    .pipe( csslint( '.csslintrc' ) )
    .pipe( csslint.reporter() )
    .pipe( prefix( 'last 1 version', '> 1%', 'ie 8', 'ie 7' ) )
    .pipe( minifyCSS() )
    .pipe( gulp.dest( 'public/' ) );
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
  return gulp.src( files.scripts )
    .pipe( concat( 'tooling.js' ) )
    .pipe( uglify() )
    .pipe( gulp.dest( 'public' ) );
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
 * this task will kick off the watcher for JS, CSS, HTML files
 * for easy and instant development
 */
gulp.task( 'watch', function() {
  gulp.watch( files.lint, [ 'lint' ] );
  gulp.watch( files.watch.styles, [ 'styles' ] );
  gulp.watch( files.scripts, [ 'scripts' ] );
});


/*******************************************************************************
 * TEST
 *
 * task to run in CI environments
 *
 * $ gulp test
 */
gulp.task( 'test', [ 'csslint' ] );


/*******************************************************************************
 * BUILD
 *
 * run all build related tasks with:
 *
 *  $ gulp build
 *
 */
gulp.task( 'build', [ 'styles', 'scripts', 'svg', 'images' ] );


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
