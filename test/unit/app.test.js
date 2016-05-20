import path from 'path';
import { assert, test } from 'yeoman-generator';

describe('treefrog:app', () => {
  describe('Should create treefrog from trailspack/archetype', () => {
    before(done => {
      test
        .run(path.join(__dirname, '..', '..', 'src', 'app'))
        .withPrompts({
          frontend: 'react'
        })
        .withOptions({
          'skip-update': true,
          'skip-intall': true
        })
        .on('end', done)
    });

    it('Should properly create root files', () => {
      assert.file([
        'app',
        // 'views',
        // 'src'
      ]);
    });
    
    // it('should see Treefrog in index.js', () => {
    //   assert.fileContent('app/index.js', /Treefrog is awesome/)
    // });
    // it('should set correct license in package.json', () => {
    //   assert.JSONFileContent('package.json', { license: 'MIT' })
    // })
  });
});

