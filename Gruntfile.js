module.exports = function(grunt) {

  var SERVER_PORT = "7777";
  var DIST = './../';

  var destination = 'www';
  var source = 'src'

	// ===============================================================
	// CONCAT RESSOURCES 
	// ===============================================================
	var jsconcat_src = [
  source + '/app/app.js',
  source + '/services/*.js',
  source + '/directives/*.js',
  source + '/app/config.js',
  source + '/animation/*.js',
  source + '/parts/**/*.js',
  source + '/pages/**/*.js'
  ]; 
  var jsconcat_dest = destination + '/js/app.js';
  
  var wsJsconcat_src = [
  source + '/wsJs/*.js'
  ]; 
  var wsJsconcat_dest = destination + '/js/ws.js';
	// ===============================================================
	// COPY RESSOURCES 
	// ===============================================================
	var copyarray_src = [
  source + '/parts/**/*html', 
  source + '/pages/**/*html'];
  var copyarray_dest = destination + '/templates';

    // ===============================================================
	// WATCH RESSOURCES 
	// ===============================================================
  var appjs_watch = [source + '/**/*.js', '!' + source + '/wsJs/*.js'];
  var wsSass_watch = [source + '/sass/ws/*.scss'];
  var colorSass_watch = [source + '/sass/color/**/*.scss'];
  var wsJs_watch = [source + '/wsJs/*.js'];
  var indexer_watch = [source + '/indexer/*'];
  var html_watch = [source + '/pages/**/*.html', source + '/parts/**/*.html'];
  



    // Display the execution time when tasks are run:
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('./package.json'),

      concat: {
        appjs: {
          src: jsconcat_src,
          dest: jsconcat_dest
        },

        wsJs: {
          src: wsJsconcat_src,
          dest: wsJsconcat_dest
        },        
      },

      sass: {
        ws: {
          files: [{ src : ['*.scss'], cwd : source + '/sass', dest : destination + '/css', ext : '.min.css', expand : true }],
          options: { style: 'compressed' }
        },
        color: {
          files: [{ src : ['*.scss'], cwd : source + '/sass/color', dest : destination + '/css/color', ext : '.min.css', expand : true }],
          options: { style: 'compressed' }
        }
      },

      copy: {
       pages: {files: [{expand: true, src: copyarray_src, flatten: true, dest: copyarray_dest}]}, 
       img: { files: [ {expand: true, cwd: source + '/img', src: ['**'], dest: destination + '/img'}, ] },
       lib: { files: [ {expand: true, cwd: 'lib/', src: ['**'], dest: destination + '/lib'}, ] },
       index: { files: [ {expand: true, cwd: source + '/indexer/', src: ['**'], dest: destination}, ] },
     },

        // ===================================================================
        // MINIFY JS RESOURCES
        // ===================================================================
        uglify: {
          options: {
            mangle: true,
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */' + "\n",
            compress: {
              drop_console: true
            }
          },
            //js: { files: { './dist/js/app.min.js' : ['js/app.min.js'] } }
          },


          watch: {
            gruntjs: { files: ['Gruntfile.js'], tasks: ['build'], options: {livereload: true}},  
            appjs: { files: appjs_watch, tasks: ['concat:appjs'], options: {livereload: true}}, 
            wsJs: { files: wsJs_watch, tasks: ['concat:wsJs'], options: {livereload: true}}, 
            apphtml: { files: html_watch, tasks: ['copy'], options: {livereload: true}}, 
            wsSass: { files: wsSass_watch, tasks: ['sass:ws'], options: {livereload: true}}, 
            colorSass: { files: colorSass_watch, tasks: ['sass:color'], options: {livereload: true}}, 

            // Indexer files
            colorSass: { files: indexer_watch, tasks: ['copy:index'], options: {livereload: true}},             
          },

          clean: {
            dist: [destination]
          },

          connect: {
            server: {
              options: {
                hostname: 'localhost',
                port: SERVER_PORT,
                base: destination,
                livereload: true
              }
            }
          },
        });

    require('matchdep').filterDev('grunt-*','package.json').forEach(grunt.loadNpmTasks);
    
    // grunt.loadNpmTasks('./../../node_modules/grunt-contrib-clean');
    // grunt.loadNpmTasks('./../../node_modules/grunt-contrib-concat');
    // grunt.loadNpmTasks('./../../node_modules/grunt-contrib-connect');
    // grunt.loadNpmTasks('./../../node_modules/grunt-contrib-copy');
    // grunt.loadNpmTasks('./../../node_modules/grunt-contrib-sass');
    // grunt.loadNpmTasks('./../../node_modules/grunt-contrib-uglify');
    // grunt.loadNpmTasks('./../../node_modules/grunt-contrib-watch');
    // grunt.loadNpmTasks('./../../node_modules/grunt-sync');

    grunt.registerTask('build', ['copy', 'concat', 'uglify', 'sass']);
    grunt.registerTask('default', ['copy', 'concat', 'uglify', 'sass', 'connect','watch']);
  };