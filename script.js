
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

// populate input

let displayValue = '';
let operator; 

const inputField = document.querySelector('.input-field'); 
const inputButtons = document.querySelectorAll('.input-buttons');
const operatorButtons = document.querySelectorAll('.operator-buttons button');

inputButtons.forEach(button => {
  button.addEventListener('click', () => {
    displayValue += button.textContent;
    inputField.textContent = displayValue;
   }); 
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    operatorButtons.forEach(button => {
      if(button.classList.contains('operator-buttons-clicked')) { // to remove the clicked class if other operator button is clicked
        button.classList.toggle('operator-buttons-clicked');
      };
    });

    if(button.textContent === '=') return; // to prevent the operator being set to '='
    
    operator = button.textContent;
    button.classList.toggle('operator-buttons-clicked'); 
  })
});