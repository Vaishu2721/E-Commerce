// function to slide the images in the home page
let slideIndex = 0;
let imageslide = document.querySelectorAll('.slide');
const imagesPerSlide = 4; 

function showImages() {
    imageslide.forEach((image) => {
        image.classList.remove("active");
    });

    for (let i = 0; i < imagesPerSlide; i++) {
        const currentIndex = (slideIndex + i) % imageslide.length;
        imageslide[currentIndex].classList.add("active");
    }
    slideIndex = (slideIndex + imagesPerSlide) % imageslide.length;
}

setInterval(showImages, 3000);
