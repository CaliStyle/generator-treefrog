/**
 * Step 5
 * Where you write the generator specific files (routes, controllers, etc)
 */

var yeoman = require('yeoman-environment');

export default function () {
  var env = yeoman.createEnv();

  env.lookup(function () {
    env.run('treefrog:model ' + this['api-name']);
    env.run('treefrog:controller ' + this['api-name']);
  }.bind(this));

};
