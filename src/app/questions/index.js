'use strict';

//Questions
export default [

// web-engine
{
  type: 'list',
  name: 'web-engine',
  message: 'Choose a Web Server',
  choices: [
    'hapi',
    'express',
    'koa (not supported yet)',
    'restify (not supported yet)',
    'other'
  ],
  defaults: 'hapi'
},
{
  when: responses => {
    return responses['web-engine'] == 'other'
  },
  name: 'web-engine-other',
  message: 'What is the name of this web engine?'
},
{
  type: 'list',
  when: responses => {
    return responses['web-engine'] == 'express'
  },
  name: 'express-version',
  message: 'What express version do you want to use ?',
  choices: [
    '4',
    '5',
    'other'
  ],
},
{
  when: responses => {
    return responses['express-version'] == 'other'
  },
  name: 'express-version-other',
  message: 'What express version do you want to use (example 4.13.3) ?'
},

// orm-engine
{
  type: 'list',
  name: 'orm-engine',
  message: 'Choose an ORM',
  choices: [
    'waterline',
    'mongoose',
    'knex',
    'sequelize',
    'bookshelf',
    'js-data',
    'none',
    'other'
  ],
  defaults: 'waterline'
},
{
  when: responses => {
    return responses['orm-engine'] == 'other'
  },
  name: 'orm-engine-other',
  message: 'What is the name of this ORM ?'
},

// footprints
{
  type: 'confirm',
  when: responses => {
    return responses['orm-engine'] != 'none'
  },
  name: 'footprints',
  message: 'Do you want to use Footprints (automatic REST API from models) ?'
},
// frontend
{
  type: 'list',
  name: 'frontend',
  message: 'App Frontend Framework',
  default: 'angular',
  choices: ['angular', 'react (not yet supported)', 'other (not yet supported)']
}, {
  when: function when(responses) {
    return responses['frontend'] == 'other';
  },
  name: 'frontend-other',
  message: 'What is the name of this frontend?'
}, {
  type: 'list',
  when: function when(responses) {
    return responses['frontend'] == 'angular';
  },
  name: 'angular-version',
  message: 'What angular version do you want to use?',
  default: '2',
  choices: ['1 (not yet supported)', '2']
},

// style
{
  type: 'list',
  name: 'style',
  message: 'App Style Framework',
  default: 'treefrog',
  choices: ['treefrog','bootstrap (not yet supported)', 'foundation (not yet supported)', 'other (not yet supported)', 'none (not yet supported)']
}, {
  type: 'list',
  when: function when(responses) {
    return responses['style'] == 'foundation';
  },
  name: 'foundation-version',
  message: 'What foundation version do you want to use?',
  default: 'foundation-apps',
  choices: ['foundation-sites (not yet supported)', 'foundation-apps']
}, {
  when: function when(responses) {
    return responses['style'] == 'other';
  },
  name: 'style',
  message: 'What is the name of this frontend?'
},

// taskmanager
{
  type: 'list',
  name: 'taskmanager',
  message: 'Task Manager',
  default: 'gulp',
  choices: ['gulp', 'grunt (not yet supported)', 'webpack (not yet supported)']
}, {
  type: 'list',
  name: 'javascript',
  message: 'How would you like to write your javascript?',
  default: 'typescript',
  choices: ['typescript', 'es6', 'es5']
}, 

// srcDir
{
  type: 'list',
  name: 'srcDir',
  message: 'What would you like your Source Directory to be?',
  default: 'app',
  choices: ['app', 'src', 'other']
}, {
  when: function when(responses) {
    return responses['srcDir'] == 'other'
  },
  name: 'srcDir',
  message: 'What is the name of the Source Directory?'
},

// outDir
{
  type: 'list',
  name: 'outDir',
  message: 'What would you like your Output Directory to be?',
  default: 'dist',
  choices: ['dist', '.tmp', 'other']
}, {
  when: function when(responses) {
    return responses['outDir'] == 'other'
  },
  name: 'outDir',
  message: 'What is the name of the Output Directory?'
}];
module.exports = exports['default']