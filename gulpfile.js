/**
 *
 *  how to speedup a landingpage with gulp.
 *
 */

'use strict';

// Require the needed packages
var csslint       = require( 'gulp-csslint' ),
    gulp          = require( 'gulp' ),
    jshint        = require( 'gulp-jshint' ),
    jshintStylish = require( 'jshint-stylish' ),
    less          = require( 'gulp-less' ),
    prefix        = require( 'gulp-autoprefixer' ),
    minifyCSS     = require( 'gulp-minify-css' ),
    uglify        = require( 'gulp-uglify' ),
    tasks         = require( 'gulp-task-listing' ),
    svgstore      = require( 'gulp-svgstore' );

var files = {
  lint    : [ 'app.js', 'gulpfile.js', 'js/**/*.js' ],
  scripts : [ 'js/**/*.js' ],
  styles  : [ 'less/**/*.less' ],
  svg     : [ 'svg/icons/*.svg' ]
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
    .pipe( minifyCSS() )
    .pipe( prefix( 'last 1 version', '> 1%', 'ie 8', 'ie 7' ) )
    .pipe( gulp.dest( 'public/' ) );
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
 * BUILD
 *
 * run all build related tasks with:
 *
 *  $ gulp build
 *
 */
gulp.task( 'build', [ 'styles', 'scripts', 'svg' ] );


/*******************************************************************************
 * this task will kick off the watcher for JS, CSS, HTML files
 * for easy and instant development
 */
gulp.task( 'watch', function() {
  gulp.watch( files.lint, [ 'lint' ] );
  gulp.watch( files.styles, [ 'styles' ] );
  gulp.watch( files.scripts, [ 'scripts' ] );
});


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
