//CALCULATIONS

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
    alert('Dividing by zero is forbidden.');
    clear();
    return; 
  }
  return a / b; 
}

function calculate(a, operation, b) {
  const aFloat = parseFloat(a); 
  const bFloat = parseFloat(b); 
  let solution;
  
  switch(operation) {
    case '+': 
      solution = add(aFloat, bFloat);
      break;
    case '-': 
      solution = subtract(aFloat, bFloat);
      break;
    case 'x': 
      solution = multiply(aFloat, bFloat);
      break;
    case '/': 
      solution = divide(aFloat, bFloat);
      break;
    } 
  operator = '';
  return solution.toString().length > 11 ? (Math.round((solution + Number.EPSILON) * 100000000) / 100000000) : solution; 
}

//LOGIC FOR INPUT HANDLING AND OPERATION

//variables 

let displayValue = '';
let operator; 
let lastOperator; 
let firstValue; 
let secondValue;
let firstValueSet = false; //checks if the value may be overwritten


const inputField = document.querySelector('.input-field'); 
const inputButtons = document.querySelectorAll('.input-buttons');
const operatorButtons = document.querySelectorAll('.grid-operator-buttons button');
const equalButton = document.getElementById('equal'); 
const clearButton = document.getElementById('clear'); 
const backspaceButton = document.getElementById('backspace'); 
const negateButton = document.getElementById('negate');

//functions

function populate(input) {
  if(key.textContent === '.' && displayValue.includes('.')) return; //prevents more than one '.' per value
  displayValue += input;
  inputField.textContent = displayValue;
}

function setValue(input) { //Set values, depending on which value is already set 
  if (!firstValueSet) {
    firstValue = input; 
    firstValueSet = true; 
  } else {
    secondValue = input;
  };
  displayValue = '';
}

function negateInputValue() {
  if(displayValue === '') return; 
  !displayValue.includes('-') ? displayValue = `-${displayValue}` : displayValue = displayValue.slice(1);
  inputField.textContent = displayValue;
}

function clear() {
  displayValue = '';
  firstValueSet = false;

  populate('');
  toggleClickedClass();

  inputButtons.forEach(button => button.classList.remove('active'));   
}

function backspace() {
  if(displayValue === '') return; //prevents deletion of solutions

  displayValue = inputField.textContent.slice(0,inputField.textContent.length-1)
  inputField.textContent = displayValue; 
}


function toggleClickedClass() { //removes the 'operator-buttons-clicked' class if other operator button is clicked
  operatorButtons.forEach(button => {
    if(button.classList.contains('operator-buttons-clicked')) { 
      button.classList.toggle('operator-buttons-clicked');
    };
  });
}


function setOperator(button) {
  if(button.textContent === '=') return; //prevents the operator from being set to '=', but removes 'operator-buttons-clicked' class when equal button is pressed
  
  if(firstValueSet && operator === '' && displayValue !== '') { //enables a new calculation after the equal button was pressed
    firstValueSet = false;
    setValue(displayValue);
  };
  
  if(firstValueSet && operator !== '' && displayValue === '') { //makes it possible to change the operator 
    operator = lastOperator = button.textContent;
    button.classList.toggle('operator-buttons-clicked');
    return; 
  };

  if(firstValueSet && operator !== '') { //handles the case if an operator key is pressed to concatenate calculations
    setValue(displayValue);  
    firstValue = calculate(firstValue, operator, secondValue); 
    populate(firstValue);
    displayValue = '';
  } else {
    setValue(displayValue);
  };
  
  operator = lastOperator = button.textContent;
  button.classList.toggle('operator-buttons-clicked'); 
}


function operate() {
  if(firstValue === undefined) return; //error handling if the equal key is pressed without values being set

  if(operator === '') { //makes it possible to press the equal key several times to repeat the calculation
    operator = lastOperator; 
    displayValue = '';
  } else {
    setValue(displayValue); 
  };

  firstValue = calculate(firstValue, operator, secondValue); 

  if(isNaN(firstValue)) { //error handling if the equal key is pressed without values being set
    populate('Error');
    firstValueSet = false; 
  } else {
    populate(firstValue);
  };

  displayValue = '';
}


//event listener 

inputButtons.forEach(button => { //shows pressed numbers
  button.addEventListener('click', () => populate(button.textContent)); 
});


operatorButtons.forEach(button => { 
  button.addEventListener('click', () => {
      toggleClickedClass();
      setOperator(button);
    })
  });


equalButton.addEventListener('click', operate);


clearButton.addEventListener('click', clear);


backspaceButton.addEventListener('click', backspace);


negateButton.addEventListener('click', negateInputValue);


//KEYBOARD SUPPORT

let key = 0; 

//event listener

window.addEventListener('keydown', useKeyboardInput);

//negateButton function call and 'active' class toggle
window.addEventListener('keydown', (e) => {
  if(e.code === 'Slash' && e.altKey) {
    negateInputValue();
    negateButton.classList.add('active');
  };
});

window.addEventListener('keyup', (e) => {
  if(e.code === 'Slash' && e.altKey) {
    negateButton.classList.remove('active');
  };
});


//toggles 'active' class on pressed key
window.addEventListener('keydown', () => {
  if(!key) return; 
  key.classList.add('active');
});

window.addEventListener('keyup', () => {
  if(!key) return; 
  key.classList.remove('active');
});


window.addEventListener('keydown', useKeyboardInput);

function useKeyboardInput(e) {
  
  key = document.querySelector(`button[data-key="${e.key}"]`)

  switch(true) {
    case(!key): 
      break; 

    case(key.classList.contains('input-buttons')): 
      populate(key.textContent);
      break;

    case(key.id === 'add'): 
    case(key.id === 'subtract'): 
    case(key.id === 'multiply'): 
    case(key.id === 'divide'): 
      toggleClickedClass();
      setOperator(key);
      break;

    case(key.id === 'equal'): 
      toggleClickedClass();
      operate();
      break;

    case(key.id === 'clear'): 
      clear();
      break;

    case(key.id === 'backspace'):
      backspace();
      break;
  }; 
}
