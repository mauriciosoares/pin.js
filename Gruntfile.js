module.exports = function(grunt) {
	'use strict';

  var tasks = [
    'grunt-contrib-uglify',
    'grunt-contrib-jshint',
    'grunt-contrib-watch'
  ];

  var config = {};

  // =============================================
  // Metadata
  config.pkg = grunt.file.readJSON('package.json');
  config.banner = {
    full:  '/** <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
              '<%= grunt.template.today(\'yyyy-mm-dd\') %>\n' +
              '* Copyright (c) <%= grunt.template.today(\'yyyy\') %> <%= pkg.author %>;\n' +
              '* Licensed <%= pkg.license %> \n*/\n\n'
  };

  // =============================================
  // jshint
  config.jshint = {};
  config.jshint.options = {
    debug: true
  };
  config.jshint.dist = ['src/pin.js'];

  // =============================================
  // uglify
  config.uglify = {};
  config.uglify.dist = {
    files: {
      'dist/pin.min.js': [ 'src/pin.js' ]
    },
    options: {
      preserveComments: false,
      sourceMap: 'dist/pin.min.map',
      sourceMappingURL: 'pin.min.map',
      report: 'min',
      beautify: {
        ascii_only: true
      },
      banner: '<%= banner.full %>',
      compress: {
        hoist_funs: false,
        loops: false,
        unused: false
      }
    }
  };

  // =============================================
  // watch
  config.watch = {};
  config.watch.scripts = {
    files: ['src/*.js'],
    tasks: ['jshint:dist'],
    options: {
      spawn: false,
    }
  }


  grunt.initConfig(config);

  tasks.forEach(grunt.loadNpmTasks);

  grunt.registerTask('dist', ['jshint:dist', 'uglify:dist']);
}
