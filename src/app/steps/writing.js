/**
 * Step 5
 * Where you write the generator specific files (routes, controllers, etc)
 */
import chalk from 'chalk';

const Util = require('../util')
const falafel = require('falafel')
const path = require('path')
const TRAILS_TEMPLATE = path.dirname(require.resolve('trailpack/archetype'))
const mkdirp = require('mkdirp');

export default {
  //files () {

    
  //   this.fs.copy(path.resolve(TRAILS_TEMPLATE, 'api', '**'), this.destinationPath('api'))
  //   this.fs.copy(path.resolve(TRAILS_TEMPLATE, 'config', '**'), this.destinationPath('config'))
  //   this.fs.copy(path.resolve(TRAILS_TEMPLATE, 'test', '**'), this.destinationPath('test'))
  //   this.fs.copy(path.resolve(TRAILS_TEMPLATE, 'test', '.*'), this.destinationPath('test'))
  //},
  root() {
    
    const frontend = this.answers ? this.answers['frontend'] : null
    const self = this;

    mkdirp(this.destinationPath('app'), function(err) { 
        // path exists unless there was an error
        if(err){
          self.log(chalk.blue('app directory already exists'));
        }else{
          self.log(chalk.green('app directory created'));
        }
    });

    // mkdirp(this.destinationPath('src'), function(err) { 
    //     // path exists unless there was an error
    //     if(err){
    //       self.log(chalk.blue('src directory already exists'));
    //     }else{
    //       self.log(chalk.green('src directory created'));
    //     }
    // });

    // mkdirp(this.destinationPath('views'), function(err) { 
    //     // path exists unless there was an error
    //     if(err){
    //       self.log(chalk.blue('views directory already exists'));
    //     }else{
    //       self.log(chalk.green('views directory created'));
    //     }
    // });

    //this.fs.write(this.destinationPath('app/index.js'), '//Treefrog is awesome')
  }
};
