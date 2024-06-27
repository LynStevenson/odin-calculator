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
    x = parseFloat(x)
    y = parseFloat(y)
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
let leftOperand = null; //should be only variable that exists temporarily as a computated float. ie: .33333 forever
let rightOperand = null;
let operator = null;
const precision = 3;

//should never need to be changed
const trimFixed = function(fixed){
    return fixed.replace(/\.0*$|(?<=\.\d+)0+$/,"");
}

const calculatorDisplay = function(){
    if (leftOperand !== null){
        let leftDisplay;
        if (isResult){
            leftDisplay = leftOperand.toFixed(precision);
            leftDisplay = trimFixed(leftDisplay);}
        else {
            leftDisplay = leftOperand.toString();
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


//Should not need to change this
const appendDigit = function(number, digit){
    let original = number.toString();
    original += digit;
    original = parseFloat(original);
    return original;
}

let display = document.querySelector("#output");
let numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(function(button){
    button.addEventListener("click", function(){
        if (operator === null){
            if (leftOperand === null){
                leftOperand = parseInt(button.textContent);
            } else {
                isResult = false;
                leftOperand = appendDigit(parseFloat(display.textContent), button.textContent);
            }
            calculatorDisplay();
        } else {
            if (rightOperand === null){
                rightOperand = parseInt(button.textContent);
            } else {
                rightOperand = appendDigit(rightOperand, button.textContent);
            }
            calculatorDisplay();
        }
    })
})

let operations = document.querySelectorAll(".operator");
operations.forEach(function(button){
    button.addEventListener("click", function(){
        if (button.textContent === "C"){
            isResult = false;
            leftOperand = null;
            rightOperand = null;
            operator = null;
            calculatorDisplay();
        } else if (button.textContent === "="){
            if (leftOperand !== null && operator !== null && rightOperand !== null){
                let result = operate(leftOperand, operator, rightOperand);
                isResult = true;
                leftOperand = result;
                operator = null;
                rightOperand = null;
            }
            calculatorDisplay();
        } else if (leftOperand !== null && rightOperand === null) {
            operator = button.textContent;
            calculatorDisplay();
        }
    })
})