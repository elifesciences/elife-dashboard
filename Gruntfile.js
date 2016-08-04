module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/* <%= pkg.title || pkg.name %> - v<%= pkg.version %> */' +
    '\n' +
    '/* <%= pkg.homepage ? "" + pkg.homepage + "" : "" %> */' +
    '\n' +
    '/* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;'  + ' */\n\n',

    // Concatenate all JS into one file
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

    sass: {
      dev: {
        files: {
          'dashboard/static/css/style.css': 'assets/scss/style.scss',
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

    handlebars: {
      compile: {
        options: {
          node: true,
          namespace: "eLife.templates",
          processName: function(filePath) {
            return filePath.replace(/^assets\/handlebars\//, '').replace(/\.handlebars/, '');
          }
        },
        files: {
          "assets/js/templates.js": ["assets/handlebars/**/*.handlebars"],
        }
      }
    },

    browserify: {
      dist: {
        files: {
          './dashboard/static/js/app.js': ['./assets/js/main.js']
        },
        options: {
          alias: {
            "swag": "./assets/libs/swag.js",
            "jqueryHistory": "./assets/libs/jquery.history.js",
            "pickadate": "./assets/libs/pickadate/lib/index.js",
            "templates": "./assets/js/templates.js",
            "publish": "./assets/js/services/publish.js",
            "schedule": "./assets/js/services/schedule.js",
            "current": "./assets/js/pages/current.js",
            "detail": "./assets/js/pages/detail.js",
            "scheduled": "./assets/js/pages/scheduled.js",
            "config": "./assets/js/config.js"
          },
          transform: ['browserify-shim'],
          browserifyOptions: {
            debug: true
          }
        }
      }
    },

    mocha_phantomjs: {
      options: {
        reporter: 'spec'
      },
      all: ['asset/test/**/*.html']
    },

    // Watches styles and specs for changes
    watch: {
      options: {
        livereload: true,
      },
      js: {
        files: ['assets/js/**/*.js'],
        tasks: ['concat', 'browserify', 'mocha_phantomjs'],
        options: {
          spawn: false
        }
      },
      handlebars: {
        files: ['assets/handlebars/**/*.handlebars'],
        tasks: ['handlebars', 'concat', 'browserify', 'mocha_phantomjs'],
        options: {nospawn: false},
      },
      css: {
        files: ['assets/scss/**/*.scss'],
        tasks: ['sass'],
        options: {nospawn: false},
      }
    },
  });
  [
    'grunt-shell',
    'grunt-contrib-concat',
    'grunt-contrib-watch',
    'grunt-contrib-handlebars',
    'grunt-sass',
    'grunt-scss-lint',
    'grunt-browserify',
    'grunt-mocha-phantomjs',
  ].forEach(function(task) {
    grunt.loadNpmTasks(task);
  });

  // Register the default tasks
  grunt.registerTask('default', ['handlebars', 'concat:css', 'browserify', 'sass', 'mocha_phantomjs']);
  grunt.registerTask('dev', ['handlebars', 'concat:css', 'browserify', 'sass', 'mocha_phantomjs', 'watch']);
};
