let currentOperand = '';
let previousOperand = '';
let operator = '';
const currentOperandNumber = document.querySelector('.currentOperand');
const previousOperandNumber = document.querySelector('.previousOperand');
const equal = document.querySelector('.equal');
const decimal = document.querySelector('.decimal');
const clear = document.querySelector('.clear');
const deleteCurrentNumber = document.querySelector('.delete');
const operators = document.querySelectorAll('.operator');
const numberButtons = document.querySelectorAll('.number');
const negativePositive = document.querySelector('.negativePositive');
window.addEventListener('keydown', keyPress)

numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        handleNumber(e.target.textContent)
    })
})

function handleNumber(number) {
    if (previousOperand !== '' && currentOperand !== '' && operator === '') {
        previousOperand = ''
        currentOperandNumber.textContent = currentOperand
    }
    if (currentOperand.length <= 10) {
        currentOperand += number
        currentOperandNumber.textContent = currentOperand
    }
}

operators.forEach((button) => {
    button.addEventListener('click', (e) => {
        handleOperator(e.target.textContent)
    })
})

function handleOperator(op) {
    if (previousOperand === '') {
        previousOperand = currentOperand
        operatorCheck(op)
    } else if (currentOperand === '') {
        operatorCheck(op)
    } else {
        compute()
        operator = op
        currentOperandNumber.textContent = '0'
        previousOperandNumber.textContent = previousOperand + ' ' + operator
    }
}

function operatorCheck(text) {
    operator = text
    previousOperandNumber.textContent = previousOperand + ' ' + operator
    currentOperandNumber.textContent = '0'
    currentOperand = ''
}

function compute() {
    previousOperand = Number(previousOperand)
    currentOperand = Number(currentOperand)

    if (operator === '+') {
        previousOperand += currentOperand
    } else if (operator === '-') {
        previousOperand -= currentOperand
    } else if (operator === 'x') {
        previousOperand *= currentOperand
    } else if (operator === '÷') {
        previousOperand /= currentOperand
    } else if (operator === '^') {
        previousOperand **= currentOperand
    }
    previousOperand = roundNumber(previousOperand)
    previousOperand = previousOperand.toString()
    result()
}

equal.addEventListener('click', () => {
    if (currentOperand != '' && previousOperand != '') {
        compute()
    }
})

function roundNumber(number) {
    return Math.round(number * 100000000) / 100000000
}

function result() {
    if (previousOperand.length <= 10) {
        currentOperandNumber.textContent = previousOperand
    } else {
        currentOperandNumber.textContent = previousOperand.slice(0, 10) + '...'
    }
    previousOperandNumber.textContent = ' '
    operator = ''
    currentOperand = ' '
}

function clearScreen() {
    currentOperand = ''
    previousOperand = ''
    operator = ''
    currentOperandNumber.textContent = ''
    previousOperandNumber.textContent = ''
}

clear.addEventListener('click', clearScreen)

function addDecimal() {
    if (!currentOperand.toString().includes('.')) 
    if(currentOperand === '' || '-') {
        currentOperand += '.'
        currentOperandNumber.textContent = currentOperand
    } else if (currentOperand > 0 || currentOperand < 0) {
        currentOperand += '.'
        currentOperandNumber.textContent = currentOperand
    }
}

decimal.addEventListener('click', () => {
    addDecimal()
})

function deleteNumber() {
    if (currentOperand !== '') {
        currentOperand = currentOperand.toString().slice(0, -1)
        currentOperandNumber.textContent = currentOperand
        if (currentOperand === '') {
            currentOperandNumber.textContent = ''
        }
    }
    if (currentOperand === '' && previousOperand === '' && operator === '') {
        previousOperand = previousOperand.slice(0, -1)
        currentOperandNumber.textContent = previousOperand
    }
}

deleteCurrentNumber.addEventListener('click', deleteNumber)

function negativeOrPositive() {
    if (!currentOperand.toString().includes('-')) {
    }
    if (currentOperand === '') {
        currentOperand += '-'
        currentOperandNumber.textContent = currentOperand
    } else if (currentOperand > 0 || currentOperand < 0 ) {
        currentOperand = -currentOperand + ''
        currentOperandNumber.textContent = currentOperand
    }
}

negativePositive.addEventListener('click', () => {
    negativeOrPositive()
})

function keyPress(e) {
    if (e.key >= 0 && e.key <= 9) {
        handleNumber(e.key)
    }
    if (
        e.key === 'Enter' ||
        (e.key === '=' && currentNum != '' && previousNum != '')
    ) {
        compute()
    }
    if (e.key === '+' || e.key === '÷' || e.key === '/') {
        handleOperator(e.key);
    }
    if (e.key === '*') {
        handleOperator('x')
    }
    if (e.key === '/') {
        e.preventDefault()
        handleOperator('÷')
    }
    if (e.key === '.' || e.key === ',') {
        addDecimal()
    }
    if (e.key === 'Backspace') {
        deleteNumber()
    }
    if (e.key === 'Escape') {
        clearScreen()
    }
}