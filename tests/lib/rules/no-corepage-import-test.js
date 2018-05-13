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
      `import Overlay from 'core/components/Overlay'`
    ],

    invalid: [
      {
          code: `import { corePage } from 'core/lib/themes'`,
          errors: [{
            message: `The corePage() method has been removed. Import the component as you usually do. Example: import Overlay from 'core/components/Overlay'`,
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
          mixins: [corePage('Overlay')]
        }`,
        errors: [{
          message: `The corePage() method has been removed. Import the component as you usually do. Example: import Overlay from 'core/components/Overlay'`,
          type: 'ImportDeclaration'
        }],
        output: `
        import Overlay from 'core/components/Overlay'

        export default {
          methods: {
            close () {
            }
          },
          mixins: [corePage('Overlay')]
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
          message: `The corePage() method has been removed. Import the component as you usually do. Example: import Overlay from 'core/components/Overlay'`,
          type: 'ImportDeclaration'
        }],
        output: `
        import SearchPanel from 'core/components/blocks/SearchPanel/SearchPanel'
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