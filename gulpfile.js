const gulp                  = require('gulp');
const gulpCleanCSS          = require('gulp-clean-css');
const gulpConcat            = require('gulp-concat');
const gulpCsslint           = require('gulp-csslint');
const gulpIf                = require('gulp-if');
const gulpImagemin          = require('gulp-imagemin');
const gulpJshint            = require('gulp-jshint');
const gulpJsonEditor        = require('gulp-json-editor');
const gulpJsonlint          = require('gulp-jsonlint');
const gulpMergeMediaQueries = require('gulp-merge-media-queries');
const gulpPostcss           = require('gulp-postcss');
const gulpRev               = require('gulp-rev');
const gulpSvgstore          = require('gulp-svgstore');
const gulpTaskListing       = require('gulp-task-listing');
const gulpUglify            = require('gulp-uglify');
const gulpUtil              = require('gulp-util');
const gulpWebp              = require('gulp-webp');
const imageminPngquant      = require('imagemin-pngquant');
const jshintStylish         = require('jshint-stylish');
const mergeStream           = require('merge-stream');
const postcssCssnext        = require('postcss-cssnext');
const postcssImport         = require('postcss-import');

const files = {
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
  styles  : [ 'css/main.css' ],
  svg     : [ 'svg/icons/*.svg' ],
  rev     : [ './rev.json' ],
  watch   : {
    styles : [ 'css/**/*.css' ]
  },
  xml : [ './*.xml' ]
};

/*******************************************************************************
 * HELP TASK
 *
 * This task will list out other available tasks when you run `gulp help`
 */
gulp.task('help', gulpTaskListing);


/*******************************************************************************
 * LINT TASK
 *
 * This task will lint all JS files for common errors
 */
gulp.task( 'lint', () => {
  return gulp.src( files.lint )
    .pipe( gulpJshint() )
    .pipe( gulpJshint.reporter( jshintStylish ) );
});


/*******************************************************************************
 * STYLE TASK
 *
 * this task is responsible for the style files
 * - we will concat all css files
 * - we will run them through autoprefixer
 * - we will minify the css files
 * - and save it to public
 * - hash the files
 * - and save the hash in the rev json file
 */
gulp.task( 'styles', () => {
  return gulp.src( files.styles )
    .pipe( gulpPostcss([
      postcssImport(),
      postcssCssnext({
        browsers: [ 'last 1 version' ],
        features: {
          rem: false
        }
      })
    ]) )
    .pipe( gulpCsslint( '.csslintrc' ) )
    .pipe( gulpCsslint.formatter() )
    .pipe( gulpMergeMediaQueries( {
      log: true
    } ) )
    .pipe( gulpCleanCSS() )
    .pipe( gulpRev() )
    .pipe( gulp.dest( 'public/' ) )
    .pipe( gulpUtil.buffer( ( err, dataFiles ) => {

      return gulp.src( files.rev )
        .pipe( gulpJsonEditor( {
          'styles': dataFiles.map( dataFile => {

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
 * - we will lint the generated css
 */
gulp.task( 'csslint', () => {
  return gulp.src( files.styles )
    .pipe( gulpCsslint( '.csslintrc' ) )
    .pipe( gulpCsslint.formatter() )
    .pipe( gulpCsslint.formatter('fail') );
});

/*******************************************************************************
 * SCRIPT TASKS
 *
 * this task is responsible for the JavaScript files
 * - uglify the js
 * - and save it to public
 */
gulp.task( 'scripts', () => {
  const streams = Object.keys( files.scripts ).map( element => {
    const condition = element === 'tooling';

    return gulp.src( files.scripts[element] )
      .pipe( gulpConcat(  `${element}.js` ) )
      .pipe( gulpUglify() )
      .pipe( gulpIf(condition, gulpRev() ) )
      .pipe( gulp.dest( 'public/' ) )
      .pipe( gulpIf( condition, gulpUtil.buffer( ( err, dataFiles ) => {

        return gulp.src( files.rev )
          .pipe( gulpJsonEditor( {
            scripts : dataFiles.map( dataFile => {

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
gulp.task( 'svg', () => {
  return gulp.src( files.svg )
    .pipe( gulpSvgstore() )
    .pipe( gulpRev() )
    .pipe( gulp.dest( 'public/' ) )
    .pipe( gulpUtil.buffer( ( err, dataFiles ) => {

      return gulp.src( files.rev )
      .pipe( gulpJsonEditor( {
        'svg': dataFiles.map( dataFile => {

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
gulp.task( 'images', () => {
  return gulp.src( files.img )
    .pipe( gulpImagemin( {
        progressive: true,
        use: [ imageminPngquant() ]
    } ) )
    .pipe( gulp.dest( 'public/' ) )
    .pipe( gulpWebp() )
    .pipe( gulp.dest( 'public/' ) );
});


/*******************************************************************************
 * XML TASK
 *
 * copy xml files over to public
 */
gulp.task( 'xml', () => {
  return gulp.src( files.xml )
    .pipe( gulp.dest( 'public/' ) );
} );


/*******************************************************************************
 * JSONLINT TASK
 *
 * this task is responsible for compressing images properly
 */
gulp.task( 'jsonlint', () => {
  return gulp.src( files.data )
    .pipe( gulpJsonlint() )
    .pipe( gulpJsonlint.reporter( file => {
      gulpUtil.log( `Error on file ${file.path}` );
      gulpUtil.log( file.jsonlint.message );

      throw new gulpUtil.PluginError(
        'gulp-jsonlint',
        `JSONLint failed for ${file.relative}`
      );
    } ) );
} );


/*******************************************************************************
 * this task will kick off the watcher for JS, CSS, HTML files
 * for easy and instant development
 */
gulp.task( 'watch', () => {
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
