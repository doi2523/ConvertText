function convertText() {
    const inputText = document.getElementById('inputText').value;
    let upperResult = '';
    let lowerResult = '';
    let capitalizeResult = '';
    let titleCaseResult = '';

    // Reset results if input is empty
    if (inputText.trim() === '') {
        document.getElementById('uppercaseResult').textContent = '';
        document.getElementById('lowercaseResult').textContent = '';
        document.getElementById('capitalizeResult').textContent = '';
        document.getElementById('titlecaseResult').textContent = '';
        document.getElementById('uppercaseResult2').textContent = '';
        document.getElementById('lowercaseResult2').textContent = '';
        document.getElementById('capitalizeResult2').textContent = '';
        document.getElementById('titlecaseResult2').textContent = '';
        document.getElementById('nameCount').textContent = '0';  // Reset count
        return;
    }

    // Split the input text by commas and remove extra spaces
    const items = inputText.split(',').map(item => item.trim()).filter(item => item.length > 0);
    const nameCount = items.length;

    // Convert text to various formats
    upperResult = items.map(item => item.toUpperCase()).join('\n');
    lowerResult = items.map(item => item.toLowerCase()).join('\n');
    capitalizeResult = items.map(item => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()).join('\n');
    titleCaseResult = items.map(item => item.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')).join('\n');

    // Update result count
    document.getElementById('nameCount').textContent = nameCount;

    // Update results for the first column
    document.getElementById('uppercaseResult').textContent = upperResult;
    document.getElementById('lowercaseResult').textContent = lowerResult;
    document.getElementById('capitalizeResult').textContent = capitalizeResult;
    document.getElementById('titlecaseResult').textContent = titleCaseResult;

    // Handle 6 or more names and split results into two halves
    if (nameCount >= 6) {
        const resultContainer = document.getElementById('resultContainer');
        resultContainer.classList.add('double-column');

        // Calculate the halfway point
        const half = Math.floor(nameCount / 2);

        // Split each result into two parts
        const upperLeft = items.slice(0, half).map(item => item.toUpperCase()).join('\n');
        const upperRight = items.slice(half).map(item => item.toUpperCase()).join('\n');

        const lowerLeft = items.slice(0, half).map(item => item.toLowerCase()).join('\n');
        const lowerRight = items.slice(half).map(item => item.toLowerCase()).join('\n');

        const capitalizeLeft = items.slice(0, half).map(item => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()).join('\n');
        const capitalizeRight = items.slice(half).map(item => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()).join('\n');

        const titleCaseLeft = items.slice(0, half).map(item => item.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')).join('\n');
        const titleCaseRight = items.slice(half).map(item => item.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')).join('\n');

        // Update the results for the first column
        document.getElementById('uppercaseResult').textContent = upperLeft;
        document.getElementById('lowercaseResult').textContent = lowerLeft;
        document.getElementById('capitalizeResult').textContent = capitalizeLeft;
        document.getElementById('titlecaseResult').textContent = titleCaseLeft;

        // Update the second column
        document.getElementById('uppercaseResult2').textContent = upperRight;
        document.getElementById('lowercaseResult2').textContent = lowerRight;
        document.getElementById('capitalizeResult2').textContent = capitalizeRight;
        document.getElementById('titlecaseResult2').textContent = titleCaseRight;
    } else {
        // If there are fewer than 6 names, reset to single column layout
        const resultContainer = document.getElementById('resultContainer');
        resultContainer.classList.remove('double-column');
    }
}

// Copy to clipboard functionality
function copyToClipboard(resultId) {
    const resultText = document.getElementById(resultId).textContent;
    if (resultText.trim() === '') {
        showAlert("Lỗi!", "Không có nội dung để sao chép!", "error");
        return;
    }
    navigator.clipboard.writeText(resultText).then(() => {
        showAlert("Thành công!", "Đã sao chép vào clipboard!", "success");
    }, (err) => {
        console.error('Không thể sao chép: ', err);
    });
}

// Display alert for copying action
function showAlert(title, text, icon) {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });
}

// Event listeners
document.getElementById('inputText').addEventListener('input', convertText);
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', function() {
        const resultId = this.previousElementSibling.id;
        copyToClipboard(resultId);
    });
});
