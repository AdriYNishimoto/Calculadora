
const previousOperationText = document.querySelector('#previous-operations')
const CurrentOperationText = document.querySelector('#current-operations')
const buttons = document.querySelectorAll('#buttons-container button')

class Calculator {
    constructor(previousOperationText, CurrentOperationText) {
        this.previousOperationText = previousOperationText;
        this.CurrentOperationText = CurrentOperationText;
        this.currentOperation = "";
    }

    addDigit(digit) {

        if(digit === "." && this.CurrentOperationText.innerText.includes(".")) {
            return
        }

        this.currentOperation = digit;
        this.updateScreen()
    }


    processOperation(operations) {
        if(this.CurrentOperationText.innerText === "" && operations !== "C") {
            if(this.previousOperationText.innerText !== "") {
                this.changeOperation(operations);
            }
            return;
        }


        let operationsValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.CurrentOperationText.innerText;

        switch(operations) {
            case "+":
                operationsValue = previous + current
                this.updateScreen(operationsValue, operations, current, previous)
                break;
            case "-":
                operationsValue = previous - current
                this.updateScreen(operationsValue, operations, current, previous)
                break;
            case "/":
                operationsValue = previous / current
                this.updateScreen(operationsValue, operations, current, previous)
                break;
            case "*":
                operationsValue = previous * current
                this.updateScreen(operationsValue, operations, current, previous)
                break;
            case "DEL":
                this.processDelOperator()
                break;
            case "CE":
                this.processClearCurrentOperator()
                break;
            case "C":
                this.processClearOperator()
                break;
            case "=":
                this.processEqualOperator()
                break;
            default:
                return;
        }
    }

    updateScreen(
        operationsValue = null, 
        operations = null,
        current = null, 
        previous = null
    ) {
        
        if(operationsValue === null) {
            this.CurrentOperationText.innerText += this.currentOperation;
        } else {
            if(previous === 0) {
                operationsValue = current
            }

            this.previousOperationText.innerText = `${operationsValue} ${operations}`;
            this.CurrentOperationText.innerText = "";
        }
    }
    
    changeOperation(operations) {
        const mathOperation = ["*", "/", "+", "-"]

        if(!mathOperation.includes(operations)) {
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operations;
    }

    processDelOperator() {
        this.CurrentOperationText.innerText = this.CurrentOperationText.innerText.slice(0, -1)
    }

    processClearCurrentOperator() {
        this.CurrentOperationText.innerText = ""
    }

    processClearOperator() {
        this.CurrentOperationText.innerText = ""
        this.previousOperationText.innerText = ""
    }

    processEqualOperator() {
        let operations = previousOperationText.innerText.split(" ")[1];

        this.processOperation(operations);
    }
}

const calc = new Calculator(previousOperationText, CurrentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
       const value = e.target.innerText;

       if(+value >= 0 || value == ".") {
           calc.addDigit(value)

       } else {
        calc.processOperation(value)
       }
    })
})