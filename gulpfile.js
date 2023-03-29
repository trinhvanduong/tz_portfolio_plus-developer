"use strict";

var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

var sourcemaps = require('gulp-sourcemaps');

gulp.task('less-site__tzportfolioplus', function () {
    return gulp.src('tz_portfolio_plus_sources/front_end/less/core/tzportfolioplus.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('tz_portfolio_plus_sources/front_end/dist'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('../components/com_tz_portfolio_plus/css'));
});
gulp.task('less-site__style', function () {
    return gulp.src('tz_portfolio_plus_sources/front_end/less/core/style.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('tz_portfolio_plus_sources/front_end/dist'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('../components/com_tz_portfolio_plus/css'));
});
gulp.task('less-admin__style', function () {
    return gulp.src('tz_portfolio_plus_sources/back_end/less/style.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('tz_portfolio_plus_sources/back_end/dist'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('../administrator/components/com_tz_portfolio_plus/css'));
});
gulp.task('less-admin__icon-font', function () {
    return gulp.src('tz_portfolio_plus_sources/back_end/less/tppicon.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('tz_portfolio_plus_sources/back_end/dist'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('../administrator/components/com_tz_portfolio_plus/css'));
});
gulp.task('less-admin-installation', function () {
    return gulp.src('tz_portfolio_plus_sources/back_end/less/installation/style.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('tz_portfolio_plus_sources/back_end/dist'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('../administrator/components/com_tz_portfolio_plus/setup/assets/css'));
});

gulp.task('less-font-awesome', function () {
    return gulp.src('tz_portfolio_plus_sources/front_end/less/core/fonts/fontawesome-free-5.8.2/all.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('tz_portfolio_plus_sources/front_end/dist'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('../components/com_tz_portfolio_plus/css'));
});


gulp.task('less-v4-shim', function () {
    return gulp.src('tz_portfolio_plus_sources/front_end/less/core/fonts/fontawesome-free-5.8.2/v4-shims.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('tz_portfolio_plus_sources/front_end/dist'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('../components/com_tz_portfolio_plus/css'));
});

gulp.task('less-template-elegant', function () {
    return gulp.src('tz_portfolio_plus_sources/front_end/less/styles/elegant/template.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(cssmin())
        .pipe(rename({suffix: ''}))
        .pipe(gulp.dest('../components/com_tz_portfolio_plus/templates/elegant/css'));
});
gulp.task('less-module-articles', function () {
    return gulp.src('../modules/mod_tz_portfolio_plus_articles/css/style.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(sourcemaps.write())
        // .pipe(cssmin())
        .pipe(rename({suffix: ''}))
        .pipe(gulp.dest('../modules/mod_tz_portfolio_plus_articles/css'));
});

var sass = require('gulp-sass');
/* Removed style for "a" tag in file _reboot.scss*/
gulp.task('sass-bootstrap', function () {
    return gulp.src('tz_portfolio_plus_sources/front_end/vendor/bootstrap/scss/*.scss')
        // .pipe(sass().on('error', sass.logError))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('tz_portfolio_plus_sources/front_end/dist/bootstrap'));
});

gulp.task('sass-admin__style', function () {
    return gulp.src('tz_portfolio_plus_sources/back_end/scss/style.scss')
        // .pipe(sass().on('error', sass.logError))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('tz_portfolio_plus_sources/back_end/dist'));
});


gulp.task('cssmin-admin-layout', function () {
    return gulp.src('tz_portfolio_plus_sources/back_end/css/admin-layout.css')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('tz_portfolio_plus_sources/back_end/dist'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('../administrator/components/com_tz_portfolio_plus/css'));
});
gulp.task('cssmin-tz_portfolio', function () {
    return gulp.src('tz_portfolio_plus_sources/back_end/css/tz_portfolio.css')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('tz_portfolio_plus_sources/back_end/dist'))
        .pipe(cssmin())
        .pipe(rename({basename: 'tz_portfolio_plus', suffix: '.min'}))
        .pipe(gulp.dest('../administrator/components/com_tz_portfolio_plus/css'));
});

// var uglify = require('gulp-uglify');
// var pump = require('pump');

// gulp.task('js-uglify', function (cb) {
//     pump([
//             gulp.src('tz_portfolio_plus_sources/front_end/js/core.js'),
//             uglify({
//                 filename: "tz_portfolio_plus_sources/front_end/dist/core.min.js"
//             }),
//             gulp.dest('tz_portfolio_plus_sources/front_end/dist'),
//         ],
//         cb
//     );
// });

var minify = require('gulp-minify');
gulp.task('js-minify__site-tz_portfolio_plus-script', async function() {
    gulp.src([ 'sources/front_end/js/tz_portfolio_plus.js'])
        .pipe(minify({
            ext:{
                // src:'.js',
                min:'.min.js'
            },
            exclude: ['tasks']
        }))
        .pipe(gulp.dest('sources/front_end/dist'))
});
// gulp.task('js-minify__site-tz_portfolio_plus', async function() {
//     gulp.src(['tz_portfolio_plus_sources/front_end/js/core.js', 'tz_portfolio_plus_sources/front_end/js/tz_portfolio_plus.js'])
//         .pipe(minify({
//             ext:{
//                 // src:'.js',
//                 min:'.min.js'
//             },
//             exclude: ['tasks']
//         }))
//         .pipe(gulp.dest('tz_portfolio_plus_sources/front_end/dist'))
// });
gulp.task('js-minify-lib-infinitescroll', async function() {
    gulp.src(['tz_portfolio_plus_sources/front_end/js/libraries/jquery.infinitescroll.custom.js'])
        .pipe(minify({
            ext:{
                // src:'.js',
                min:'.min.js'
            },
            exclude: ['tasks']
        }))
        // .pipe(rename("jquery.infinitescroll.min.js"))
        .pipe(gulp.dest('tz_portfolio_plus_sources/front_end/dist'))
});
gulp.task('js-minify__back-end', async function() {
    gulp.src(['tz_portfolio_plus_sources/back_end/js/tpp-field-permissions.js'])
        .pipe(minify({
            ext:{
                src:'.js',
                min:'.min.js'
            },
            exclude: ['tasks']
        }))
        .pipe(gulp.dest('tz_portfolio_plus_sources/back_end/dist'))
});
gulp.task('js-minify__back-end_introguide', async function() {
    gulp.src(['tz_portfolio_plus_sources/back_end/js/introguide.js'])
    .pipe(minify({
        ext:{
            src:'.js',
            min:'.min.js'
        },
        exclude: ['tasks']
    }))
    .pipe(gulp.dest('tz_portfolio_plus_sources/back_end/dist'))
});
gulp.task('js-minify__back-end_layoutadmin', async function() {
    gulp.src(['tz_portfolio_plus_sources/back_end/js/layout-admin-j4.js'])
    .pipe(minify({
        ext:{
            src:'.js',
            min:'.min.js'
        },
        exclude: ['tasks']
    }))
    .pipe(gulp.dest('tz_portfolio_plus_sources/back_end/dist'))
});
gulp.task('js-minify__back-end_script', async function() {
    gulp.src(['sources/back_end/js/script.js'])
        .pipe(minify({
            ext:{
                src:'.js',
                min:'.min.js'
            },
            exclude: ['tasks']
        }))
        .pipe(gulp.dest('sources/back_end/dist'))
});

// var gulp = require('gulp');
// var uglify = require('gulp-uglify');
// var pipeline = require('readable-stream').pipeline;

// var bootstrap = require('bootstrap');
// gulp