import path from 'path';
import { assert, test } from 'yeoman-generator';

describe('treefrog:app', () => {
  describe('Should create treefrog from trails/archetype', () => {
    before(done => {
      test
        .run(path.join(__dirname, '..', '..', 'src', 'app'))
        .withPrompts({
          'web-engine': 'express',
          'orm-engine': 'waterline',
          'authorName': 'treefrog',
          'authorEmail': 'hello@treefrog.io',
          'license': 'MIT',
          'taskmanager': 'gulp',
          'frontend': 'angular',
          'angular-version': 2,
          'javascript': 'typescript',
          'style': 'treefrog',
          'srcDir': 'src',
          'outDir': 'dist'
        })
        .withOptions({
          'skip-update': true,
          'skip-intall': true
        })
        .on('end', done)
    });

    it('Should properly create root files', () => {
      assert.file([
        'src'
      ]);
    });

    it('Should properly create config files', () => {
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
      ]);
    });
    
    it('should set correct treefrog.js file', () => {
      assert.fileContent([
        ['config/treefrog.js', /taskmanager: \'gulp\'/],
        ['config/treefrog.js', /javascript: \'typescript\'/],
        ['config/treefrog.js', /frontend: \'angular\'/],
        ['config/treefrog.js', /style: \'treefrog\'/]
      ])
    })

    // it('should see Treefrog in index.js', () => {
    //   assert.fileContent('app/index.js', /Treefrog is awesome/)
    // });
    
  });
});

