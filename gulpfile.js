"use strict";

var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

var sourcemaps = require('gulp-sourcemaps');

gulp.task('less', function () {
    return gulp.src('tz_portfolio_plus_sources/front_end/less/core/tzportfolioplus.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('tz_portfolio_plus_sources/front_end/dist'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('../components/com_tz_portfolio_plus/css'));
});
gulp.task('less-admin', function () {
    return gulp.src('tz_portfolio_plus_sources/back_end/less/style.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('tz_portfolio_plus_sources/back_end/dist'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('../administrator/components/com_tz_portfolio_plus/css'));
});

gulp.task('less-font-awesome', function () {
    return gulp.src('tz_portfolio_plus_sources/front_end/less/core/fonts/fontawesome-free-5.7.2/all.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('tz_portfolio_plus_sources/front_end/dist'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('../components/com_tz_portfolio_plus/css'));
});


gulp.task('less-v4-shim', function () {
    return gulp.src('tz_portfolio_plus_sources/front_end/less/core/fonts/fontawesome-free-5.7.2/v4-shims.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('tz_portfolio_plus_sources/front_end/dist'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('../components/com_tz_portfolio_plus/css'));
});

gulp.task('less-template-elegant', function () {
    return gulp.src('tz_portfolio_plus_sources/front_end/less/templates/elegant/template.less')
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

const minify = require('gulp-minify');
gulp.task('js-minify', function() {
    gulp.src(['tz_portfolio_plus_sources/front_end/js/core.js', 'tz_portfolio_plus_sources/front_end/js/tz_portfolio_plus-j4.js'])
        .pipe(minify({
            ext:{
                // src:'.js',
                min:'.min.js'
            },
            exclude: ['tasks']
        }))
        .pipe(gulp.dest('tz_portfolio_plus_sources/front_end/dist'))
});