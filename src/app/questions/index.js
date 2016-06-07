'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

//Questions
exports.default = [{
  type: 'list',
  name: 'frontend',
  message: 'App Frontend Framework',
  default: 'angular',
  choices: ['angular', 'react (not yet supported)', 'other (not yet supported)']
}, {
  type: 'list',
  name: 'style',
  message: 'App Style Framework',
  default: 'foundation',
  choices: ['bootstrap (not yet supported)', 'foundation', 'other (not yet supported)', 'none (not yet supported)']
}, {
  type: 'list',
  name: 'taskmanager',
  message: 'Task Manager',
  default: 'webpack',
  choices: ['webpack', 'gulp (not yet supported)', 'grunt (not yet supported)']
}, {
  name: 'javascript',
  message: 'How would you like to write your javascript?',
  default: 'typescript',
  choices: ['typescript', 'es6', 'es5']
}, 

// Question Tree to Respones
{
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
}, {
  type: 'list',
  when: function when(responses) {
    return responses['style'] == 'foundation-apps';
  },
  name: 'foundation-version',
  message: 'What foundation version do you want to use?',
  default: 'foundation-apps',
  choices: ['foundation-sites (not yet supported)', 'foundation-apps']
}, {
  when: function when(responses) {
    return responses['style'] == 'other';
  },
  name: 'style-other',
  message: 'What is the name of this frontend?'
}];
module.exports = exports['default'];