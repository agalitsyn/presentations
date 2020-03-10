var fs = require('fs');

const srcFolder = '2016-codefest-infrastructure-automation-at-2gis'

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: [srcFolder+'/js/reveal.js'],
      options: {}
    },
    copy: {
      app: {
        files: [{
          expand: true,
          cwd: srcFolder,
          src: ['js/**', 'css/**', 'images/**'],
          dest: 'dist/'
        }]
      }
    },
    template: {
      app: {
        options: {
          data: {
            title: 'presentation-title',
            content: fs.readFileSync(srcFolder+'/slides.md').toString()
          }
        },
        files: {
          'dist/index.html': [srcFolder+'/layout.html']
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
          srcFolder+'/js/**',
          srcFolder+'/css/**',
          srcFolder+'/images/**'
        ],
        tasks: ['copy']
      },
      template: {
        files: [
          srcFolder+'/slides.md',
          srcFolder+'/layout.html'
        ],
        tasks: ['template']
      }
    },
    mkcouchdb: {
      app: require('./couchapp.json')
    },
    couchapp: {
      app: require('./couchapp.json')
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

  grunt.registerTask('deploy', [
    'build',
    'mkcouchdb',
    'couchapp'
  ]);

  grunt.registerTask('server', [
    'build',
    'connect',
    'open',
    'watch'
  ]);

};
