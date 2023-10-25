
//getting the id of inputField
let inputField = document.getElementById("inputField");
//this will converted into array

//getting the button of calculate
const calculateBtn = document.getElementById("calculateBtn");
//this will display all result 

const resultContainer = document.querySelector(".result");
const chartResultContainer = document.querySelector(".chart-container");

let myChart = null;




calculateBtn.addEventListener("click", event => {
    event.preventDefault();
    const splitNumber = inputField.value.split(/[,\s]+/).filter(num => num !== '').map(num => parseFloat(num));
    // console.log(splitNumber);

    const isValid = checkInput();

    if (isValid) {
        displayResult(splitNumber);

        displayChartResult(splitNumber);
        chartResultContainer.classList.add("show-result");
    }

})
function displayChartResult(arr) {
    const ctx = document.getElementById('myChart');
    const frequencyMap = {};

    if (myChart) {
        myChart.destroy();
    }

    arr.forEach(num => {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    });

    const labels = Object.keys(frequencyMap);
    const data = [...arr];

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Frequency',
                data: data,
                borderWidth: 1,


            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}
function checkInput() {
    //getting the error message element

    const errorMessage = document.getElementById("errorMessage");
    //this will converted into array
    const splitNumber = inputField.value.split(/[,\s]+/).filter(num => num !== '');
    //this will check the valid input pattern
    const validInputPattern = /^[,0-9\s]+$/

    let isValid = true;

    if (!inputField.value) {
        errorMessage.textContent = "Please provide input.";
        errorMessage.classList.add("show-error");
        isValid = false;
    } else if (!validInputPattern.test(inputField.value)) {
        errorMessage.textContent = "Invalid input! Please provide number only.";
        errorMessage.classList.add("show-error");
        isValid = false;
    } else if (splitNumber.length < 3) {
        errorMessage.textContent = "Please provide numbers atleast 3 or more.";
        errorMessage.classList.add("show-error");
        isValid = false;
    } else {
        errorMessage.textContent = "";
    }

    errorMessage.classList.toggle("show-error", !isValid);

    return isValid;
}
function displayResult(splitNumberArr) {
    //clear the current result
    resultContainer.innerHTML = '';
    const allResult = document.createElement("div");
    allResult.innerHTML = `
    <h1>Result:</h1>
    <p>Mean: ${getMean(splitNumberArr)}</p>
    <p>Median: ${getMedian(splitNumberArr)}</p>
    <p>Mode: ${getMode(splitNumberArr)}</p>
    <p>Range: ${getRange(splitNumberArr)}</p>
    `;
    resultContainer.classList.add("show-result");
    resultContainer.appendChild(allResult);
}
function clearBtn() {
    const chartContainer = document.querySelector(".chart-container");

    inputField.value = "";
    resultContainer.classList.remove("show-result");
    chartContainer.classList.remove("show-result");

}

function getMean(nums) {
    const sum = nums.reduce((acc, num) => acc + num, 0);
    const average = sum / nums.length;

    const formattedNums = average.toFixed(1);

    return formattedNums;
}
function getMedian(nums) {
    const sortedNums = nums.sort((num1, num2) => num1 - num2);
    const length = sortedNums.length;
    const middleIndex = Math.floor(length / 2);
    //1,2,3,4,5,6,7,8
    return length % 2 === 0 ?
        (sortedNums[middleIndex - 1] + sortedNums[middleIndex]) / 2
        : sortedNums[middleIndex];
}
function getMode(nums) {
    const frequencyMap = {};

    nums.forEach(num => {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    });

    let mode = [];
    let maxFrequency = 0;

    for (let num in frequencyMap) {
        if (frequencyMap[num] > maxFrequency) {
            mode = [parseInt(num)];
            maxFrequency = frequencyMap[num];
        } else if (frequencyMap[num] === maxFrequency) {
            mode.push(parseInt(num));
        }
    }
    if (mode.length === Object.keys(frequencyMap).length) {
        return "No mode";
    }

    return mode.join(", ");
}
function getRange(nums) {

    const min = Math.min(...nums);
    const max = Math.max(...nums);

    return max - min;
}

