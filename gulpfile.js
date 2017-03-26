// grab our packages
var gulp   = require('gulp'),
jshint = require('gulp-jshint'),
exec = require('gulp-exec');

// define the default task and add the watch task to it
gulp.task('default', function(){
	var watcher = gulp.watch('src/**/*.js', ['build']);
	watcher.on('change', function(event) {
		console.log(event);
	});
});

gulp.task('build', function(){
	return gulp.src('src/**/*.js')
	.pipe(exec('babel src -d lib'));
});
