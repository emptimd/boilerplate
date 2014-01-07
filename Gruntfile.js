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
      development: {
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
                    cwd: './app/images/',
                    src: ['**/*.png'],
                    dest: './app/images/compressed/',
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
                    cwd: './app/images/',
                    src: ['**/*.jpg'],
                    dest: './app/images/compressed/',
                    ext: '.jpg'
                }
            ]
        }
    },

    watch: {
      options: {
        livereload: true,
      },
      files: ['less/*.less'],
      tasks: 'default'
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
  grunt.registerTask('default', ['uglify', 'less'/*, 'imagemin'*/]);

};