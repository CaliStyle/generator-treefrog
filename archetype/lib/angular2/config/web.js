// Universal
const ng2U = require('angular2-universal')

{ 
  views: {
    engines: {
      'ng2.html': ng2U.expressEngine
    },
    path: 'app'
  }
}