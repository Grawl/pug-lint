var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowHtmlText'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForAllTokensByFilter(function (token) {
        return token.type === 'text-html' || (token.type === 'text' && /<[^\n]*/.test(token.val))
      }, errors, 'HTML text must not be used')

    }
  }