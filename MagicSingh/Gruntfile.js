module.exports = function(grunt) {
  grunt.initConfig({
    cssmin: {
      my_target: {
        files: [{
          expand: true,
          cwd: 'styles/',
          src: ['*.css', '!*.min.css'],
          dest: 'styles/',
          ext: '.min.css'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
};