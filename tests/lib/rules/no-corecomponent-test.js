'use strict';

var rule = require('../../../lib/rules/no-corecomponent'),
    RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});

var ruleTester = new RuleTester();
ruleTester.run('no-corecomponent', rule, {

    valid: [
      'mixins: [Overlay]'
    ],

    invalid: [
      {
          code: `mixins: [coreComponent('Overlay')]`,
          errors: [{
            message: `The coreComponent() method has been removed.`,
            type: 'CallExpression'
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
          message: `The coreComponent() method has been removed.`,
          type: 'CallExpression'
        }],
        output: `
        import { coreComponent } from 'core/lib/themes'

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
        import { coreComponent } from 'core/lib/themes'
        import ProductTile from 'theme/components/core/ProductTile'

        export default {
          components: {
            ProductTile
          },
          mixins: [coreComponent('blocks/SearchPanel/SearchPanel')]
        }`,
        errors: [{
          message: `The coreComponent() method has been removed.`,
          type: 'CallExpression'
        }],
        output: `
        import { coreComponent } from 'core/lib/themes'
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