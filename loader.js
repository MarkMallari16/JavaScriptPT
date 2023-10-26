


document.addEventListener("DOMContentLoaded", () => {
    const chartImageElement = document.querySelector('.chart-image');

    // Hide the image initially
    chartImageElement.style.display = "none";

    // Remove skeleton class after 1 second
    setTimeout(() => {
        const skeletonElements = document.querySelectorAll('.skeleton');
        skeletonElements.forEach(element => {
            element.classList.remove("skeleton");
        });

        // Add load event listener to the image
        chartImageElement.addEventListener("load", () => {
            // Image has loaded, remove skeleton class and show the image
            chartImageElement.classList.remove("skeleton");
            chartImageElement.style.display = "block";
        });

        // Set the image src after attaching the load event listener
        chartImageElement.src = "/assets/chart.png";
    }, 1000);
});
