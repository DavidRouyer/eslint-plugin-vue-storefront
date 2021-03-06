'use strict';

module.exports = function(context) {

    return {
      ImportDeclaration: function(node) {

      node.specifiers.forEach(function(specifier) {
        if((specifier.type == 'ImportSpecifier' && 
           specifier.imported &&
           specifier.imported.type == 'Identifier' && 
           specifier.imported.name == 'coreComponent') ||
           (specifier.type == 'ImportDefaultSpecifier' && 
           specifier.local &&
           specifier.local.type == 'Identifier' && 
           specifier.local.name == 'coreComponent')) {
          
          context.report({
            node: node,
            message: `The coreComponent() method has been removed. Import the component as you usually do. Example: import Overlay from 'core/components/Overlay'`,
            fix: function (fixer) {
              const tree = context.getSourceCode();
              let path = '';
              let component = '';
              const sourceCode = context.getSourceCode().getLines().forEach((line, index) => {
                if (line.includes('coreComponent(')) {
                  path = line.substring(line.indexOf(`'`) + 1, line.lastIndexOf(`'`));
                  if (path.indexOf('/') !== -1) {
                    component = path.substring(path.lastIndexOf('/') + 1, path.length);
                  } else {
                    component = path;
                  }
                }
              });
              return fixer.replaceText(node, `import ${component} from 'core/components/${path}'`);
            }
          });
        }
      });
    }
  };
};

module.exports.schema = [];