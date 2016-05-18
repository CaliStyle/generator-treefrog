/**
 * Step 8
 * Called last, cleanup, say good bye, etc
 */

import chalk from 'chalk';
import printMessage from 'print-message';

export default function () {
  printMessage([
    `Your ${chalk.green('Treefrog')} module has been created!`,
    `---`
  ], {
    printFn: this.log
  });
};
