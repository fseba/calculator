
// basic operations 
function add(a, b) {
  return a + b; 
}

function subtract(a, b) {
  return a - b; 
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if(b === 0) {
    alert('Dividing by zero is forbidden, you mathematical wonder.');
    return; 
  }
  return a / b; 
}

function operate(a, operator, b) {
  switch(operator) {
    case '+': 
      return add(a, b);
    case '-': 
      return subtract(a, b);
    case '*': 
      return multiply(a, b);
    case '/': 
      return divide(a, b);
  }
}