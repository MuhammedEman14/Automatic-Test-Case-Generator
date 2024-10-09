// // javascript-extractor.js
// const ts = require('typescript');

// function extractFunctionInfo(code) {
//   const sourceFile = ts.createSourceFile(
//     'temp.ts',
//     code,
//     ts.ScriptTarget.Latest,
//     true,
//     ts.ScriptKind.TS
//   );

//   const functions = [];

//   function visit(node) {
//     if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) {
//       const functionName = node.name?.getText();
//       const returnType = node.type ? node.type.getText() : 'any';

//       const parameters = [];
//       if (node.parameters) {
//         for (const parameter of node.parameters) {
//           const paramName = parameter.name.getText();
//           const paramType = parameter.type ? parameter.type.getText() : 'any';
//           parameters.push({ name: paramName, type: paramType });
//         }
//       }

//       functions.push({ name: functionName || '', returnType, parameters });
//     }

//     ts.forEachChild(node, visit);
//   }

//   visit(sourceFile);

//   return functions;
// }

// module.exports = { extractFunctionInfo };
// javascript-extractor.js
const ts = require('typescript');

function extractFunctionInfo(code) {
  const sourceFile = ts.createSourceFile(
    'temp.ts',
    code,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );

  const functions = [];

  function visit(node) {
    if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) {
      const functionName = node.name?.getText();
      const returnType = node.type ? node.type.getText() : 'any';

      const parameters = [];
      if (node.parameters) {
        for (const parameter of node.parameters) {
          const paramName = parameter.name.getText();
          const paramType = parameter.type ? parameter.type.getText() : 'any';
          parameters.push({ name: paramName, type: paramType });
        }
      }

      functions.push({ name: functionName || '', returnType, parameters });
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return functions;
}

module.exports = { extractFunctionInfo };
