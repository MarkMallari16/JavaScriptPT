document.addEventListener("DOMContentLoaded", () => {
    let skeletonElements = document.querySelectorAll(".skeleton");
    let skeletonElementsContainer = document.querySelectorAll(".skeleton-container");
    setTimeout(() => {
        // Remove the "skeleton" class after elements are shown
        skeletonElements.forEach(element => {
            element.classList.remove("skeleton", "skeleton-input", "sub-text-skeleton", "text-skeleton", "skeleton-button", "chart-image-hide");
        });
        skeletonElementsContainer.forEach(element => {
            element.classList.remove("skeleton-container");
        })
    }, 1000);
});
