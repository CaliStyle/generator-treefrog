/**
 * Step 5
 * Where you write the generator specific files (routes, controllers, etc)
 */
const chalk = require('chalk');
const Util = require('../util')
const falafel = require('falafel')
const path = require('path')
const TRAILS_TEMPLATE = path.dirname(require.resolve('trailpack/archetype'))
const mkdirp = require('mkdirp');

const SOURCE_CONFIG = 'treefrog.js';
const DESTINATION_CONFIG_INDEX = 'config/index.js';
const DESTINATION_CONFIG = name => `config/${name}.js`;

const DESTINATION_CONFIG_MAIN = 'config/main.js';

export default {

  config() {
    
    Util.patchConflicter()

    let name = `treefrog`
    let fileName = `treefrog`
    let packName = `trailpack-treefrog`
    let indexPath = this.destinationPath(DESTINATION_CONFIG_INDEX)

    //create template file `config/treefrog.js`
    this.template(SOURCE_CONFIG, DESTINATION_CONFIG(name), {name, fileName, answers: this.answers});

    //create or update `config/index.js`
    if (!this.fs.exists(this.destinationPath(DESTINATION_CONFIG_INDEX))) {
      return this.fs.write(this.destinationPath(DESTINATION_CONFIG_INDEX), Util.getRequireStatement(fileName))
    }

    if (Util.hasRequireStatement(fileName, this.fs.read(indexPath))) {
      this.log.identical(DESTINATION_CONFIG_INDEX);
      return
    }
    
    let indexContents = this.fs.read(indexPath)
    let updatedIndexFile = Util.getUpdatedIndexFile(fileName, indexContents)

    this.fs.write(indexPath, updatedIndexFile)

    //create or update `config/main.js`
    

  },

  root() {
    
    //const frontend = this.answers ? this.answers['frontend'] : null
    const self = this;

    //this.fs.write(this.destinationPath('config/treefrog.js'), '//Treefrog is awesome')

    mkdirp(this.destinationPath('app'), function(err) { 
        // path exists unless there was an error
        if(err){
          self.log(chalk.blue('app')+ ' directory already exists or could not create');
        }else{
          self.log(chalk.green('app') + ' directory created');
        }
    });

  },

  react() {

  },

  angular() {

  },

  foundation() {

  },

  bootstrap() {

  }

};
