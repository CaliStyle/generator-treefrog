{  
  /**
   * Define application paths here. "root" is the only required path.
   */
  paths: {
    root: path.resolve(__dirname, '..'),
    temp: path.resolve(__dirname, '..', '<%= answers.outDir || "dist" %>'),
    templates: path.resolve(__dirname, '..', 'api', 'templates'),
    www: path.resolve(__dirname, '..', '<%= answers.outDir || "dist" %>', '<%= answers.srcDir || "app" %>')
  }
}
