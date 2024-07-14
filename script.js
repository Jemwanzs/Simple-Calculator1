// Function to format number with commas
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to handle input changes
function handleInputChange() {
    const display = document.getElementById('display');
    const value = display.value.replace(/,/g, ''); // Remove existing commas

    const parts = value.split(/([+\-*/])/); // Split the input into numbers and operators

    for (let i = 0; i < parts.length; i++) {
        if (!isNaN(parts[i]) && parts[i].trim() !== '') {
            parts[i] = formatNumberWithCommas(parts[i]);
        }
    }

    display.value = parts.join('');
}

// Attach event listeners to input and buttons
window.onload = function () {
    const display = document.getElementById('display');

    display.addEventListener('input', handleInputChange);

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
            } else if (this.value !== 'AC' && this.value !== 'DE') {
                display.value += this.value;
                handleInputChange();
            }
        });
    });

    document.querySelector('input[value="AC"]').addEventListener('click', function () {
        display.value = '';
    });

    document.querySelector('input[value="DE"]').addEventListener('click', function () {
        display.value = display.value.slice(0, -1);
        handleInputChange();
    });
};
