'use strict';

module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            configJS: {
                files: ['gruntfile.js'],
                tasks: ['jshint', 'less', 'csslint', 'concat', 'usebanner'],
                options: {
                    livereload: true,
                }
            },
            serverViews: {
                files: ['server/views/index.server.view.html'],
                options: {
                    livereload: true,
                }
            },
            serverJS: {
                files: ['server/server.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true,
                }
            },
            clientViews: {
                files: ['client/public/views/*.html'],
                options: {
                    livereload: true,
                }
            },
            clientJS: {
                files: ['client/private/js/**/*.js'],
                tasks: ['jshint', 'concat:js', 'usebanner:js'],
                options: {
                    livereload: true,
                }
            },
            clientCSS: {
                files: ['client/private/css/lib/*.css', 'client/private/less/**/*.less'],
                tasks: ['less', 'csslint', 'concat:css', 'usebanner:css'],
                options: {
                    livereload: true,
                }
            }
        },
        jshint: {
            all: {
                src: ['gruntfile.js', 'client/private/js/**/*.js'],
                options: {
                    jshintrc: true
                }
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc',
            },
            all: {
                src: ['client/private/css/*.css']
            }
        },
        imagemin: {
          // By default, your `index.html` <!-- Usemin Block --> will take care of
          // minification. This option is pre-configured if you do not wish to use
          // Usemin blocks.
          options: {
            optimizationLevel: 0,
            progressive: true
          },
          dist: {
            files: [{
              expand: true,     // Enable dynamic expansion.
              cwd: 'client/private/img/',      // Src matches are relative to this path.
              src: ['*.png'], // Actual pattern(s) to match.
              dest: 'client/public/img/',   // Destination path prefix.
              ext: '.png'   // Dest filepaths will have this extension.
            }, {
              expand: true,     // Enable dynamic expansion.
              cwd: 'client/private/img/',      // Src matches are relative to this path.
              src: ['*.jpg'], // Actual pattern(s) to match.
              dest: 'client/public/img/',   // Destination path prefix.
              ext: '.jpg'   // Dest filepaths will have this extension.
            }]
          }
        },
        less: {
            all: {
                files: [{
                    expand: true,
                    cwd: 'client/private/less/',
                    src: ['**/*.less'],
                    dest: 'client/private/css/',
                    ext: '.css'
                }]
            }
        },
        usebanner: {
            js: {
                options: {
                    position: 'top',
                    banner: '/* GENERATED: DO NOT MODIFY! */',
                    linebreak: true
                },
                files: {
                    'client/public/js/app.js': 'client/public/js/app.js',
                }
            },
            css: {
                options: {
                    position: 'top',
                    banner: '/* GENERATED: DO NOT MODIFY! */',
                    linebreak: true
                },
                files: [{
                    'client/public/css/app.css': 'client/public/css/app.css',
                }, {
                    expand: true,
                    cwd: 'client/private/css/',
                    src: ['**/*.css', '!lib/**/*.css'],
                    dest: 'client/private/css/',
                    ext: '.css'
                }]
            }
        },
        concat: {
            js: {
                files: {
                    'client/public/js/app.js': [
                        'client/private/js/plugins.js',
                        'client/private/js/config.js',
                        'client/private/js/application.js',
                        'client/private/js/routes/*.js',
                        'client/private/js/controllers/*.js',
                        'client/private/js/directives/*.js',
                        'client/private/js/filters/*.js'
                    ]
                }
            },
            css: {
                files: {
                    'client/public/css/app.css': [
                        'client/private/css/lib/normalize.css',
                        'client/private/css/lib/main.css',
                        'client/private/css/**/*.css'
                    ]
                }
            }
        },
        /*uglify: {
            production: {
                options: {
                    mangle: false
                },
                files: {
                    'public/dist/application.min.js': '<%= applicationJavaScriptFiles %>'
                }
            }
        },*/
        cssmin: {
            // By default, your `index.html` <!-- Usemin Block --> will take care of
            // minification. This option is pre-configured if you do not wish to use
            // Usemin blocks.
            dist: {
                files: {
                    'client/public/css/app.css': [
                        'client/private/css/lib/normalize.css',
                        'client/private/css/lib/main.css',
                        'client/private/css/**/*.css'
                    ]
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server/server.js',
                options: {
                    //nodeArgs: ['--debug']
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    // Load NPM tasks 
    require('load-grunt-tasks')(grunt);

    // Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    // Default task(s).
    grunt.registerTask('package', ['jshint', 'less', 'csslint', 'concat', 'usebanner']);
    grunt.registerTask('default', ['jshint', 'less', 'csslint', 'concat', 'usebanner', 'concurrent']);

    grunt.registerTask('images', ['imagemin']);

    // Lint task(s).
    grunt.registerTask('lint', ['jshint', 'csslint']);

    // Build task(s).
    //grunt.registerTask('build', ['jshint', 'csslint' ,'uglify', 'cssmin']);

    // Test task.
    grunt.registerTask('test', ['karma:unit']);
};