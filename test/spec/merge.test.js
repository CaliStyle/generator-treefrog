
import fs from 'fs'
import path from 'path'
import merge from '../../src/lib/package-merge'
import { expect } from 'chai'

function fixture(name) {
    return fs.readFileSync(path.join(
        __dirname, '..', 'fixtures', name+'.fixture.json'
    ), 'utf8')
}

describe('treefrog:lib', () => {
  describe('#package-merge', () => {

    it('should output valid JSON', function() {
      const result = merge(
        fixture('complete'),
        fixture('dependencies')
      )
      expect(function() {
        JSON.parse(result)
      }).to.not.throw()
    })

    it('should merge dependencies correctly', function() {
      const result = JSON.parse(merge(
        fixture('complete'),
        fixture('dependencies')
      ))

      expect(result.dependencies).to.have.property('express', '^5.0.0')
    })

    it('should work on emptiness', function() {
      const result = JSON.parse(merge(
        fixture('complete'),
        fixture('dependencies')
      ))
      expect(result.dependencies).to.have.property('express', '^5.0.0')
    })
    it('should accept object literal for argument "dst"', function() {
      const result = JSON.parse(merge(
        { dependencies: { foo: '^42.0.0' } },
        fixture('complete')
      ))

      expect(result.dependencies).to.have.property('foo', '^42.0.0');
    })
    it('should accept object literal for argument "src"', function() {
      const result = JSON.parse(merge(
        fixture('complete'),
        { dependencies: { foo: '^42.0.0' } }
      ))

      expect(result.dependencies).to.have.property('foo', '^42.0.0');
    })
  })
})