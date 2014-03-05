module.exports = function(grunt) {
	
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-rev');
  
  grunt.initConfig({
    
    //limpar o prod
    clean: {
      prod: { src: ['prod'] }
    },
      
    //copiar os arquivos para prod  
    copy: {
      prod: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'dev',
          dest: 'prod',
          src: ['**/*']
        }]
      }
    },
    
    //realiza o min dos html
    htmlmin: {
      prod: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeComments: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true,
          removeAttributeQuotes: false,
          removeRedundantAttributes: true,
          useShortDoctype: true        
        },
        files: [{
          expand: true,
          cwd: 'prod/module/Application/view',
          src: ['**/*.phtml'],
          dest: 'prod/module/Application/view'
        }]
      }
    },
    
    
    //Lib usemin e useminPrepare lê o html e  faz o min, concat, de acordo com a tag especificada
    useminPrepare: {
      html: 'prod/module/Application/view/layout/layout.phtml',
      options: {
        dest: 'prod/public'
      }
    },
    
    usemin: {
      html: ['prod/module/Application/view/layout/layout.phtml'],
      options: {
        assetsDirs: ['prod/public']
      }
    },
    
    //renomear os arquivos para cache no navegador
    //o nome do arquivo vai com um hash
    rev: {
      prod: { //nome da target
        files: {
          src: [
            'prod/public/{,*/}*.css',
            'prod/public/{,*/}*.js',
            'prod/public/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        }
      }
    },
    
  });
  
  //tarefa de preview
  grunt.registerTask('prod', [
    'clean:prod',  
    'copy:prod',
    'useminPrepare',
    
    'concat',
    'cssmin',
    'uglify',
    'rev',
    
    'usemin',
    'htmlmin:prod'
  ]);
  
};