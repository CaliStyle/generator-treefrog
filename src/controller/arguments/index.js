/**
 * Exports object that contains names of arguments as a key and their configuration objects as a value
 *
 * @example
 * export default {
 *   argumentName: {
 *     desc: 'Description for the argument',
 *     required: false,
 *     optional: true,
 *     type: String || Number || Array || Object,
 *     defaults: 'Default value for this argument',
 *     banner: 'String to show on usage notes'
 *   }
 * };
 */

import {extend} from 'lodash' 
import trailsArguments from 'generator-trails/generators/controller/arguments'
 
export default extend(trailsArguments, {

})
