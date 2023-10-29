const skeletonElements = document.querySelectorAll(".skeleton");
const skeletonElementsContainer = document.querySelectorAll(".skeleton-container");

document.addEventListener("DOMContentLoaded", () => {


    setTimeout(() => {
        // Remove the "skeleton" class after elements are shown
        showSkeletonLoading();
        removeSkeletonLoading();

    }, 1000);
});
function showSkeletonLoading() {
    skeletonElements.forEach(element => {
        element.classList.remove("skeleton", "skeleton-input", "sub-text-skeleton", "text-skeleton", "skeleton-button", "chart-image-hide");
    });
}
function removeSkeletonLoading() {
    skeletonElementsContainer.forEach(element => {
        element.classList.remove("skeleton-container");
    })
}
