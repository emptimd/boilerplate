module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			dist: {
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
						src: ['*.png'],
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
						src: ['*.jpg'],
						dest: './img/',
						ext: '.jpg'
					}
				]
			}
		},

		watch: {
			options: {
				livereload: true
			},
			css: {
				files: ['less/*.less'],
				tasks: ['less', 'autoprefixer']
			},
			js: {
				files: ['<%= concat.dist.src %>'],
				tasks: ['concat', 'removelogging', 'uglify']
			},
			html: {
				files: ['*.html']
			}
		},
		connect: {
			server: {
				options: {
					port: 8000,
					base: './',
					open: {
						target: 'http://localhost:8000',
						callback: function() {} // called when the app has opened
					}
				}
			}
		},

		removelogging: {
			dist: {
				src: "js/common.js" // Each file will be overwritten with the output!
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
		}

	});

	// These plugins provide necessary tasks.
	// grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	// grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-html-validation');
	// grunt.loadNpmTasks('grunt-jekyll');
	// grunt.loadNpmTasks('grunt-recess');
	// grunt.loadNpmTasks('grunt-saucelabs');
	// grunt.loadNpmTasks('grunt-sed');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks("grunt-remove-logging");

	// Default task(s).
	grunt.registerTask('default', ['concat', 'removelogging', 'uglify', 'less', 'imagemin']);
	grunt.registerTask('dev', ['connect', 'watch']);
	grunt.registerTask('test', ['jshint' ,'validation']);

};