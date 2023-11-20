const skeletonElements = document.querySelectorAll(".skeleton");
const skeletonElementsContainer = document.querySelectorAll(".skeleton-container");

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
    
        showSkeletonLoading();
        removeSkeletonLoading();

    }, 1000);
});
function showSkeletonLoading() {
    skeletonElements.forEach(element => {
        element.classList.remove("skeleton", "skeleton-input", "link-skeleton", "sub-text-skeleton", "text-skeleton", "skeleton-button", "image-hide");
    });
}
function removeSkeletonLoading() {
    skeletonElementsContainer.forEach(element => {
        element.classList.remove("skeleton-container");
    })
}
