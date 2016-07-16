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

import trailsQuestions from 'generator-trails/generators/service/questions'
 
const questions = trailsQuestions.concat([

])

export default questions

// [
//   {
//     type: 'input',
//     name: 'desc',
//     message: 'Service Description',
//     default: 'TODO document Service'
//   }
// ]
