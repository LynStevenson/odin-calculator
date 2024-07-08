const add = function(x, y){
    return x + y;
}

const subtract = function(x, y){
    return x - y;
}

const multiply = function(x, y){
    return x * y;
}

const divide = function(x, y){
    return x / y;
}

const operate = function(x, operation, y){
    try {
        if (operation == "+") {
            return add(x, y);
        } else if(operation == "-"){
            return subtract(x, y);
        } else if(operation == "X"){
            return multiply(x, y);
        } else if(operation == "/"){
            return divide(x, y);
        } console.log("operation was not properly used/read");
    } catch (error) {
        alert(error);
    }
}

let isResult = false;
let leftOperand = null;
let leftHasDecimal = false;
let rightOperand = null;
let rightHasDecimal = false;
let operator = null;
const precision = 3;//how many digits after decimal

const trimFixed = function(fixed){
    return fixed.replace(/(?<=\.\d*)0+$|\.0*$/,"");
}

//assume operands are strings
let display = document.querySelector("#output");
const calculatorDisplay = function(){
    if (leftOperand !== null){
        let leftDisplay;
        if (leftOperand === Infinity){
            leftDisplay = "Can't divide by 0!"
        } else if (isResult){
            leftDisplay = parseFloat(leftOperand).toFixed(precision);
            leftDisplay = trimFixed(leftDisplay);}
        else {
            leftDisplay = leftOperand;
        }
        display.textContent = leftDisplay;
    } else {
        display.textContent = "0";
        return;
    }
    if (operator !== null){
        display.textContent += " " + operator;
    }
    if (rightOperand !== null){
        display.textContent += " " + rightOperand;
    }
}

const operandInput = function(input){
    if (leftOperand === Infinity){
        return;
    }
    if (operator === null){
        if (leftOperand === null){
            if (input === "."){
                leftOperand = "0.";
                leftHasDecimal = true;
            } else {
                leftOperand = input;
            }
        } else {
            if (input === "." && !leftHasDecimal){
                leftHasDecimal = true;
                if (isResult){
                    leftOperand = display.textContent;
                }
                leftOperand += ".";
                isResult = false;
            }
            else if(input !== ".") {
                if (isResult){
                    leftOperand = display.textContent;
                }
                leftOperand += input;
                isResult = false;
            }
        }
        calculatorDisplay();
    } else {
        if (rightOperand === null){
            if (input === "."){
                rightHasDecimal = true;
                rightOperand = "0.";
            } else {
                rightOperand = input;
            }
        } else {
            if(input === "." && !rightHasDecimal){
                rightHasDecimal = true;
                rightOperand += ".";
            } else if (input !== "."){
               rightOperand += input;
            }
        }
        calculatorDisplay();
    }
}

const operatorInput = function(input){
    if (input === "C"){
        isResult = false;
        leftOperand = null;
        leftHasDecimal = false;
        rightOperand = null;
        rightHasDecimal = false;
        operator = null;
    } else if (input === "="){
        if (leftOperand !== null && operator !== null && rightOperand !== null){
            let result = operate(parseFloat(leftOperand), operator, parseFloat(rightOperand));
            isResult = true;
            leftOperand = result.toString();
            if (leftOperand.includes(".")){
                leftHasDecimal = true;
            } else {
                leftHasDecimal = false;
            }
            operator = null;
            rightOperand = null;
            rightHasDecimal = false;
        }
    } else if (input === document.querySelector(".backspace").textContent || input === "Backspace"){
        if (rightOperand !== null) {
            if (rightOperand.slice(-1) === "."){
                rightHasDecimal = false;
            }
            rightOperand = rightOperand.slice(0, -1);
            if (rightOperand === ""){
                rightOperand = null;
            }
        } else if(operator !== null){
            operator = null;
        } else if (leftOperand !== null){
            if (leftOperand.slice(-1) === "."){
                leftHasDecimal = false;
            }
            leftOperand = leftOperand.slice(0,-1);
            if (leftOperand === ""){
                leftOperand = null;
            }
            isResult = false;
        }
    } else if (leftOperand !== null && rightOperand === null && leftOperand !== Infinity) {
        operator = input;
    }
    calculatorDisplay();
}

let numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(function(button){
    button.addEventListener("click", () => operandInput(button.textContent));
});

let operations = document.querySelectorAll(".operator");
operations.forEach(function(button){
    button.addEventListener("click", () => operatorInput(button.textContent))
})

document.addEventListener("keydown", function(e){
    if (e.key.search(/[0-9.]/) !== -1){
        operandInput(e.key);
    } else if (e.key.search(/[+\-/*]|Backspace/) !== -1){
        operatorInput(e.key);
    } else if (e.key === "c" || e.key === "C") {
        operatorInput("C");
    } else if (e.key === "Enter" || e.key === "=") {
        operatorInput("=");
    }
})