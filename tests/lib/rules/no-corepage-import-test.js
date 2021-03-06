'use strict';

var rule = require('../../../lib/rules/no-corepage-import'),
    RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});

var ruleTester = new RuleTester();
ruleTester.run('no-corepage-import', rule, {

    valid: [
      `import Category from 'core/pages/Category'`
    ],

    invalid: [
      {
        code: `import corePage from 'core/lib/themes'`,
        errors: [{
          message: `The corePage() method has been removed. Import the component as you usually do. Example: import Category from 'core/pages/Category'`,
          type: 'ImportDeclaration'
        }]
      },
      {
          code: `import { corePage } from 'core/lib/themes'`,
          errors: [{
            message: `The corePage() method has been removed. Import the component as you usually do. Example: import Category from 'core/pages/Category'`,
            type: 'ImportDeclaration'
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
          mixins: [corePage('Category')]
        }`,
        errors: [{
          message: `The corePage() method has been removed. Import the component as you usually do. Example: import Category from 'core/pages/Category'`,
          type: 'ImportDeclaration'
        }],
        output: `
        import Category from 'core/pages/Category'

        export default {
          methods: {
            close () {
            }
          },
          mixins: [corePage('Category')]
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
          message: `The corePage() method has been removed. Import the component as you usually do. Example: import Category from 'core/pages/Category'`,
          type: 'ImportDeclaration'
        }],
        output: `
        import SearchPanel from 'core/pages/blocks/SearchPanel/SearchPanel'
        import ProductTile from 'theme/components/core/ProductTile'

        export default {
          components: {
            ProductTile
          },
          mixins: [corePage('blocks/SearchPanel/SearchPanel')]
        }`
      }
    ]
});