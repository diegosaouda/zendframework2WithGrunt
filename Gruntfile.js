module.exports = function(grunt) {
	
  //carregando automaticamente
  require('load-grunt-tasks')(grunt);
  
  grunt.initConfig({
    
    //limpar o prod
    clean: {
      build: { src: 'build' },
      temp: { src: '.tmp' }
    },
      
    //copiar os arquivos para prod  
    copy: {
      build: {
        files: [{
            expand: true,
              src: ['init_autoloader.php', 'config/**', 'module/**', 'public/index.php', 'public/img/**', 'public/.htaccess', 'vendor/**'],
              dest: 'build/'
        }],
        options: {
          dot: true
        }
      },
    },
    
    //realiza o min dos html
    htmlmin: {
      build: {
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
          cwd: 'build/module/Application/view',
          src: ['**/*.phtml'],
          dest: 'build/module/Application/view'
        }]
      }
    },
    
    
    //Lib usemin e useminPrepare lê o html e  faz o min, concat, de acordo com a tag especificada
    useminPrepare: {
      html: 'build/module/Application/view/layout/layout.phtml',
      options: {
        dest: 'build/public'
      }
    },
    
    usemin: {
      html: ['build/module/Application/view/layout/layout.phtml'],
      options: {
        assetsDirs: ['build/public']
      }
    },
    
    //renomear os arquivos para cache no navegador
    //o nome do arquivo vai com um hash
    rev: {
      build: { //nome da target
        files: {
          src: [
            'build/public/{,*/}*.css',
            'build/public/{,*/}*.js',
            'build/public/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        }
      }
    },
    
    //min images
    imagemin: {
      build: {
        files: [{
          expand: true,
          cwd: 'public',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: 'build/public'
        }]
      }
    },
    
  });
  
  //tarefa de preview
  grunt.registerTask('build', [
    'clean:build', //limpar o build antigo 
    'copy:build', //copiar os arquivos para o build
    'useminPrepare', //preparando os build de css, js ...
    
    'imagemin:build', //min images
    'concat', //concatena os arquivos
    'cssmin', //faz o min de css
    'uglify', //faz o min de js
    'rev', //gera um nome baseado em hash (para cache do navegador)
    
    'usemin', //faz o processamento do min
    'htmlmin:build', //min do html
    'clean:temp' //limpa diretorios temporarios
  ]);
  
};