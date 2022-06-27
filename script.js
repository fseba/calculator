
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
    clear();
    return; 
  }
  return a / b; 
}

function calculate(a, operation, b) {
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
const backspaceButton = document.getElementById('backspace'); 

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

function backspace() {
  displayValue = inputField.textContent.slice(0,inputField.textContent.length-1)
  inputField.textContent = displayValue; 
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

    //create function toggleClickedClass() 
    operatorButtons.forEach(button => {
      if(button.classList.contains('operator-buttons-clicked')) { //to remove the 'operator-buttons-clicked' class if other operator button is clicked
        button.classList.toggle('operator-buttons-clicked');
      };
    });
    //end

    //create function setOperator(button) 
    if(button.textContent === '=') return; //to prevent the operator being set to '=', but remove 'operator-buttons-clicked' class when equal button is pressed
    
    if(firstValueSet && operator === '') {
      operator = lastOperator = button.textContent;
      button.classList.toggle('operator-buttons-clicked');
      displayValue = ''; 
      return; 
    }

    if(firstValueSet && operator !== '') { //to handle the case if an operator key is pressed to concatenate calculations
      setValue(displayValue);  
      firstValue = calculate(firstValue, operator, secondValue); 
      populate(firstValue);
      secondValueSet = false; 
      displayValue = '';
    } 
    
    else {
      setValue(displayValue);
    };
    
    operator = lastOperator = button.textContent;
    button.classList.toggle('operator-buttons-clicked'); 
    //end
    })
  });


equalButton.addEventListener('click', () => {
  //create function operate() 
  if(firstValue === undefined) return; //error handling if the equal key is pressed without values being set

  if(operator === '') { //makes it possible to press the equal key several times to repeat the calculation
    operator = lastOperator; 
    displayValue = '';
  } else {
    setValue(displayValue); 
  };

  firstValue = calculate(firstValue, operator, secondValue); 
  secondValueSet = false; 

  if(isNaN(firstValue)) { //error handling if the equal key is pressed without values being set
    populate('Error');
    firstValueSet = false; 
  } else {
     populate(firstValue);
  }

  displayValue = '';
  //end
});


clearButton.addEventListener('click', () => clear());


backspaceButton.addEventListener('click', () => backspace());