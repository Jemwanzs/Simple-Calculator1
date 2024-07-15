// Function to format number with commas and limit to 2 decimal places
function formatNumberWithCommas(number) {
    if (typeof number === 'number' && !isNaN(number)) {
        return number.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    }
    return number;
}

// Function to handle input changes
function handleInputChange() {
    const display = document.getElementById('display');
    const value = display.value.replace(/,/g, ''); // Remove existing commas

    const parts = value.split(/([+\-*/])/); // Split the input into numbers and operators

    for (let i = 0; i < parts.length; i++) {
        if (!isNaN(parts[i]) && parts[i].trim() !== '') {
            parts[i] = formatNumberWithCommas(parseFloat(parts[i]));
        }
    }

    display.value = parts.join('');
}

// Attach event listeners to input and buttons
window.onload = function () {
    const display = document.getElementById('display');

    const buttons = document.querySelectorAll('.Buttons input');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            if (this.value === '=') {
                const expression = display.value.replace(/,/g, '');
                try {
                    const result = eval(expression);
                    display.value = formatNumberWithCommas(result);
                } catch (e) {
                    display.value = 'Error';
                }
            } else if (this.value === 'AC') {
                display.value = '';
            } else if (this.value === 'DE') {
                display.value = display.value.slice(0, -1);
                handleInputChange();
            } else {
                display.value += this.value;
                handleInputChange();
            }
        });
    });
};
