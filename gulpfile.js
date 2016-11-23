const gulp       = require('gulp'),
    browserify = require('gulp-browserify');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const clean = require('gulp-clean');

const paths = {
  assets:{
    js:'./js',
    css:'./css',
    sass:'./sass',
    images:'./images',
    fonts:'./fonts',
    libs:'./vendor'
  },
  dest:"./dist"
}

var  cssFiles = '/**/*.css';
var jsFiles = '/**/*.js';
/**
 * ####################################
 * Js
 */

gulp.task('scripts', ["scripts:vendor"] , function () {
  console.log("scripts")
    //reactify and minify everything

    return gulp.src([paths.assets.js+jsFiles,paths.assets.libs+jsFiles])
        .pipe(browserify({
            debug: true
        }))
        .pipe(gulp.dest('./dist/js'));
});
gulp.task("scripts:vendor", function(){
  return gulp.src(["node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js","node_modules/deepstream.io-client-js/dist/deepstream.min.js","node_modules/jquery/dist/jquery.min.js"]).pipe(gulp.dest("./js/libs"));
})
/**
 * ###################################
 * styles
 */

gulp.task('styles', ["sass"], function () {
    //add some more sass to this eh ;)

    return gulp.src([paths.assets.css+cssFiles,paths.assets.libs+cssFiles])
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass', function () {
  return gulp.src([paths.assets.sass+'/*.scss',paths.assets.sass+'/*.sass'])
    // .pipe(rename({
    //         suffix: '.build'
    // }))
    .pipe(sass({sourceComments:true,includePaths:["./node_modules"]}).on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('images',function(){
  //maybe pack things up
  gulp.src([paths.assets.images+"/**.*"])
  .pipe(gulp.dest('./dist/img'))
});
/**
 * #################################
 * Minifying tasks
 */
gulp.task("minify",["minify:scripts","minify:styles"])


gulp.task('minify:scripts',["scripts"], function() {
  console.log("minfying");
  return gulp.src('./dist/js/**/*.js')
  .pipe(sourcemaps.init())
    .pipe(minify({
        ext:{
            src:'.debug.js',
            min:'.min.js'
        },
        noSource:true,
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    // .pipe(rename({
    //         suffix: '.min'
    // }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/min/'))
});

gulp.task('minify:styles',["styles"], function() {
  return gulp.src('./dist/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({
            suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/min/'));
});

/*
 * ##############################
 * concat
 */
gulp.task("concat",["concat:scripts","concat:styles"])

gulp.task('concat:scripts',["minify:scripts"],function(){
  console.log("concat files")
  return gulp.src('./dist/min/*.min.js')
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/build'));

});

gulp.task('concat:styles',["minify:styles"],function(){
  return gulp.src('./dist/min/*.min.css')
    .pipe(sourcemaps.init())
    .pipe(concat('all.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/build'));

});

/**
 * ############################
 * watch tasks
 */
gulp.task("watch",["watch:sass","watch:scripts"])
gulp.task("watch:scripts",["scripts"],function(){
  gulp.watch([paths.assets.js+jsFiles,paths.assets.libs+jsFiles],["scripts"]);
});
gulp.task("watch:styles",["styles"],function(){
  gulp.watch([paths.assets.css+cssFiles,paths.assets.libs+cssFiles],["styles"]);
});
gulp.task("watch:sass",["sass"],function(){
  gulp.watch([paths.assets.sass+'/**/*.scss',paths.assets.sass+'/**/*.sass'], ['sass']);
});
/*
 *########################
 *clean
 */
gulp.task("clean",["clean:builded","clean:minified","clean:styles","clean:scripts","clean:images"])
 gulp.task("clean:builded",function(){
   return gulp.src(paths.dest+'/build/**/*.*', {read: false})
       .pipe(clean());
 })
 gulp.task("clean:minified",function(){
   return gulp.src(paths.dest+'/min/**/*.*', {read: false})
       .pipe(clean());
 })
 gulp.task("clean:styles", function () {
     return gulp.src(paths.dest+"/css/*.css", {read: false})
         .pipe(clean());
 })
 gulp.task("clean:scripts", function () {
     return gulp.src(paths.dest+'/js/*.js', {read: false})
         .pipe(clean());
 })
 gulp.task("clean:images", function () {
     return gulp.src(paths.dest+'/img/**:*', {read: false})
         .pipe(clean());
 })
/* misc tasks */
gulp.task('default', ['scripts',"styles","images"]);
gulp.task("build",["clean","images","concat"])
