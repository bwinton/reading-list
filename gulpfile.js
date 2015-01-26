var env = process.env;
var spawn = require('child_process').spawn;

var gulp = require('gulp');
var jscs = require('gulp-jscs');

require('gulp-task-list')(gulp);

// Make sure we’re running the add-on SDK.
gulp.task('init', function () {
  if (!env.CUDDLEFISH_ROOT) {
    return 'Please run ". bin/activate" in your addon-sdk directory first.';
  }
  gulp.src('lib/*.js')
    .pipe(jscs());
});

// Run the test suite.
gulp.task('test', ['init'], function(cb) {
  runCfx(cb, 'test');
});

// Build the XPI
gulp.task('package', ['init'], function(cb) {
  runCfx(cb, 'xpi');
});

// Run Firefox with the add-on.
gulp.task('run', ['init'], function(cb) {
  runCfx(cb, 'run', '-p', 'profile.testing');
});

// By default, run Firefox.
gulp.task('default', ['run']);


// Helper functions.

function getBinary(channel) {
  return ['-b', '/Applications/Local/FirefoxNightly.app'];
}

function runCfx(cb, command) {
  var args = Array.prototype.slice.call(arguments, 1);
  args = args.concat(getBinary());

  var task = spawn('cfx', args);

  task.stdout.on('data', function (data) {
    process.stdout.write(data.toString('utf-8'));
  });

  task.stderr.on('data', function (data) {
    process.stderr.write(data.toString('utf-8'));
  });

  task.on('close', function (code) {
    if (code !== 0) {
      cb('cfx ' + args[0] + ' exited with code ' + code);
      return;
    }
    cb(code);
  });
}
