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

let display = document.querySelector("#output");
let numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(function(button){
    button.addEventListener("click", function(){
        if (leftOperand === Infinity){
            return;
        }
        if (operator === null){
            if (leftOperand === null){
                if (button.classList.contains("decimal")){
                    leftOperand = "0.";
                    leftHasDecimal = true;
                } else {
                    leftOperand = button.textContent;
                }
            } else {
                if (button.classList.contains("decimal") && !leftHasDecimal){
                    leftHasDecimal = true;
                    if (isResult){
                        leftOperand = display.textContent;
                    }
                    leftOperand += ".";
                    isResult = false;
                }
                else if(!button.classList.contains("decimal")) {
                    if (isResult){
                        leftOperand = display.textContent;
                    }
                    leftOperand += button.textContent;
                    isResult = false;
                }
            }
            calculatorDisplay();
        } else {
            if (rightOperand === null){
                if (button.classList.contains("decimal")){
                    rightHasDecimal = true;
                    rightOperand = "0.";
                } else {
                    rightOperand = button.textContent;
                }
            } else {
                if(button.classList.contains("decimal") && !rightHasDecimal){
                    rightHasDecimal = true;
                    rightOperand += ".";
                } else if (!button.classList.contains("decimal")){
                   rightOperand += button.textContent;
                }
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
            leftHasDecimal = false;
            rightOperand = null;
            rightHasDecimal = false;
            operator = null;
        } else if (button.textContent === "="){
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
        } else if (button.classList.contains("backspace")){
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
            operator = button.textContent;
        }
        calculatorDisplay();
    })
})