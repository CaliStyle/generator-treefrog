import path from 'path';
import { assert, test } from 'yeoman-generator';

describe('treefrog:app', () => {
  describe('Should create treefrog from trails/archetype', () => {
    before(done => {
      test
        .run(path.join(__dirname, '..', '..', 'src', 'app'))
        .withPrompts({
          name: 'treefrog-test',
          authorName: 'treefrog',
          authorEmail: 'hello@trailsjs.io',
          license: 'MIT'
        })
        .withOptions({
          'skip-update': true,
          'skip-install': true
        })
        .on('end', done)
    });

    it('Should properly create root files', () => {
      assert.file([
        'index.js',
        'api/index.js',
        'config/index.js',
        'config/trailpack.js',
        'package.json',
        'README.md'
      ]);
    });

    it('should set correct module name in package.json', () => {
      assert.JSONFileContent('package.json', { name: 'treefrog-test' })
    })
    it('should set correct license in package.json', () => {
      assert.JSONFileContent('package.json', { license: 'MIT' })
    })
    it('should set correct class name in index.js', () => {
      assert.fileContent('index.js', /class TestTreefrog extends Trailpack/)
    })
    it('should set correct title in README', () => {
      assert.fileContent('README.md', /^# treefrog-test/)
    })
    it('should set correct require in README "configure" section', () => {
      assert.fileContent('README.md', "require('treefrog-test')")
    })
  });
});

