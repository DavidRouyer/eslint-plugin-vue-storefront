'use strict';

var rule = require('../../../lib/rules/no-corepage'),
    RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});

var ruleTester = new RuleTester();
ruleTester.run('no-corepage', rule, {

    valid: [
      'mixins: [Overlay]'
    ],

    invalid: [
      {
          code: `mixins: [corePage('Overlay')]`,
          errors: [{
            message: `The corePage() method has been removed.`,
            type: 'CallExpression'
          }]
      },
      {
        code: `
        import { corePage } from 'core/lib/themes'

        export default {
          methods: {
            close () {
            }
          },
          mixins: [corePage('Overlay')]
        }`,
        errors: [{
          message: `The corePage() method has been removed.`,
          type: 'CallExpression'
        }],
        output: `
        import { corePage } from 'core/lib/themes'

        export default {
          methods: {
            close () {
            }
          },
          mixins: [Overlay]
        }`
      },
      {
        code: `
        import { corePage } from 'core/lib/themes'
        import ProductTile from 'theme/components/core/ProductTile'

        export default {
          components: {
            ProductTile
          },
          mixins: [corePage('blocks/SearchPanel/SearchPanel')]
        }`,
        errors: [{
          message: `The corePage() method has been removed.`,
          type: 'CallExpression'
        }],
        output: `
        import { corePage } from 'core/lib/themes'
        import ProductTile from 'theme/components/core/ProductTile'

        export default {
          components: {
            ProductTile
          },
          mixins: [SearchPanel]
        }`
      }
    ]
});