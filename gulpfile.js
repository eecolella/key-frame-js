'use strict';
// generated on 2014-06-28 using generator-gulp-webapp 0.1.0

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], { read: false })
        .pipe($.clean());
});

gulp.task('scripts', function () {
    return gulp.src('src/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe(gulp.dest('.tmp/scripts'));
});

gulp.task('build', function () {

    return gulp.src('src/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe($.uglify())
        .pipe(gulp.dest('dist'));

});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('examples'))
        .use(connect.static('.tmp'))
        .use(connect.directory('examples'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('serve', ['connect'], function () {
    require('opn')('http://localhost:9000');
});

gulp.task('watch', ['clean','scripts','connect', 'serve'], function () {
    var server = $.livereload();

    // watch for changes

    gulp.watch([
        'examples/*.html',
        'examples/styles/*.css',
        '.tmp/scripts/*.js'
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('src/*.js', ['scripts']);
});
