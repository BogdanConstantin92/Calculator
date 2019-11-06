class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear(){
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation){
        if(this.currentOperand === '') return;
        if(this.currentOperand !== '') this.compute();
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute(){
        let calculate;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        switch(this.operation){
            case '+':
                calculate = prev + current;
                break;
            case '-':
                calculate = prev - current;
                break;
            case '*':
                calculate = prev * current;
                break;
            case '/':
                calculate = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = calculate;
        this.previousOperand = '';
        this.operation = undefined;
    }
    updateDisplay(){
        this.previousOperandTextElement.innerText = this.previousOperand;
        this.currentOperandTextElement.innerText = this.currentOperand;
    }
}


const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButton.forEach(item => {
    item.addEventListener('click', () => {
        calculator.appendNumber(item.innerText);
        calculator.updateDisplay();
    })
})
operationButton.forEach(item => {
    item.addEventListener('click', () => {
        calculator.chooseOperation(item.innerText);
        calculator.updateDisplay();
    })
})
allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay(); 
})
equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})