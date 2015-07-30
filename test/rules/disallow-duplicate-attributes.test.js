module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  describe('disallowDuplicateAttributes', function () {

    describe('true', function () {

      before(function () {
        linter.configure({ disallowDuplicateAttributes: true })
      })

      it('should report duplicate attributes', function () {
        assert.equal(linter.checkString('div(a=\'a\' a=\'b\')').length, 1)
      })

      it('should report duplicate ID attributes', function () {
        assert.equal(linter.checkString('#id(class=\'class\' id=\'id\')').length, 1)
      })

      it('should not report duplicate class attributes', function () {
        assert.equal(linter.checkString('.class(class=\'class\' class=\'class\')').length, 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-duplicate-attributes.jade')

        assert.equal(result.length, 3)
        assert.equal(result[0].code, 'JADE:LINT_DISALLOWDUPLICATEATTRIBUTES')

      })

    })

  })

}
