

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require("cors")
const { exec } = require('child_process');
const { extractFunctionInfo } = require('./extractor');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors({
  origin:'*'
}))
function generateRandomData(type) {
  switch (type) {
    case 'number':
      return Math.floor(Math.random() * 100);
    case 'string':
      return 'randomString';
    case 'boolean':
      return Math.random() < 0.5;
    case 'bigint':
      return BigInt(Math.floor(Math.random() * 100));
    case 'string[]':
      return Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => 'randomString');
    case 'number[]':
      return Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => Math.floor(Math.random() * 100));
    case 'boolean[]':
      return Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => Math.random() < 0.5);
    case 'bigint[]':
      return Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => BigInt(Math.floor(Math.random() * 100)));
    default:
      return null;
  }
}
function getConditionCoverage(coverageMap) {
  let totalConditions = 0;
  let conditionsCovered = 0;
coverageMap=coverageMap['/Users/gmdvirk/Desktop/Weblab/sqeproject/App.ts'].branchMap;
console.log(coverageMap)
  Object.values(coverageMap).forEach(fileCoverage => {
    if (fileCoverage.branchMap) {
      Object.values(fileCoverage.branchMap).forEach(branch => {
        totalConditions += branch.locations.length;

        branch.locations.forEach(location => {
          if (fileCoverage.b[location.start.line - 1][location.start.column]) {
            conditionsCovered++;
          }
        });
      });
    }
  });

  const conditionCoverage = (conditionsCovered / totalConditions) * 100;
  return conditionCoverage.toFixed(2) + '%';
}

//Statement Coverage
function extractCoverageInfo(jsonData) {
  const coverageMap = jsonData.coverageMap || {};
  const coverageInfo = [];

  for (const filePath in coverageMap) {
      if (coverageMap.hasOwnProperty(filePath)) {
          const fileData = coverageMap[filePath];
          const statementMap = fileData.statementMap || {};
          const coveredLines = fileData.s || {};

          const fileInfo = {
              path: filePath,
              coveredLines: Object.keys(coveredLines).filter(line => coveredLines[line] > 0),
              totalLines: Object.keys(statementMap).length,
              coveragePercentage: 0
          };

          if (fileInfo.totalLines > 0) {
              fileInfo.coveragePercentage = (fileInfo.coveredLines.length / fileInfo.totalLines) * 100;
          }

          coverageInfo.push(fileInfo);
      }
  }

  return coverageInfo;
}

function extractBranchCoverageInfo(jsonData) {
  const coverageMap = jsonData.coverageMap || {};
  const coverageInfo = [];

  for (const filePath in coverageMap) {
      if (coverageMap.hasOwnProperty(filePath)) {
          const fileData = coverageMap[filePath];
          const statementMap = fileData.statementMap || {};
          const branchMap = fileData.branchMap || {};
          const coveredLines = fileData.s || {};
          const coveredBranches = fileData.b || {};

          const fileInfo = {
              path: filePath,
              coveredLines: Object.keys(coveredLines).filter(line => coveredLines[line] > 0),
              totalLines: Object.keys(statementMap).length,
              coveredBranches: Object.keys(coveredBranches).filter(branch => coveredBranches[branch] > 0),
              totalBranches: Object.keys(branchMap).length,
              branchCoveragePercentage: 0
          };

          if (fileInfo.totalBranches > 0) {
              fileInfo.branchCoveragePercentage = (fileInfo.coveredBranches.length / fileInfo.totalBranches) * 100;
          }

          coverageInfo.push(fileInfo);
      }
  }

  return coverageInfo;
}
function generateRandomOutput(returnType) {
  switch (returnType) {
    case 'number':
      return Math.floor(Math.random() * 100);
    case 'string':
      return 'randomString';
    case 'string[]':
      return Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => 'randomString');
    default:
      return null;
  }
}

function generateTestCases(functionInfo, numberOfTestCases = 5) {
  const testCases = [];

  for (const func of functionInfo) {
    for (let i = 0; i < numberOfTestCases; i++) {
      const testCase = {
        functionName: func.name,
        inputs: {},
        expectedOutput: generateRandomOutput(func.returnType),
      };

      for (const param of func.parameters) {
        testCase.inputs[param.name] = generateRandomData(param.type);
      }

      testCases.push(testCase);
    }
  }

  return testCases;
}
function extractCoverageMetrics(testResults,coverageMapPath) {
const coverageMap=testResults.coverageMap
  // Extract Statement Coverage
  const statementMap = coverageMap[coverageMapPath].statementMap;
  const totalStatements = Object.keys(statementMap).length;
  const coveredStatements = Object.values(coverageMap[coverageMapPath].s).filter(Boolean).length;
  const statementCoverage = ((coveredStatements / totalStatements) * 100).toFixed(2);

  // Extract Functional Coverage
  const fnMap = coverageMap[coverageMapPath].fnMap;
  const totalFunctions = Object.keys(fnMap).length;
  const coveredFunctions = Object.values(coverageMap[coverageMapPath].f).filter(Boolean).length;
  const functionalCoverage = ((coveredFunctions / totalFunctions) * 100).toFixed(2);

  // Extract Branch Coverage
  const branchMap = coverageMap[coverageMapPath].branchMap;
  const totalBranches = Object.keys(branchMap).length;
  const coveredBranches = Object.values(coverageMap[coverageMapPath].b).flat().filter(Boolean).length;
  const branchCoverage = ((coveredBranches / totalBranches) * 100).toFixed(2);

  // Extract Condition Coverage
  const conditionMap = coverageMap[coverageMapPath].b;
  const totalConditions = Object.values(conditionMap).flat().length;
  const coveredConditions = Object.values(conditionMap).flat().filter(Boolean).length;
  const conditionCoverage = ((coveredConditions / totalConditions) * 100).toFixed(2);

  // Extract Multiple Condition/Decision Coverage
  const decisionMap = coverageMap[coverageMapPath].b;
  const totalDecisions = Object.keys(decisionMap).length;
  const coveredDecisions = Object.values(decisionMap).filter(decision => decision.some(Boolean)).length;
  const multipleConditionDecisionCoverage = ((coveredDecisions / totalDecisions) * 100).toFixed(2);

  // Extract Path Coverage (approximation)
  const pathStatementMap = coverageMap[coverageMapPath].statementMap;
  const totalPathStatements = Object.keys(pathStatementMap).length;
  const coveredPathStatements = Object.values(coverageMap[coverageMapPath].s).filter(Boolean).length;
  const pathCoverage = ((coveredPathStatements / totalPathStatements) * 100).toFixed(2);

  // // Extract Test Results
  // const testResults = coverageMap[coverageMapPath].result;
  // console.log(testResults)
  const passedTests = testResults.numPassedTests;
  const failedTests = testResults.numFailedTests;

  // Return the extracted values in an object
  return {
    statementCoverage,
    functionalCoverage,
    branchCoverage,
    conditionCoverage,
    multipleConditionDecisionCoverage,
    pathCoverage,
    passedTests,
    failedTests,
    totalStatements,
coveredStatements,
totalFunctions,
coveredFunctions,
totalBranches,
coveredBranches,
totalConditions,
coveredConditions,
totalDecisions,
coveredDecisions,
totalPathStatements,
coveredPathStatements,
  };
}





function convertTestCasesToText(testCases) {
  let code = '';

  for (const testCase of testCases) {
    const inputParams = Object.entries(testCase.inputs)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}: [${value.map(v => typeof v === 'string' ? `"${v}"` : v).join(', ')}]`;
        } else {
          return `${key}: ${value === null ? 'null' : typeof value === 'string' ? `"${value}"` : Array.isArray(value) ? `[${value.map(v => typeof v === 'string' ? `"${v}"` : v).join(', ')}]` : value}`;
        }
      })
      .join(', ');

    const expectedOutput = JSON.stringify(testCase.expectedOutput);

    code += `test('${testCase.functionName}(${inputParams})', () => {
    const result = App.${testCase.functionName}(${Object.values(testCase.inputs).map(v => {
      if (v === null) return 'null';
      if (Array.isArray(v)) return `${v.map(x => typeof x === 'string' ? `"${x}"` : x).join(', ')}`;
      return typeof v === 'string' ? `"${v}"` : v;
    }).join(', ')});
    expect(result).toEqual(${expectedOutput});
  });\n`;
  }

  return code;
}

app.post('/run-tests', async (req, res) => {
  const { userCode } = req.body;
// console.log("body",userCode);
  const code =userCode


const functionsInfo = extractFunctionInfo(code);

// console.log(functionsInfo);
  try {
    // Create a path to the App.ts file
    const appFilePath = path.join(__dirname, 'App.ts');

    // Write userCode to App.ts
    const appFileContent = `
      ${code}
    `;
    fs.writeFileSync(appFilePath, appFileContent);

    // Create a path to the app.test.ts file
    const testFilePath = path.join(__dirname, 'app.test.ts');

 
    // res.json({ functionsInfo })
    const testCases1 = generateTestCases(functionsInfo);

// console.log(JSON.stringify({ testCases1 }, null, 2));
// res.json({ testCases1 })
const testCasesText = convertTestCasesToText(testCases1);
   // Write test cases to app.test.ts with imports
   const testFileContent = `
   import * as App from './App';\n

   ${testCasesText}
 `;
 fs.writeFileSync(testFilePath, testFileContent);
// res.json({ testCasesText })
    // Run Jest programmatically
    const command = `npx jest --config jest.config.js --json`;

    exec(command, (error, stdout) => {
 

      let testResults;
      try {
        testResults = JSON.parse(stdout);
        console.log(stdout)
      } catch (parseError) {
        console.error('Error parsing Jest output as JSON:', parseError);
        return res.status(500).json({ error: 'Failed to parse test results' });
      }
// const coverageInfo = extractCoverageInfo(testResults);

// if (coverageInfo.length > 0) {
//     coverageInfo.forEach(fileInfo => {
//         console.log(`File: ${fileInfo.path}`);
//         console.log(`Covered Lines: ${fileInfo.coveredLines}`);
//         console.log(`Total Lines: ${fileInfo.totalLines}`);
//         console.log(`Coverage Percentage: ${fileInfo.coveragePercentage.toFixed(2)}%\n`);
//     });
// } else {
//     console.log("testResults.coverageMap");
// }
// const branchInfo = extractBranchCoverageInfo(testResults);

// if (branchInfo.length > 0 && branchInfo[0].totalLines > 0) {
//     branchInfo.forEach(fileInfo => {
//         console.log(`File: ${fileInfo.path}`);
//         console.log(`Covered Lines: ${fileInfo.coveredLines}`);
//         console.log(`Total Lines: ${fileInfo.totalLines}`);
//         console.log(`Branches: ${fileInfo.coveredBranches}`);
//         console.log(`Total Branches: ${fileInfo.totalBranches}`);
//         console.log(`Branch Coverage Percentage: ${fileInfo.branchCoveragePercentage.toFixed(2)}%\n`);
//     });
// } else {
//     console.log("No coverage information available.");
// }

const coverageMap = testResults.coverageMap;
console.log(coverageMap)
const coverageMetrics = extractCoverageMetrics(testResults,'/Users/gmdvirk/Desktop/Weblab/sqeproject/App.ts');
console.log(coverageMetrics);

      // Send back test results in the response
      return res.json({ testResults ,testFileContent,appFileContent,coverageMetrics});
    });
  } catch (error) {
    console.error(`Error during test execution: ${error}`);
    return res.status(500).json({ error: 'Failed to run tests' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// Loop Coverage: Measures the percentage of loops that have been executed a certain number of times.