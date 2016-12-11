module.exports = function (grunt) {
    //configure main project settings...
    grunt.initConfig({
        //basic settings and info about plugins
        pkg: grunt.file.readJSON('package.json'),

        //Name of plugin (without grunt-contrib
        cssmin: {
            combine: {
                files: {
                    'app/app.min.css': ['app/app.css']
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'app/app.min.js': ['app/app.js']
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun : true
            }
        }
    });

    //Load the plugin
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    //Do the task
    grunt.registerTask("default", ['cssmin', 'uglify', 'karma']);

};
