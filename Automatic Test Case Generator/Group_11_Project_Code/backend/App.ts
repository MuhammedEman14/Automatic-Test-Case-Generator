
      
      
 export function calculateTotalCost(quantity: number, price: number, currency: string): string {
  const totalCost = quantity * price;
  return `Total cost: ${totalCost} ${currency}`;
}

 export function formatFullName(firstName: string, lastName?: string): string {
  if (lastName) {
    return `${firstName} ${lastName}`;
  } else {
    return firstName;
  }
}

 export function generateRandomCode(length: number = 6, prefix: string = 'CODE'): string {
  const randomNumber = Math.floor(Math.random() * 10 ** length);
  return `${prefix}-${randomNumber}`;
}

 export function createSentenceWithNumbers(sentence: string, ...numbers: number[]): string {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return `${sentence} The sum is ${sum}.`;
}


            export function printMessage(content: string): void {
  console.log(`Message: ${content}`);
}

    
    
    