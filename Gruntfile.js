module.exports = function(grunt) {
	// show elapsed time at the end
	require('time-grunt')(grunt);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			js: {
				src: [
				'js/dev/_functions.js',
				'js/dev/main.js'
				],
				dest: 'js/common.js'
			}
		},

		uglify: {
			build: {
				src: 'js/common.js',
				dest: 'js/common.js'
			}
		},

		less: {
			dev: {
				options: {
					paths: ["less"],
					cleancss:true
				},
				files: {
					"css/main.css": "less/main.less"
				}
			}
		},

		autoprefixer: {
			options: {
				browsers: ['last 2 version']
			},
			multiple_files: {
				expand: true,
				flatten: true,
				src: 'css/main.css',
				dest: 'css/'
			}
		},

		imagemin: {
			png: {
				options: {
					optimizationLevel: 7
				},
				files: [
					{
						expand: true,
						cwd: './img/',
						src: ['**/*.png'],
						dest: './img/',
						ext: '.png'
					}
				]
			},
			jpg: {
				options: {
					progressive: true
				},
				files: [
					{
						expand: true,
						cwd: './img/',
						src: ['**/*.jpg'],
						dest: './img/',
						ext: '.jpg'
					}
				]
			}
		},

		watch: {
			css: {
				files: ['less/**/*.less'],
				tasks: ['refresh_css'],
				options: {
					debounceDelay: 250,
					spawn: false
				}
			},
			js: {
				files: ['<%= concat.js.src %>'],
				tasks: ['refresh_js'],
				options: {
					debounceDelay: 250,
					spawn: false
				}
			},
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '*.html',
                    'css/{,*/}*.css',
                    'js/{,*/}*.js'
                ]
            }
		},
		connect: {
			options: {
				port: 9000,
				livereload: 35729,
				// change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					open: true,
					base: [
						'./',
						'css'
					]
				}
			}
		},

		removelogging: {
			dist: {
				src: "js/common.js" // Each file will be overwritten with the output!
			}
		},

		uncss: {
			dist: {
				files: {
					'css/tidy.css': ['index.html']
				}
			}
		},

		validation: {
			options: {
				reset: grunt.option('reset') || false,
				stoponerror: false,
				path: 'test/validation-status.json',
				reportpath: 'test/validation-report.json',
				// remotePath: "http://decodize.com/",
				// remoteFiles: ["html/moving-from-wordpress-to-octopress/",
											// "css/site-preloading-methods/"], //or
				// remoteFiles: "validation-files.json", // JSON file contains array of page paths. 
				relaxerror: ["Bad value X-UA-Compatible for attribute http-equiv on element meta."] //ignores these errors
			},
			files: {
					src: ['*.html']
			}
		},

		qunit: {
			all: {
				options: {
					timeout: 10000,
					urls: [
					'http://localhost:8000/index.html'
					]
				}
			}
		},

		jshint: {
			options: {
				// curly: true,
				// eqeqeq: true,
				// eqnull: true,
				// browser: true,
				globals: {
					jQuery: true
				},
				force: true
			},
			uses_defaults: ['Gruntfile.js', 'js/common.js']
		},

		webshot: {
	        // example
	        homepage: {
	            options: {
	                // url, file or html
	                siteType: 'url',
	                site: 'http://localhost:9000/index.html',
	                savePath: 'img/shot.png',
	                windowSize: {
	                    width: 1024,
	                    height: 768
	                },
	                shotSize: {
	                    width: 1024,//600 x 450 or 330 x 225
	                    height: 768
	                }
	            }
	        }
	    },

	    image_resize: {
	        resize: {
	          options: {
	            width: 330,
	            height: 225,
	            crop: true
	          },
	          files: {
	            'img/shot.png': 'img/shot.png'
	          }
	        }
	      },

		newer: {
			options: {
			cache: 'cache'
			}
		}
	});



	grunt.registerTask('default', [], function () {
		// grunt.loadNpmTasks('grunt-contrib-clean');
		grunt.loadNpmTasks('grunt-contrib-concat');
		grunt.loadNpmTasks('grunt-contrib-connect');
		// grunt.loadNpmTasks('grunt-contrib-copy');
		// grunt.loadNpmTasks('grunt-contrib-jshint');
		// grunt.loadNpmTasks('grunt-contrib-qunit');
		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.loadNpmTasks('grunt-contrib-less');
		// grunt.loadNpmTasks('grunt-html-validation');
		// grunt.loadNpmTasks('grunt-uncss');
		// grunt.loadNpmTasks('grunt-jekyll');
		// grunt.loadNpmTasks('grunt-recess');
		// grunt.loadNpmTasks('grunt-saucelabs');
		// grunt.loadNpmTasks('grunt-sed');
		grunt.loadNpmTasks('grunt-autoprefixer');
		grunt.loadNpmTasks("grunt-remove-logging");
		grunt.loadNpmTasks('grunt-newer');

		grunt.task.run('concat', 'removelogging', 'uglify', 'less', 'autoprefixer');
	});

	grunt.registerTask('dev', [], function () {
		grunt.loadNpmTasks('grunt-webshot');
		grunt.loadNpmTasks('grunt-image-resize');
		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.loadNpmTasks('grunt-contrib-concat');
		grunt.loadNpmTasks('grunt-contrib-less');
		grunt.loadNpmTasks('grunt-autoprefixer');
		grunt.loadNpmTasks('grunt-contrib-connect');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-newer');

		grunt.task.run('connect', 'webshot', 'image_resize', 'watch');
	});


	grunt.registerTask('refresh_css', [
		'less',
		'autoprefixer'
	]);
	grunt.registerTask('refresh_js', [
		'newer:concat:js',
		'uglify'
	]);

	grunt.registerTask('images', [], function () {
		grunt.loadNpmTasks('grunt-contrib-imagemin');
		grunt.task.run('imagemin');
	});

};