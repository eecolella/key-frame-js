'use strict';

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
    return gulp.src('examples/styles/main.scss')
        .pipe($.compass({
            css: 'examples/styles',
            sass: 'examples/styles',
            import_path: 'examples/bower_components',
            require: ['susy']
        }))
        .pipe($.autoprefixer('last 2 versions'))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe($.size());
});

gulp.task('jshint', function () {
    return gulp.src('src/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe($.size());
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean());
});

gulp.task('build', ['clean','jshint'], function () {
    gulp.src('src/*.js')
        .pipe($.uglify())
        .pipe(gulp.dest('dist'))
});

gulp.task('default', ['build']);

gulp.task('connect', function () {
    var connect = require('connect');
    var examples = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('examples'))
        .use(connect.static('.tmp'))
        .use(connect.directory('examples'));

    require('http').createServer(examples)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('serve', ['connect', 'styles'], function () {
    require('opn')('http://localhost:9000');
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('examples/styles/*.scss')
        .pipe(wiredep({
            directory: 'examples/bower_components'
        }))
        .pipe(gulp.dest('examples/styles'));

    gulp.src('examples/*.html')
        .pipe(wiredep({
            directory: 'examples/bower_components'
        }))
        .pipe(gulp.dest('examples'));
});

gulp.task('watch', ['connect', 'serve'], function () {
    var server = $.livereload();

    // watch for changes

    gulp.src('src/*.js')
        .pipe(gulp.dest('.tmp/scripts/'));

    gulp.watch([
        'examples/*.html',
        '.tmp/styles/**/*.css',
        'examples/scripts/**/*.js',
        'examples/images/**/*'
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('examples/styles/**/*.scss', ['styles']);
    gulp.watch('examples/scripts/**/*.js', ['scripts']);
    gulp.watch('bower.json', ['wiredep']);
});
