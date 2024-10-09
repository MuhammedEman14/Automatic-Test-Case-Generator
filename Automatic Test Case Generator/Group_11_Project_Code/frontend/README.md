
# Code Analyzer Tool

The Code Analyzer Tool is a powerful utility for analyzing and testing TypeScript code, providing insights into code coverage, function metrics, and generating random test cases. This tool leverages Jest for running tests and extracting coverage information.

## Features

- **Code Analysis:** Extracts function information, statement coverage, and branch coverage from the provided TypeScript code.
- **Random Test Case Generation:** Automatically generates random test cases for functions in the code.
- **Jest Integration:** Runs Jest programmatically to execute tests and obtain detailed test results.
- **Coverage Metrics:** Calculates various coverage metrics, including statement, functional, branch, condition, multiple condition/decision, and path coverage.
- **Test Case Export:** Generates Jest test cases with import statements, making it easy to run tests independently.

## Installation

1. Install dependencies:

    npm install

## Usage

### Running Tests

1. Write your TypeScript code in the `App.ts` file.

2. Start the server:
    npm start

3. Use the provided API endpoint to run tests:

    - **Endpoint:** `POST /run-tests`
    - **Request Body:**
      {
        "userCode": "/* Your TypeScript code here */"
      }

4. Analyze the generated test results and coverage metrics.

### Adding TypeScript Data Types

The tool supports various TypeScript data types, including numbers, strings, booleans, BigInt, and their array counterparts. When writing functions, ensure that they handle these data types correctly.

### Configuration

- Jest configuration is defined in the `jest.config.js` file.
- CORS is configured to allow requests from any origin for testing purposes. Update the configuration in production as needed.

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
## Demo Code

      
 function calculateTotalCost(quantity: number, price: number, currency: string): string {
  const totalCost = quantity * price;
  return `Total cost: ${totalCost} ${currency}`;
}

 function formatFullName(firstName: string, lastName?: string): string {
  if (lastName) {
    return `${firstName} ${lastName}`;
  } else {
    return firstName;
  }
}

 function generateRandomCode(length: number = 6, prefix: string = 'CODE'): string {
  const randomNumber = Math.floor(Math.random() * 10 ** length);
  return `${prefix}-${randomNumber}`;
}

 function createSentenceWithNumbers(sentence: string, ...numbers: number[]): string {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return `${sentence} The sum is ${sum}.`;
}


            function printMessage(content: string): void {
  console.log(`Message: ${content}`);
}

    
    
    
---