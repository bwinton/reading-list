var env = process.env;
var spawn = require('child_process').spawn;
var gulp = require('gulp');

require('gulp-task-list')(gulp);

// Make sure we’re running the add-on SDK.
gulp.task('init', function (cb) {
  console.log('init');
  if (!env.CUDDLEFISH_ROOT) {
    cb('Please run ". bin/activate" in your addon-sdk directory first.');
    return;
  }
  cb();
});

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

gulp.task('test', ['init'], function(cb) {
  runCfx(cb, 'test');
});

gulp.task('package', ['init'], function(cb) {
  runCfx(cb, 'xpi');
});

gulp.task('run', ['init'], function(cb) {
  runCfx(cb, 'run', '-p', 'profile.testing');
});

gulp.task('default', ['run']);