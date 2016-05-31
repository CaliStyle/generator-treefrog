import path from 'path';
import { assert, test } from 'yeoman-generator';

describe('treefrog:app', () => {
  describe('Should create treefrog from trailspack/archetype', () => {
    before(done => {
      test
        .run(path.join(__dirname, '..', '..', 'src', 'app'))
        .withPrompts({
          'taskmanager': 'webpack',
          'frontend': 'angular',
          'angular-version': 2,
          'javascript': 'typescript',
          'style': 'foundation-apps'
        })
        .withOptions({
          'skip-update': true,
          'skip-intall': true
        })
        .on('end', done)
    });

    it('Should properly create root files', () => {
      assert.file([
        'app'
      ]);
    });

    it('Should properly create config files', () => {
      assert.file([
        'config/treefrog.js'
      ]);
    });
    
    it('should set correct treefrog.js file', () => {
      assert.fileContent([
        ['config/treefrog.js', /taskmanager: \'webpack\'/],
        ['config/treefrog.js', /javascript: \'typescript\'/],
        ['config/treefrog.js', /frontend: \'angular\'/],
        ['config/treefrog.js', /style: \'foundation-apps\'/]
      ])
    })

    // it('should see Treefrog in index.js', () => {
    //   assert.fileContent('app/index.js', /Treefrog is awesome/)
    // });
    
  });
});

