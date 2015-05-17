var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var bower = require('gulp-bower');

gulp.task('bower-wiredep', function () {
    gulp.src('./web/index.html')
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here'
        }))
        .pipe(gulp.dest('./web'));
});

gulp.task('bower-install', function() {
    return bower();
});

gulp.task('default', ['bower-install']);