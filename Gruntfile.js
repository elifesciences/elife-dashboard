module.exports = function (grunt) {

    var browserifyAlias = {
        "swag": "./assets/libs/swag.js",
        "jqueryHistory": "./assets/libs/jquery.history.js",
        "pickadate": "./assets/libs/pickadate/lib/index.js",
        "templates": "./assets/js/templates.js",
        "publish": "./assets/js/services/publish.js",
        "schedule": "./assets/js/services/schedule.js",
        "versionReason": "./assets/js/services/version-reason.js",
        "current": "./assets/js/pages/current.js",
        "detail": "./assets/js/pages/detail.js",
        "scheduled": "./assets/js/pages/scheduled.js",
        "config": "./assets/js/config.js"
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/* <%= pkg.title || pkg.name %> - v<%= pkg.version %> */' +
        '\n' +
        '/* <%= pkg.homepage ? "" + pkg.homepage + "" : "" %> */' +
        '\n' +
        '/* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' */\n\n',

        /**
         * Shell commands
         */
        shell: {
            mocked_services: {
                command: 'source venv/bin/activate && python mocked_services.py'
            },
            serve: {
                command: 'source venv/bin/activate && python runserver.py'
            }
        },

        /**
         * Concatenate
         *
         * CSS
         *    libs.css  - dashboard/static/css/libs.css
         *
         */
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true,
            },
            css: {
                //put all the prerequisites in a file
                files: {
                    //app  js
                    'dashboard/static/css/libs.css': [
                        'node_modules/fullcalendar/dist/fullcalendar.css',
                        'node_modules/qtip2/dist/jquery.qtip.css',
                        'assets/libs/pickadate/lib/themes/classic.css',
                        'assets/libs/pickadate/lib/themes/classic.date.css',
                        'assets/libs/pickadate/lib/themes/classic.time.css',
                        'node_modules/font-awesome/css/font-awesome.css',
                    ],
                },
            },
        },

        /**
         *  Compile SASS to css
         *
         *  dashboard/static/css/style.css
         */
        sass: {
            dev: {
                files: {
                    'dashboard/static/css/style.css': 'assets/scss/style.scss'
                },
                options: {
                    outputStyle: 'expanded',
                    imagePath: '../images',
                    sourceMap: true,
                    outFile: 'source/css/',
                    style: 'compressed'
                },
            },
        },

        /**
         * Compile handlebars templates into one file.
         * We rename the filePath here too to make them easier to call
         * assets/handlebars/error-detail.handlebars becomes error-detail
         *
         * assets/js/templates.js
         */
        handlebars: {
            compile: {
                options: {
                    node: true,
                    namespace: "eLife.templates",
                    processName: function (filePath) {
                        return filePath.replace(/^assets\/handlebars\//, '').replace(/\.handlebars/, '');
                    }
                },
                files: {
                    "assets/js/templates.js": ["assets/handlebars/**/*.handlebars"],
                }
            }
        },

        /**
         * Browserify all the javascript.
         *
         * app
         *      ./dashboard/static/js/app.js
         *
         * test
         *     ./dashboard/static/js/app.js
         *
         */
        browserify: {
            app: {
                files: {
                    './dashboard/static/js/app.js': ['./assets/js/main.js']
                },
                options: {
                    alias: browserifyAlias,
                    transform: ['browserify-shim'],
                    browserifyOptions: {
                        debug: true
                    }
                }
            },
            test: {
                files: [{
                    expand: true,     // Enable dynamic expansion.
                    cwd: './assets/test/',      // Src matches are relative to this path.
                    src: ['*.spec.js'], // Actual pattern(s) to match.
                    dest: './assets/test/build/',   // Destination path prefix.
                    ext: '.spec.js',   // Dest filepaths will have this extension.
                    extDot: 'first'   // Extensions in filenames begin after the first dot
                }],
/*                files: {
                    './assets/test/build/schedule.spec.js': ['./assets/test/schedule.spec.js']
                },*/
                options: {
                    alias: browserifyAlias,
                    transform: ['browserify-shim'],
                    // browserifyOptions: {
                    //     debug: false
                    // }
                }
            }
        },

        mocha_phantomjs: {
            options: {
                reporter: 'spec'
            },
            all: ['./assets/test/*.html']
        },

        // Watches for changes and runs relevant tasks
        watch: {
            options: {
                livereload: 1338,
            },
            js: {
                files: ['assets/js/**/*.js'],
                tasks: ['concat', 'browserify:app'],
                options: {
                    spawn: false
                }
            },
            handlebars: {
                files: ['assets/handlebars/**/*.handlebars'],
                tasks: ['handlebars', 'concat', 'browserify:app'],
                options: {nospawn: false},
            },
            css: {
                files: ['assets/scss/**/*.scss'],
                tasks: ['sass'],
                options: {nospawn: false},
            }
        }
    });

    // Load tasks
    [
        'grunt-shell',
        'grunt-contrib-concat',
        'grunt-contrib-watch',
        'grunt-contrib-handlebars',
        'grunt-sass',
        'grunt-scss-lint',
        'grunt-browserify',
        'grunt-mocha-phantomjs',
    ].forEach(function (task) {
        grunt.loadNpmTasks(task);
    });

    // Register tasks

    /**
     * Default task
     */

    grunt.registerTask('default', ['handlebars', 'concat:css', 'browserify:app', 'sass']);
    grunt.registerTask('dev', ['handlebars', 'concat:css', 'browserify:app', 'sass', 'watch']);
    grunt.registerTask('test', ['handlebars', 'browserify:test', 'mocha_phantomjs']);
    grunt.registerTask('mock_services', ['shell:mocked_services']);
};
