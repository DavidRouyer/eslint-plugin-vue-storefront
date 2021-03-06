'use strict';

var rule = require('../../../lib/rules/no-corecomponent-import'),
    RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});

var ruleTester = new RuleTester();
ruleTester.run('no-corecomponent-import', rule, {

    valid: [
      `import Overlay from 'core/components/Overlay'`
    ],

    invalid: [
      {
        code: `import coreComponent from 'core/lib/themes'`,
        errors: [{
          message: `The coreComponent() method has been removed. Import the component as you usually do. Example: import Overlay from 'core/components/Overlay'`,
          type: 'ImportDeclaration'
        }]
      },
      {
          code: `import { coreComponent } from 'core/lib/themes'`,
          errors: [{
            message: `The coreComponent() method has been removed. Import the component as you usually do. Example: import Overlay from 'core/components/Overlay'`,
            type: 'ImportDeclaration'
          }]
      },
      {
        code: `
        import { coreComponent } from 'core/lib/themes'

        export default {
          methods: {
            close () {
            }
          },
          mixins: [coreComponent('Overlay')]
        }`,
        errors: [{
          message: `The coreComponent() method has been removed. Import the component as you usually do. Example: import Overlay from 'core/components/Overlay'`,
          type: 'ImportDeclaration'
        }],
        output: `
        import Overlay from 'core/components/Overlay'

        export default {
          methods: {
            close () {
            }
          },
          mixins: [coreComponent('Overlay')]
        }`
      },
      {
        code: `
        import { coreComponent } from 'core/lib/themes'
        import ProductTile from 'theme/components/core/ProductTile'

        export default {
          components: {
            ProductTile
          },
          mixins: [coreComponent('blocks/SearchPanel/SearchPanel')]
        }`,
        errors: [{
          message: `The coreComponent() method has been removed. Import the component as you usually do. Example: import Overlay from 'core/components/Overlay'`,
          type: 'ImportDeclaration'
        }],
        output: `
        import SearchPanel from 'core/components/blocks/SearchPanel/SearchPanel'
        import ProductTile from 'theme/components/core/ProductTile'

        export default {
          components: {
            ProductTile
          },
          mixins: [coreComponent('blocks/SearchPanel/SearchPanel')]
        }`
      }
    ]
});