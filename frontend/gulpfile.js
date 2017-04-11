// grab our packages
var gulp   = require('gulp'),
exec = require('gulp-exec');

// define the default task and add the watch task to it
gulp.task('default', function(){
	var watcher = gulp.watch(['src/**/*.*', './index.html'], ['build']);
	watcher.on('change', function(event) {
		console.log(`Change detected in ${event.path} `);
	});
});

gulp.task('build', function(){
	return gulp.src('src/**/*.js')
	.pipe(exec('npm run build'));
});
