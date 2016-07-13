/**
 * Step 1
 * Your initialization methods (checking current project state, getting configs, etc)
 */

import chalk from 'chalk';
import updateNotifier from 'update-notifier';
import printMessage from 'print-message';
import yosay from 'yosay';
import path from 'path';

function _onUpdateNotifier(done, error, update) {
  if (update && update.type !== 'latest') {
    printMessage([
      'Update available: ' + chalk.green.bold(update.latest) + chalk.dim(' (current: ' + update.current + ')'),
      'Run ' + chalk.blue('npm update -g ' + update.name) + ' to update.'
    ], {
      printFn: this.log
    });
  }

  done();
}

export default {
  loadPackageInfo: function () {
    this.pkg = require('../../../package.json');
  },

  sayHello: function () {
    this.log('=======================================');
    this.log('Get ready to hop on a new ' + chalk.green('Treefrog app') + '!');
    this.log('=======================================');
  },

  checkUpdates: function () {
    if (!this.options['skip-update']) {
      this.log(chalk.yellow('Checking for updates...'));
      updateNotifier({
        pkg: this.pkg,
        callback: _onUpdateNotifier.bind(this, this.async())
      });
    }
  }

  // checkTrailpack: function() {
  //   this.appPkg = {};
  //   this.appConfigMain = {};

  //   if (!this.options['skip-install']) {
  //     this.log(chalk.yellow('Checking if trailpack-treefrog is installed...')); 
  //     this.appPkg = require(path.resolve(this.destinationPath(),'package.json'));
  //     this.appConfigMain = require(path.resolve(this.destinationPath(),'config/main.js'));

  //     if(!this.appPkg.dependencies['trailpack-treefrog']){
  //       this.log(chalk.red('trailpack-treefrog not installed.') + ' Run '+ chalk.blue('npm install trailpack-treefrog --save'));
  //     }
  //   }
  // }
}
