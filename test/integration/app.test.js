import path from 'path';
import assert from 'yeoman-assert'
import test from 'yeoman-test'
import TrailsApp from 'trails'

describe('treefrog:app', () => {
  describe('Should create treefrog from trails/archetype and treefrog/archetype', () => {
    let tmpDir
    before(done => {
      return test
        .run(path.join(__dirname, '..', '..', 'src', 'app'))
        .inTmpDir(dir => {
          tmpDir = dir
        })
        .withPrompts({
          'web-engine': 'express',
          'express-version': '4',
          'orm-engine': 'waterline',
          'authorName': 'treefrog',
          'authorEmail': 'hello@treefrog.io',
          'license': 'MIT',
          'footprints': 'y',
          'frontend': 'angular',
          'angular-version': 2,
          'taskmanager': 'gulp',
          'javascript': 'typescript',
          'style': 'treefrog',
          'srcDir': 'src',
          'outDir': 'dist'
        })
        .withOptions({
          'skip-update': true,
          'skip-intall': false
        })
        .toPromise()
    })

    // it('Should properly create source folder', () => {
    //   assert.file([
    //     'src'
    //   ])
    // })

    it('Should properly create config files', () => {
      console.log('CONFIG FILES')
      assert.file([
        '.editorconfig',
        '.gitignore',
        'index.js',
        'server.js',
        'api/index.js',
        'api/models/index.js',
        'api/services/index.js',
        'config/index.js',
        'config/database.js',
        'config/footprints.js',
        'config/main.js',
        'config/log.js',
        'config/policies.js',
        'config/routes.js',
        'config/session.js',
        'config/treefrog.js',
        'config/views.js',
        'config/web.js',
        'config/env/testing.js',
        'config/env/staging.js',
        'config/env/production.js',
        'config/env/development.js',
        'config/env/index.js',
        'package.json',
        'LICENSE'
      ])
    })
    
    it('should set correct treefrog.js file', () => {
      console.log('CORRECT TREEFROG')
      assert.fileContent([
        ['config/treefrog.js', /taskmanager: \'gulp\'/],
        ['config/treefrog.js', /javascript: \'typescript\'/],
        ['config/treefrog.js', /frontend: \'angular\'/],
        ['config/treefrog.js', /style: \'treefrog\'/],
        ['config/treefrog.js', /srcDir: \'src\'/],
        ['config/treefrog.js', /outDir: \'dist\'/]
      ])
    })

    it('Should properly start', done => {
      console.log('STARTING')
      const trailsApp = new TrailsApp(require(tmpDir))
      const stop = () => {
        return trailsApp.stop().then(_ => {
          done()
        }).catch(done)
      }
      trailsApp.start().then(stop).catch(stop)
    })

    // it('should see Treefrog in index.js', () => {
    //   assert.fileContent('app/index.js', /Treefrog is awesome/)
    // });
    
  });
});

