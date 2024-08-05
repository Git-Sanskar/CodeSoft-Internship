document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '';
                previousInput = '';
                operator = '';
                display.textContent = '0';
                return;
            }

            if (value === '=') {
                if (currentInput && previousInput && operator) {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.textContent = currentInput;
                    previousInput = '';
                    operator = '';
                }
                return;
            }

            if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput) {
                    if (previousInput) {
                        previousInput = calculate(previousInput, currentInput, operator);
                    } else {
                        previousInput = currentInput;
                    }
                    currentInput = '';
                    operator = value;
                }
                return;
            }

            if (value === '.' && currentInput.includes('.')) {
                return;
            }

            currentInput += value;
            display.textContent = currentInput;
        });
    });

    function calculate(num1, num2, operator) {
        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);
        if (operator === '+') return (n1 + n2).toString();
        if (operator === '-') return (n1 - n2).toString();
        if (operator === '*') return (n1 * n2).toString();
        if (operator === '/') return (n1 / n2).toString();
        return '';
    }
});