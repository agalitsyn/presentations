var fs = require('fs');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['src/js/reveal.js'],
      options: {}
    },
    copy: {
      app: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['js/**', 'css/**', 'images/**'],
          dest: 'dist/'
        }]
      }
    },
    template: {
      app: {
        options: {
          data: {
            title: 'infrastructure automation in 2gis',
            content: fs.readFileSync('src/slides.md').toString()
          }
        },
        files: {
          'dist/index.html': ['src/layout.html']
        }
      }
    },
    connect: {
      dist: {
        options: {
        port: 5455,
        hostname: 'localhost',
          middleware: function (connect) {
            return [
              require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
              connect.static(require('path').resolve('dist'))
            ];
          }
        }
      }
    },
    open: {
      dist: {
        path: 'http://localhost:5455',
        app: 'xdg-open'
      }
    },
    clean: {
      dist: 'dist'
    },
    watch: {
      dist: {
        files: ['dist/**'],
        options: {
          livereload: true
        }
      },
      copy: {
        files: [
          'src/js/**',
          'src/css/**',
          'src/images/**'
        ],
        tasks: ['copy']
      },
      template: {
        files: [
          'src/slides.md',
          'src/layout.html'
        ],
        tasks: ['template']
      }
    }
  });

  // Load plugins
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Default task(s).
  grunt.registerTask('build', [
    'clean',
    'copy',
    'template'
  ]);

  grunt.registerTask('server', [
    'build',
    'connect',
    'open',
    'watch'
  ]);

};
