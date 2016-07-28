/**
 * Routes Configuration
 * (trails.config.routes)
 *
 * Configure how routes map to views and controllers.
 *
 * @see http://trailsjs.io/doc/config/routes.js
 */

'use strict'

module.exports = [

  /**
   * Render the HelloWorld view
   */
  {
    method: 'GET',
    path: '/*',
    handler: 'ViewController.home',
    config: {
      app: {
        angular: {
          route: {
            component: './pages/404/404.component',
            componentName: 'Pages404Component'
          }
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/',
    handler: 'ViewController.home',
    config: {
      app: {
        angular: {
          route: {
            component: './pages/home/home.component',
            componentName: 'PagesHomeComponent'
          }
        }
      }
    }
  },

  /**
   * Constrain the DefaultController.info handler to accept only GET requests.
   */
  {
    method: [ 'GET' ],
    path: '/api/v1/default/info',
    handler: 'DefaultController.info'
  }
]
