'use strict';

module.exports = function(context) {

    return {
      CallExpression: function(node) {

      if(node.type == 'CallExpression' && 
          node.callee &&
          node.callee.type == 'Identifier' && 
          node.callee.name == 'coreComponent') {
        
        context.report({
          node: node,
          message: `The coreComponent() method has been removed.`,
          fix: function (fixer) {
            let path = node.arguments[0].value;
            let component = '';
            if (path.indexOf('/')) {
              component = path.substring(path.lastIndexOf('/') + 1, path.length);
            } else {
              component = path;
            }
            return fixer.replaceText(node, component);
          }
        });
      }
    }
  };
};

module.exports.schema = [];