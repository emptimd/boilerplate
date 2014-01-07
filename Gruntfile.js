module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      build: {
        src: [
        'js/dev/lib/jquery-1.8.3.min.js',
        'js/dev/_bootstrap.js',
        'js/dev/_functions.js',
        'js/dev/main.js'
        ],
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
                    dest: './img/compressed/',
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
                    dest: './img/compressed/',
                    ext: '.jpg'
                }
            ]
        }
    },

    watch: {
      options: {
        livereload: {
          port:900,
          options: { livereload: true },
        }//or true and no port
      },
      css: {
          files: ['less/*.less'],
          tasks: ['less']
        },
      js: {
        files: ['<%= uglify.build.src %>'],
        tasks: ['uglify']
      },
      images: {
        files: ['img/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
        spawn: false,
        }
      }
    }

  });

  // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-connect');
  // grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-html-validation');
  // grunt.loadNpmTasks('grunt-jekyll');
  // grunt.loadNpmTasks('grunt-recess');
  // grunt.loadNpmTasks('grunt-saucelabs');
  // grunt.loadNpmTasks('grunt-sed');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'less', 'imagemin']);

};