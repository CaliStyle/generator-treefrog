import path from 'path';
import os from 'os';
import { assert, test } from 'yeoman-generator';

describe('treefrog:policy', () => {
  describe('Should properly generate policy interface', () => {
    before(done => {
      test
        .run(path.join(__dirname, '..', '..', 'src', 'policy'))
        .withArguments(['test'])
        .on('end', done)
    });

    it('Should properly create policy files', () => {
      assert.file([
        'api/policies/Test.js'
      ]);

    });

    it('Should properly create test files', () => {
      assert.file([
        'test/integration/policies/Test.test.js'
      ]);

    });
  });
});
