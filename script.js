//LOGO RANDOMIZER

document.addEventListener("DOMContentLoaded", () => {
  // Select all images with the specified class
  const images = Array.from(
    document.querySelectorAll(".home-hero-logos_cli img")
  );

  // Select all hero grid items
  const gridItems = Array.from(document.querySelectorAll(".hero-grid-item"));

  // Check if there are enough images for the grid items
  const numberOfImagesToUse = Math.min(images.length, gridItems.length);

  // Shuffle the images array
  const shuffledImages = shuffleArray(images);

  // Assign images to grid items
  for (let i = 0; i < numberOfImagesToUse; i++) {
    const gridItem = gridItems[i];
    const image = shuffledImages[i];

    // Create a new image element
    const imgElement = document.createElement("img");
    imgElement.src = image.src; // Use the source of the shuffled image
    imgElement.setAttribute(
      "data-unique-number",
      image.getAttribute("data-unique-number")
    ); // Retain the unique number if needed

    // Append the image to the grid item
    gridItem.appendChild(imgElement);
  }

  // Function to update a random grid item every 3 seconds
  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * gridItems.length);
    const gridItem = gridItems[randomIndex];
    const currentImage = gridItem.querySelector("img");

    // If there is an image in the grid item, fade it out
    if (currentImage) {
      currentImage.classList.add("fade-out");

      // Wait for the fade-out transition to complete before replacing the image
      setTimeout(() => {
        // Remove the current image
        gridItem.removeChild(currentImage);

        // Select a new random image from the shuffled images
        const newImage = getRandomImage(
          shuffledImages,
          currentImage.getAttribute("data-unique-number")
        );

        // Create and append the new image
        const newImgElement = document.createElement("img");
        newImgElement.src = newImage.src;
        newImgElement.setAttribute(
          "data-unique-number",
          newImage.getAttribute("data-unique-number")
        );
        gridItem.appendChild(newImgElement);
      }, 500); // Match this duration with the CSS transition duration
    }
  }, 3000); // Update every 3 seconds
});

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// Function to get a random image that is not the same as the current image
function getRandomImage(images, currentUniqueNumber) {
  let newImage;
  do {
    newImage = images[Math.floor(Math.random() * images.length)];
  } while (newImage.getAttribute("data-unique-number") === currentUniqueNumber);
  return newImage;
}
//—————————————————————
//END OF LOGO RANDOMIZER

console.clear();
// Ensure you have GSAP and ScrollTrigger loaded
gsap.registerPlugin(ScrollTrigger);

let path = document.getElementById("trimPath");
let l = path.getTotalLength();

// Set the initial strokeDasharray
TweenMax.set(path, { strokeDasharray: l });

// Create a GSAP timeline for the animation
let pathTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".scrubbing-path_wrap", // The element that triggers the scroll
    start: "top 70%", // Start when the top of the trigger hits the top of the viewport
    end: "150% 70%", // Adjust this value based on how far you want the scroll to go
    scrub: true, // Enable scrubbing
    // pin: true, // Optional: pins the trigger element during the scroll
    // markers: true,
  },
});

// Animate the path with reversed direction
pathTl.fromTo(
  path,
  { strokeDashoffset: -l },
  { strokeDashoffset: 0, duration: 3 }
);
