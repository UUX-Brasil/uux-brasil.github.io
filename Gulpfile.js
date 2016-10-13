var gulp = require('gulp'),
  print = require('gulp-print'),
  run = require('gulp-run'),
  concat = require('gulp-concat'),
  clean = require('gulp-clean'),
  uglify = require('gulp-uglify'),
  runSequence = require('run-sequence'),
  rename = require("gulp-rename"),
  path = require('path'),
  DIST_FOLDER = './dist',
  DIST_FILE = 'agile-audio-player.js',
  DIST_MIN_FILE = 'agile-audio-player.min.js';

gulp.task('default', ['build']);

gulp.task('build', function(callback) {
  runSequence(
    'clean',
    'concat',
    'uglify',
    callback
  )
})

gulp.task('uglify', function() {
  return gulp.src(path.join(DIST_FOLDER, DIST_FILE))
  .pipe(uglify({
    mangle: true
  }))
  .pipe(rename(DIST_MIN_FILE))
  .pipe(gulp.dest(DIST_FOLDER));
});

gulp.task('concat', function() {
  return gulp.src([
    './src/agile-audio-player.js',
    './src/m3u.js'
  ])
  .pipe(concat(DIST_FILE))
  .pipe(gulp.dest(DIST_FOLDER));
});

gulp.task('clean', function() {
  gulp.src(DIST_FOLDER + '/*.js', {read: false})
    .pipe(clean());
})
