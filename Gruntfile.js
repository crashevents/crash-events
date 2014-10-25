module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    }    
  });
  // alais deploy to gh-pages
  grunt.registerTask('deploy', ['gh-pages']);
};