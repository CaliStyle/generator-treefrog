import path from 'path';
import { assert, test } from 'yeoman-generator';

describe('treefrog:app', () => {
  describe('Should create treefrog from trailspack/archetype', () => {
    before(done => {
      test
        .run(path.join(__dirname, '..', '..', 'src', 'app'))
        .withPrompts({
          frontend: 'react',
          style: 'foundation-apps'
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

    it('Should properly create config files', () => {
      assert.file([
        'config/treefrog.js'
      ]);
    });
    
    it('should set correct treefrog.js file', () => {
      assert.fileContent([
        ['config/treefrog.js', /frontend: \'react\'/],
        ['config/treefrog.js', /style: \'foundation-apps\'/]
      ])
    })

    // it('should see Treefrog in index.js', () => {
    //   assert.fileContent('app/index.js', /Treefrog is awesome/)
    // });
    
  });
});

