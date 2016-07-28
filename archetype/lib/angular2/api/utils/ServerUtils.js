'use strict'

const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const trailsRoutes = require('../../config/routes')

const ServerUtils = {}

module.exports = Object.assign(ServerUtils, {
  getRoot: () => {
    return path.dirname(require.main.filename)
  },
  getFullPath: function() {
    return path.join.apply(null, [ServerUtils.getRoot()].concat(Array.from(arguments)))
  },
  buildAngularRoutes: () => {
    return new Promise((resolve, reject) => {
      let imports = {}
      let routes = '[\n'
      let route404 = ''

      trailsRoutes.forEach(route => {
        if (route.config && route.config.app && route.config.app.angular) {
          let path = route.path.replace('/*', '**').replace('/', '')
          route = route.config.app.angular.route
          if (route.path) { //Possibility to override trails path by angular specific path
            path = route.path
          }
          imports[route.componentName] = route.component
          if (path == '**') {
            route404 += `  {path: '${path}', component: ${route.componentName} },\n`
          }
          else {
            routes += `  {path: '${path}', component: ${route.componentName} },\n`
          }
        }
      })
      routes += route404
      routes += '];'


      let importsContent = _.map(imports, (value, key) => `import { ${key} } from '${value}';\n`)

      fs.writeFileSync(path.join(__dirname, '..', '..', 'app', 'routes.ts'),
        `'use strict'\n${importsContent.join('')}\nexport const isoRoutes = ${routes}\n`)
      resolve()
    })
  }
})
