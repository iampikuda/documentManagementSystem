// Karma configuration
// Generated on Thu Feb 23 2017 20:27:53 GMT+0100 (WAT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'src/public/js/InvertedIndex.js',
      'jasmine/bundles/bundles.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/public/js/InvertedIndex.js': ['coverage']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage', 'coveralls', 'verbose'],


    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    },
    // coverageReporter: {
    //   // specify a common output directory
    //   // dir: 'build/reports/coverage',
    //   reporters: [
    //     { type: 'lcov', subdir: 'report-lcov' },
    //     { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' }
    //   ]
    // },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    plugins: [
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-coveralls',
      'karma-jasmine',
      'karma-spec-reporter',
      'karma-verbose-reporter'
    ],


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
