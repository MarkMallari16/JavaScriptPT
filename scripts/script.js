
const navID = document.getElementById("nav");
//getting the id of inputField
const inputField = document.getElementById("inputField");
//this will converted into array

//getting the button of calculate
const calculateBtn = document.getElementById("calculateBtn");
//this will display all result 

//getting the query of hide-button
const buttonClear = document.querySelector(".hide-button");

//getting the element class 
const resultContainer = document.querySelector(".result");
const chartResultContainer = document.querySelector(".chart-container");

//initialize myChart to null 
let myChart = null;

//add click event listener for calculateBtn 
calculateBtn.addEventListener("click", event => {
    event.preventDefault();
    console.log("click");
    calculate();

})
//users can enter key in keyboard to calculate the result
inputField.addEventListener("keydown", handleEnterKeyEvent);
function handleEnterKeyEvent(event) {
    if (event.key === "Enter") {
        calculate();
    }
}
//main function 
function calculate() {
    const isValid = checkInput();
    const splitNumbers = inputField.value.split(/[,\s]+/).filter(num => num !== '').map(num => parseFloat(num));
    if (isValid) {

        displayResult(splitNumbers);
        displayChartResult(splitNumbers);
        chartResultContainer.classList.add("show-result");
        scroll(resultContainer);
    }

}
//display chart result
function displayChartResult(arr) {
    const ctx = document.getElementById('myChart');

    if (myChart) {
        myChart.destroy();
    }

    //getting data
    const labels = Array.from({ length: arr.length }, (_, index) => (index + 1).toString());
    const data = [...arr];

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of data',
                data: data,
                borderWidth: 2,

            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }

    });

}
//check possible errors
function checkInput() {
    //getting the error message element

    const errorMessage = document.getElementById("errorMessage");
    //this will converted into array
    const splitNumbers = inputField.value.split(/[,\s]+/).filter(num => num !== '');
    //this will check the valid input pattern
    const validInputPattern = /^[\d,\s]+$/

    const validNumbers = splitNumbers.filter(num => !isNaN(num));

    let isValid = true;

    //set error message to please provide input
    if (!inputField.value) {
        errorMessage.textContent = "Please provide input.";
        errorMessage.classList.add("show-error");
        isValid = false;
    } else if (!validInputPattern.test(inputField.value)) {
        errorMessage.textContent = "Invalid input! Please provide number only.";
        errorMessage.classList.add("show-error");
        isValid = false;
    } else if (validNumbers.length > 30) {
        errorMessage.textContent = "Maximum of 30 sets of numbers are allowed.";
        errorMessage.classList.add("show-error");
        isValid = false;
    } else if (validNumbers.length < 2) {
        errorMessage.textContent = "Please provide numbers atleast 2 or more.";
        errorMessage.classList.add("show-error");
        isValid = false;
    } else {
        errorMessage.textContent = "";
    }

    errorMessage.classList.toggle("show-error", !isValid);

    return isValid;
}

//display the result
function displayResult(splitNumberArr) {

    //clear the current result
    resultContainer.innerHTML = '';
    //loader
    const allResult = document.createElement("div");
    //adding class
    allResult.classList.add("result-container");
    //display result
    allResult.innerHTML = `
    <div class="result-header-container ">
        <h1>Result:</h1>
        <button class="clipboard " id="clipboard" onclick="copyClipboard(document.querySelector('.result-container').textContent)">
            <i class="icon clipboard-icon  fa-regular fa-clipboard"></i>

        </button>
    </div>
    <p class='text-result'>Mean: ${getMean(splitNumberArr)}</p>
    <p class='text-result'>Median: ${getMedian(splitNumberArr)}</p>
    <p class='text-result'>Mode: ${getMode(splitNumberArr)}</p>
    <p class='text-result'>Range: ${getRange(splitNumberArr)}</p>
    <p class='text-result'>Sum: ${getSum(splitNumberArr)}</p>
    <p class='text-result'>Smallest: ${getMin(splitNumberArr)}</p>
    <p class='text-result'>Largest: ${getMax(splitNumberArr)}</p>
    <p class='text-result'>Count: ${getCount(splitNumberArr)}</p>
    `;
    //adding class
    resultContainer.classList.add("show-result");
    //adding child to its parent resultContainer

    resultContainer.appendChild(allResult);
    buttonClear.classList.remove("hide-button");

}
//this will clear all results and also in input
function clearBtn() {
    const chartContainer = document.querySelector(".chart-container");
    inputField.value = "";
    setTimeout(() => {

        resultContainer.classList.remove("show-result");
        chartContainer.classList.remove("show-result");
        buttonClear.classList.add("hide-button");
    }, 500);
    scroll(navID);
}
//this function will copy the result text
async function copyClipboard(text) {
    const trimmedText = text.trim();
    const splitNumber = inputField.value.split(/[,\s]+/).filter(num => num !== '').map(num => parseFloat(num));

    try {
        await navigator.clipboard.writeText(`Datasets: ${splitNumber} ${trimmedText}`)
        alert("Text successfully copied!");

    } catch (err) {
        console.err("Failed to copy text: ", err);
    }
}
//scroll to specified element
function scroll(element) {
    element.scrollIntoView();
}
//getting mean
function getMean(nums) {
    const sum = nums.reduce((acc, num) => acc + num, 0);
    const average = sum / nums.length;

    const formattedNums = average.toFixed(1);

    return formattedNums;
}
//getting median
function getMedian(nums) {
    const sortedNums = nums.sort((num1, num2) => num1 - num2);
    const length = sortedNums.length;
    const middleIndex = Math.floor(length / 2);
    //1,2,3,4,5,6,7,8
    return length % 2 === 0 ?
        (sortedNums[middleIndex - 1] + sortedNums[middleIndex]) / 2
        : sortedNums[middleIndex];
}
//getting mode
function getMode(nums) {
    let frequencyMap = {};
    let maxFrequency = 0;
    let mode = [];

    nums.forEach(element => {
        if (frequencyMap[element] === undefined) {
            frequencyMap[element] = 0;
        }
        frequencyMap[element] += 1;
    });

    for (let num in frequencyMap) {
        if (frequencyMap[num] > maxFrequency) {
            mode = [parseInt(num)];
            maxFrequency = frequencyMap[num];
        } else if (frequencyMap[num] === maxFrequency) {
            mode.push(parseInt(num));
        }

    }
    if (mode.length === Object.keys(frequencyMap).length) {
        return "No mode"
    }
    return mode.join(", ");
    // nums.forEach(num => {
    //     frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    // });

    // let mode = [];
    // let maxFrequency = 0;

    // for (let num in frequencyMap) {
    //     if (frequencyMap[num] > maxFrequency) {
    //         mode = [parseInt(num)];
    //         maxFrequency = frequencyMap[num];
    //     } else if (frequencyMap[num] === maxFrequency) {
    //         mode.push(parseInt(num));
    //     }
    // }
    // if (mode.length === Object.keys(frequencyMap).length) {
    //     return "No mode";
    // }

    // return mode.join(", ");
}
//getting range
function getRange(nums) {

    const min = Math.min(...nums);
    const max = Math.max(...nums);

    return max - min;
}
//getting sum
function getSum(nums) {
    let sum = nums.reduce((acc, num) => acc + num, 0);

    return sum;
}
//getting smallest number
function getMin(nums) {
    const min = Math.min(...nums);

    return min;
}
//getting largest number
function getMax(nums) {
    const max = Math.max(...nums);

    return max;
}
//getting length of numbers
function getCount(nums) {
    const length = nums.length;

    return length;
}

