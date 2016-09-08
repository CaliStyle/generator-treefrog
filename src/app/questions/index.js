'use strict';

import trailsQuestions from 'generator-trails/generators/app/questions'
 
const questions = trailsQuestions.concat(
//Treefrog Questions
[
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
  name: 'frontend',
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
  choices: ['gulp', 'grunt (not yet supported)']
},

// Bundler
{
  type: 'list',
  name: 'bundler',
  message: 'Bundler',
  default: 'webpack',
  choices: ['webpack', 'browserfy (not yet supported)', 'other', 'none']
}, {
  when: function when(responses) {
    return responses['bundler'] == 'other'
  },
  name: 'bundler',
  message: 'What is the name of the Bundler?'
},

// Javascript
{
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
}])

export default questions
