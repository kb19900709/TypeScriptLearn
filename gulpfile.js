let gulp = require('gulp');
let gulpSequence = require('gulp-sequence');
let gulpBrowserify = require('gulp-browserify');
let gulpUglify = require('gulp-uglify');
let gulpSourceMaps = require('gulp-sourcemaps');
let gulpTypescript = require('gulp-typescript');
let gulpTslint = require('gulp-tslint');
let tsLint = require('tslint');
let tscSourceProject = gulpTypescript.createProject('tsconfig.json');
let tscTestProject = gulpTypescript.createProject('tsconfig.json');
let browserSync = require('browser-sync');
let exec = require('child_process').exec;
let karma = require('karma').Server;


let distRootPath = 'dist';
let buildRootPath = 'build';

let sourcePath = 'source/js/**/**.ts';
let sourceBuildPath = buildRootPath + '/source/js';
let sourceBundlePath = buildRootPath + '/source/js/**/**.js';
let sourceBundleOutputPath = distRootPath + '/js';

let testPath = 'test/**/**.test.ts';
let testBuildPath = buildRootPath + '/test/';
let testBundlePath = buildRootPath + '/test/**/**.test.js';
let testBundleOutputPath = distRootPath + '/test';

// 程式碼檢測，參考至 tslint.json
gulp.task('ts-lint', function () {
    let program = tsLint.Linter.createProgram("tsconfig.json");
    return gulp.src([sourcePath, testPath])
        .pipe(gulpTslint({ program }))
        .pipe(gulpTslint.report());
});

// 編譯 source ts
gulp.task('tsc-source-build', function () {
    return gulp.src([sourcePath])
        .pipe(tscSourceProject())
        .js
        .pipe(gulp.dest(sourceBuildPath));
});

// 編譯 test ts
gulp.task('tsc-test-build', function () {
    return gulp.src([testPath])
        .pipe(tscTestProject())
        .js
        .pipe(gulp.dest(testBuildPath));
});

// source 程式碼優化、壓縮且產生 .map 檔案。最後輸出至 dist 目錄下。
gulp.task('browserify-bundle', function () {
    return gulp.src(sourceBundlePath, { read: false })
        .pipe(gulpBrowserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(gulpSourceMaps.init({ loadMaps: true }))
        .pipe(gulpUglify())
        .pipe(gulpSourceMaps.write('./'))
        .pipe(gulp.dest(sourceBundleOutputPath));
});

// test 程式碼優化。最後輸出至 dist 目錄下。
gulp.task('browserify-test-bundle', function () {
    return gulp.src(testBundlePath, { read: false })
        .pipe(gulpBrowserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(gulp.dest(testBundleOutputPath));
});

// 自動化測試
gulp.task('karma', function (done) {
    return new karma({
        configFile: require('path').resolve('karma.conf.js')
    }, function (exitCode) {
        done();
        process.exit(exitCode);
    }).start();
});

// // 瀏覽器同步
// gulp.task('browser-sync', function () {
//     browserSync({
//         server: {
//             baseDir: distRootPath
//         }
//     });
//     return gulp.watch([
//         //需要被監聽的檔案
//     ], [browserSync.reload]);
// });

// 壓縮單一檔案
let pump = require('pump');
gulp.task('fbSdk', function (cb) {
    pump([
        gulp.src('fb/fbSdk.js'),
        gulpUglify(),
        gulp.dest('fb/dist/')
    ],
        cb
    );
});

gulp.task('build-js', gulpSequence('ts-lint', ['tsc-source-build', 'tsc-test-build']));
gulp.task('browserify-js', gulpSequence(['browserify-bundle', 'browserify-test-bundle'], 'karma'));
gulp.task('main', gulpSequence('build-js', 'browserify-js'));

// 完整打包以及測試任務
gulp.task('default', ['main'], function (cb) {
    console.info("任務結束");
    return cb();
});

/***** 學習測試區 *****/
/***** watch command : [tsc -w file --outFile watch/currentWatch.js] *****/
/***** 請注意若在 .ts 裡面包含 import/export module 將會無法執行編譯 *****/
// let currentEditFile = 'source/ts/function/VariableScope.ts';
// let watchFile = 'watch/currentWatch.js';
// gulp.task('simple-learn-build', ['ts-lint'], function (cb) {
//     exec('tsc ' + currentEditFile + ' --outFile ' + watchFile, function (err, stdout, stderr) {
//         console.log(stdout);
//         console.log(stderr);
//         cb(err);
//     });
// });
// gulp.task('default', ['simple-learn-build'], function (cb) {
//     exec('node ' + watchFile, function (err, stdout, stderr) {
//         console.log(stdout);
//         console.log(stderr);
//         cb(err);
//     });
// });