
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".button");

let firstNumber = "";
let operator = "";
let newNumber = false;

// Listen for clicks on all calculator buttons
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        let value = button.textContent;

        // Clear the calculator
        if (value === "C") {
            display.textContent = "0";
            firstNumber = "";
            operator = "";
            newNumber = false;
        }

        // Delete the last character
        else if (value === "⌫") {
            if (display.textContent === "Error") {
                display.textContent = "0";
            } else {
                display.textContent = display.textContent.slice(0, -1);

                if (display.textContent === "" || display.textContent === "-") {
                    display.textContent = "0";
                }
            }
        }

        // Store the first number and selected operator
        else if (value === "+" || value === "−" ||
                 value === "×" || value === "÷") {

            if (display.textContent === "Error") {
                return;
            }

            firstNumber = display.textContent;
            operator = value;
            newNumber = true;
        }

        // Calculate the answer
        else if (value === "=") {
            if (firstNumber === "" || operator === "" || newNumber === true) {
                return;
            }

            let secondNumber = display.textContent;
            let answer = 0;

            if (operator === "+") {
                answer = Number(firstNumber) + Number(secondNumber);
            } else if (operator === "−") {
                answer = Number(firstNumber) - Number(secondNumber);
            } else if (operator === "×") {
                answer = Number(firstNumber) * Number(secondNumber);
            } else if (operator === "÷") {
                if (Number(secondNumber) === 0) {
                    display.textContent = "Error";
                    firstNumber = "";
                    operator = "";
                    newNumber = true;
                    return;
                }

                answer = Number(firstNumber) / Number(secondNumber);
            }

            display.textContent = answer;
            firstNumber = "";
            operator = "";
            newNumber = true;
        }

        // Enter a decimal point
        else if (value === ".") {
            if (display.textContent === "Error") {
                return;
            }

            if (newNumber === true) {
                display.textContent = "0";
                newNumber = false;
            }

            if (!display.textContent.includes(".")) {
                display.textContent += ".";
            }
        }

        // Enter a number
        else {
            if (display.textContent === "Error") {
                display.textContent = "0";
                firstNumber = "";
                operator = "";
            }

            if (newNumber === true) {
                display.textContent = value;
                newNumber = false;
            } else if (display.textContent === "0") {
                display.textContent = value;
            } else {
                display.textContent += value;
            }
        }
    });
});
