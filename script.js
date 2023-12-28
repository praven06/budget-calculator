function generateCategoryInputs() {
    const numCategories = parseInt(document.getElementById('numCategories').value);

    if (isNaN(numCategories) || numCategories <= 0) {
        alert('Please enter a valid number of categories.');
        return;
    }

    const categoryInputsContainer = document.getElementById('categoryInputs');
    categoryInputsContainer.innerHTML = '';

    for (let i = 0; i < numCategories; i++) {
        const inputId = `category${i}Expense`;
        categoryInputsContainer.innerHTML += `
            <div>
                <label for="${inputId}">Average Weekly Category ${i + 1} Expense (INR):</label>
                <input type="number" id="${inputId}" placeholder="Enter average weekly expense">
            </div>
        `;
    }
}

function calculateAllocation() {
    const totalBudget = parseFloat(document.getElementById('totalBudget').value);

    let totalExpense = 0;
    const expensePercentages = [];

    document.querySelectorAll('[id^="category"]').forEach((input, index) => {
        const expense = parseFloat(input.value);
        totalExpense += isNaN(expense) ? 0 : expense;
    });

    document.querySelectorAll('[id^="category"]').forEach((input, index) => {
        const expense = parseFloat(input.value);
        const percentage = (expense / totalExpense) * 100;
        const allocation = (percentage / 100) * totalBudget;

        expensePercentages.push({ category: `Category ${index + 1}`, percentage, allocation });
    });

    const resultElement = document.getElementById('allocationResult');
    resultElement.innerHTML = '';

    expensePercentages.forEach(({ category, percentage, allocation }) => {
        resultElement.innerHTML += `
            <p>${category} Allocation: ₹${allocation.toFixed(2)} (${percentage.toFixed(2)}%)</p>
        `;
    });
}
