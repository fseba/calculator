
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
    // reset necessary 
    return; 
  }
  return a / b; 
}

function operate(a, operation, b) {
  const aInt = parseInt(a); 
  const bInt = parseInt(b); 
  switch(operation) {
    case '+': 
      operator = ''; 
      return add(aInt, bInt);
    case '-': 
      operator = ''; 
      return subtract(aInt, bInt);
    case 'x': 
      operator = ''; 
      return multiply(aInt, bInt);
    case '/': 
      operator = ''; 
      return divide(aInt, bInt);
    } 
}


let displayValue = '';
let operator; 
let lastOperator; 
let firstValue; 
let secondValue;
let firstValueSet = false; //to check if the value may be overwritten
let secondValueSet = false; //to check if the value may be overwritten

const inputField = document.querySelector('.input-field'); 
const inputButtons = document.querySelectorAll('.input-buttons');
const operatorButtons = document.querySelectorAll('.grid-operator-buttons button');
const equalButton = document.getElementById('equal'); 
const clearButton = document.getElementById('clear'); 


//functions

function populate(input) {
  displayValue += input;
  inputField.textContent = displayValue;
}

function setValue(input) { //Set values, depending on which value is set 
  if (!firstValueSet) {
    firstValue = input; 
    firstValueSet = true; 
  } else {
    secondValue = input;
    secondValueSet = true; 
  };
  displayValue = '';
}

function clear() {
  displayValue = '';
  firstValueSet = false;
  secondValueSet = false;
  populate('');
  operatorButtons.forEach(button => {
    if(button.classList.contains('operator-buttons-clicked')) { //to remove the 'operator-buttons-clicked' class if other operator button is clicked
      button.classList.toggle('operator-buttons-clicked');
    };
  });
}


//event listener 

inputButtons.forEach(button => { //to show pressed numbers
  button.addEventListener('click', () => {
    populate(button.textContent)
  }); 
});


//operator button handling
operatorButtons.forEach(button => { 
  button.addEventListener('click', () => {
    operatorButtons.forEach(button => {
      if(button.classList.contains('operator-buttons-clicked')) { //to remove the 'operator-buttons-clicked' class if other operator button is clicked
        button.classList.toggle('operator-buttons-clicked');
      };
    });

    if(button.textContent === '=') return; //to prevent the operator being set to '=', but remove 'operator-buttons-clicked' class when equal button is pressed
    
    if(firstValueSet && operator === '') {
      operator = lastOperator = button.textContent;
      button.classList.toggle('operator-buttons-clicked');
      displayValue = ''; 
      return; 
    }

    if(firstValueSet && operator !== '') { //to handle the case if an operator key is pressed to concatenate calculations
      setValue(displayValue);  
      firstValue = operate(firstValue, operator, secondValue); 
      populate(firstValue);
      secondValueSet = false; 
      displayValue = '';
    } 
    
    else {
      setValue(displayValue);
    };
    
    operator = lastOperator = button.textContent;
    button.classList.toggle('operator-buttons-clicked'); 
    })
  });


equalButton.addEventListener('click', () => {
  if(firstValue === undefined) return; //error handling for if the equal key is pressed without values being set

  if(operator === '') { //makes it possible to press the equal key several times to repeat the calculation
    operator = lastOperator; 
    displayValue = '';
  } else {
    setValue(displayValue); 
  };

  firstValue = operate(firstValue, operator, secondValue); 
  secondValueSet = false; 

  if(isNaN(firstValue)) { //error handling for if the equal key is pressed without values being set
    populate('Error');
    firstValueSet = false; 
  } else {
     populate(firstValue);
  }

  displayValue = '';
});


clearButton.addEventListener('click', () => clear());