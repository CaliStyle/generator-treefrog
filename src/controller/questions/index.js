/**
 * Exports array that contains questions for prompting.
 * The array with questions is an array of Inquirer prompt objects - https://github.com/SBoudrias/Inquirer.js#prompts-type
 *
 * @example
 * export default [{
 *   type: 'input',
 *   name: 'inputName',
 *   message: 'Message for the input'
 * }];
 */

export default [
  {
    type: 'input',
    name: 'desc',
    message: 'Controller Description',
    default: 'TODO document Controller'
  },
  {
    type: 'list',
    name: 'frontend',
    message: 'Controller Frontend Framework',
    default: 'react',
    choices: [
    	'angular (not yet supported)',
    	'react',
    	'other'
    ]
  },
  {
    when: responses => {
      return responses['frontend'] == 'other'
    },
    name: 'frontend-other',
    message: 'What is the name of this frontend?'
  },
  {
    type: 'list',
    when: responses => {
      return responses['frontend'] == 'angular'
    },
    name: 'angular-version',
    message: 'What angular version do you want to use?',
    choices: [
      '2'
    ]
  }
];
