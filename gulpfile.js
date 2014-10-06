var gulp = require('gulp');
var karma = require('karma').server;
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var install = require('gulp-install');
var jshintStylish = require('jshint-stylish');
var runSequence = require('run-sequence');

gulp.task('serve', function(){
  nodemon({script: 'server/server.js', ignore: 'node_modules/**/*.js'})
    .on('restart', function(){
      console.log('Server restarted!');
    })
});

gulp.task('lint', function(){
  return gulp.src('client/modules/**/*.js', 'client/app.js', 'client/app.services.js', 'server/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function(){
  gulp.watch(['client/modules/**/*.js', 'client/app.js', 'client/app.services.js', 'server/*.js'], ['lint']);
});

gulp.task('install', function(){
  return gulp.src('./package.json', './bower.json')
    .pipe(install());
});

gulp.task('test', function (done) {
 karma.start({
  configFile: __dirname + '/karma.conf.js',
  singleRun: true
 }, done);
});

gulp.task('build', function(callback){
  runSequence('install', 'lint', 'serve', 'watch');
});