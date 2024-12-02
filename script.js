// HOME PAGE //
// LOGO RANDOMIZER
const images = Array.from(
  document.querySelectorAll(".home-hero-logos_cli.w-dyn-item img")
);
const gridItems = Array.from(document.querySelectorAll(".hero-grid-item"));

const numberOfImagesToUse = Math.min(images.length, gridItems.length);
const shuffledImages = shuffleArray(images);

for (let i = 0; i < numberOfImagesToUse; i++) {
  const gridItem = gridItems[i];
  const image = shuffledImages[i];

  const imgElement = document.createElement("img");
  imgElement.src = image.src;
  imgElement.setAttribute(
    "data-unique-number",
    image.getAttribute("data-unique-number")
  );

  gridItem.appendChild(imgElement);
}

// Function to update a random grid item every 3 seconds
setInterval(() => {
  const randomIndex = Math.floor(Math.random() * gridItems.length);
  const gridItem = gridItems[randomIndex];
  const currentImage = gridItem.querySelector("img");

  if (currentImage) {
    currentImage.classList.add("fade-out");

    setTimeout(() => {
      gridItem.removeChild(currentImage);

      const newImage = getRandomImage(
        shuffledImages,
        currentImage.getAttribute("data-unique-number")
      );

      const newImgElement = document.createElement("img");
      newImgElement.src = newImage.src;
      newImgElement.setAttribute(
        "data-unique-number",
        newImage.getAttribute("data-unique-number")
      );
      gridItem.appendChild(newImgElement);
    }, 500);
  }
}, 3000);

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
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

// END OF LOGO RANDOMIZER

// PATH ANIMATION

function responsiveScrubPath() {
  // Define common active and inactive animation states
  const activeAnimation = {
    fill: "var(--colors-all--additional)",
    backgroundColor: "var(--colors-all--additional)",
    shadowRadius: 12,
    shadowOpacity: 0.25,
    hOpacity: 1,
    pOpacity: 0.6,
    pHeight: "auto",
  };

  const inactiveAnimation = {
    fill: "#AAAEB2",
    backgroundColor: "#AAAEB2",
    shadowRadius: 6,
    shadowOpacity: 0,
    hOpacity: 0.25,
    pOpacity: 0,
    pHeight: "0px",
  };

  if (window.innerWidth > 992) {
    let path = document.getElementById("trimPath");
    let firstDot = document.getElementById("firstDot");
    let firstDotShadow = document.getElementById("firstDotShadow");
    let firstDotH = document.querySelector("#firstDotText h5");
    let firstDotP = document.querySelector("#firstDotText p");

    let secondDot = document.getElementById("secondDot");
    let secondDotShadow = document.getElementById("secondDotShadow");
    let secondDotH = document.querySelector("#secondDotText h5");
    let secondDotP = document.querySelector("#secondDotText p");

    let thirdDot = document.getElementById("thirdDot");
    let thirdDotShadow = document.getElementById("thirdDotShadow");
    let thirdDotH = document.querySelector("#thirdDotText h5");
    let thirdDotP = document.querySelector("#thirdDotText p");

    let fourthDot = document.getElementById("fourthDot");
    let fourthDotShadow = document.getElementById("fourthDotShadow");
    let fourthDotH = document.querySelector("#fourthDotText h5");
    let fourthDotP = document.querySelector("#fourthDotText p");

    let fifthDot = document.getElementById("fifthDot");
    let fifthDotShadow = document.getElementById("fifthDotShadow");
    let fifthDotH = document.querySelector("#fifthDotText h5");
    let fifthDotP = document.querySelector("#fifthDotText p");
    let totalLength = path.getTotalLength(); // Get the total length of the path

    // Set the initial strokeDasharray
    gsap.set(path, { strokeDasharray: totalLength });
    // Create a GSAP timeline for the animation
    let pathTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scrubbing-path_wrap",
        start: "15% 70%",
        end: "130% 70%",
        scrub: 0.001,
        // markers: true,
      },
    });

    // Define your threshold values and corresponding pathWraps
    const thresholds = [
      {
        value: 3174,
        elements: [firstDot, firstDotShadow, firstDotH, firstDotP],
      },
      {
        value: 2697,
        elements: [secondDot, secondDotShadow, secondDotH, secondDotP],
      },
      {
        value: 2213,
        elements: [thirdDot, thirdDotShadow, thirdDotH, thirdDotP],
      },
      {
        value: 916,
        elements: [fourthDot, fourthDotShadow, fourthDotH, fourthDotP],
      },
      {
        value: 370,
        elements: [fifthDot, fifthDotShadow, fifthDotH, fifthDotP],
      },
    ];

    pathTl.fromTo(
      path,
      { strokeDashoffset: totalLength },
      {
        strokeDashoffset: 0,
        // duration: 5,
        // ease: "power1.inOut",
        onUpdate: function () {
          let currentOffset = gsap.getProperty(path, "strokeDashoffset");
          // Function to trigger animations
          function triggerAnimations(elements, isActive) {
            const animation = isActive ? inactiveAnimation : activeAnimation;

            gsap.to(elements[0], {
              fill: animation.fill,
              duration: 0.3,
            });
            gsap.to(elements[1], {
              attr: { r: animation.shadowRadius },
              opacity: animation.shadowOpacity,
              duration: 0.3,
            });
            gsap.to(elements[2], {
              opacity: animation.hOpacity,
              duration: 0.3,
            });
            gsap.to(elements[3], {
              opacity: animation.pOpacity,
              height: animation.pHeight,
              duration: 0.6,
            });
          }

          // Loop through the thresholds to determine which animations to trigger
          thresholds.forEach((threshold) => {
            const isActive = currentOffset >= threshold.value;
            // Trigger animations for the corresponding pathWrap
            triggerAnimations(threshold.elements, isActive);
          });
        },
      }
    );
  } else {
    let firstDot = document.getElementById("firstMobDot");
    let firstDotShadow = document.getElementById("firstMobDotShadow");
    let firstDotH = document.querySelector("#firstDotText h5");
    let firstDotP = document.querySelector("#firstDotText p");

    let secondDot = document.getElementById("secondMobDot");
    let secondDotShadow = document.getElementById("secondMobDotShadow");
    let secondDotH = document.querySelector("#secondDotText h5");
    let secondDotP = document.querySelector("#secondDotText p");

    let thirdDot = document.getElementById("thirdMobDot");
    let thirdDotShadow = document.getElementById("thirdMobDotShadow");
    let thirdDotH = document.querySelector("#thirdDotText h5");
    let thirdDotP = document.querySelector("#thirdDotText p");

    let fourthDot = document.getElementById("fourthMobDot");
    let fourthDotShadow = document.getElementById("fourthMobDotShadow");
    let fourthDotH = document.querySelector("#fourthDotText h5");
    let fourthDotP = document.querySelector("#fourthDotText p");

    let fifthDot = document.getElementById("fifthMobDot");
    let fifthDotShadow = document.getElementById("fifthMobDotShadow");
    let fifthDotH = document.querySelector("#fifthDotText h5");
    let fifthDotP = document.querySelector("#fifthDotText p");

    // console.log(thirdDot.id);

    let path = document.querySelector(".mobile-path_line");
    let totalHeight = parseFloat(
      window.getComputedStyle(path.parentElement).height
    );
    // Define your threshold values and corresponding elements
    const thresholds = [
      {
        value: 7,
        elements: [firstDot, firstDotShadow, firstDotH, firstDotP],
      },
      {
        value: 24.5,
        elements: [secondDot, secondDotShadow, secondDotH, secondDotP],
      },
      {
        value: 42,
        elements: [thirdDot, thirdDotShadow, thirdDotH, thirdDotP],
      },
      {
        value: 59.5,
        elements: [fourthDot, fourthDotShadow, fourthDotH, fourthDotP],
      },
      {
        value: 77,
        elements: [fifthDot, fifthDotShadow, fifthDotH, fifthDotP],
      },
    ];

    // Animate the path based on height
    let pathTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".pains-items_block",
        start: "0% 80%",
        end: "110% 80%",
        scrub: true,
        // markers: true,
        onUpdate: function () {
          let currentHeight = parseFloat(window.getComputedStyle(path).height);
          let heightPercentage = (currentHeight / totalHeight) * 100;

          // Function to trigger animations
          function triggerAnimations(elements, isActive) {
            const animation = isActive ? activeAnimation : inactiveAnimation;

            gsap.to(elements[0], {
              backgroundColor: animation.backgroundColor,
              duration: 0.3,
            });
            gsap.to(elements[1], {
              attr: { r: animation.shadowRadius },
              opacity: animation.shadowOpacity,
              duration: 0.3,
            });
            gsap.to(elements[2], {
              opacity: animation.hOpacity,
              duration: 0.3,
            });
            gsap.to(elements[3], {
              opacity: animation.pOpacity,
              height: animation.pHeight,
              duration: 0.6,
            });
          }

          // Loop through the thresholds to determine which animations to trigger
          thresholds.forEach((threshold) => {
            const isActive = heightPercentage >= threshold.value;
            // Trigger animations for the corresponding elements
            triggerAnimations(threshold.elements, isActive);
          });
        },
      },
    });

    pathTl.to(path, {
      height: "100%",
      ease: "linear",
    });
  }
}

// Run the function on initial load
responsiveScrubPath();

// Add an event listener to handle window resizing
window.addEventListener("resize", responsiveScrubPath);

// END OF PATH ANIMATION

if (window.innerWidth > 991) {
  let funnelTl = gsap.timeline({
    defaults: { duration: 1 },
    scrollTrigger: {
      trigger: " [funnel-wrap]",
      start: "top 60%",
      end: "bottom 60%",
      // markers: true,
    },
  });
  // Animate the width of the sticky element from its initial width to 0%
  funnelTl.from("[funnel-img-wrap]", {
    x: "-11%",
    scale: 1.2,
    duration: 2.5,
    ease: "power4.out",
  });

  // Animate the width of the sticky element from its initial width to 0%
  funnelTl.from("[funnel-rays]", {
    opacity: 0,
    duration: 2.5,
    ease: "power4.out",
  });

  funnelTl.from(
    "[funnel-img-consultants]",
    {
      opacity: 0,
      filter: "blur(13px)",
      duration: 1.2,
      ease: "power1.out",
    },
    "<.2"
  );

  funnelTl.from(
    "[funnel-img-agencies]",
    {
      opacity: 0,
      filter: "blur(13px)",
      duration: 1.2,
      ease: "power1.out",
    },
    "<.4"
  );

  funnelTl.from(
    "[funnel-img-growth]",
    {
      opacity: 0,
      filter: "blur(13px)",
      duration: 1.2,
      ease: "power1.out",
    },
    "<.4"
  );

  funnelTl.from(
    "[funnel-add-p]",
    {
      opacity: 0,
      x: "-3%",
      duration: 1.2,
      ease: "power1.out",
    },
    0.4
  );

  funnelTl.from(
    "[funnel-main-p]",
    {
      opacity: 0,
      x: "-3%",
      duration: 1.2,
      ease: "power1.out",
    },
    0.8
  );
}
