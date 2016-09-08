/**
 * Treefrog Configuration
 * REPL: `app.config.treefrog`
 *
 * Configured by `$ yo treefrog` 
 * This file dictates how your files are generated.
 */

module.exports = {
  taskmanager: '<%= answers.taskmanager %>',
  bundler: '<%= answers.bundler %>',
  javascript: '<%= answers.javascript || "es6" %>',
  frontend: '<%= answers.frontend %>',
  style: '<%= answers.style %>',
  srcDir: '<%= answers.srcDir %>',
  outDir: '<%= answers.outDir %>'
}
