gsap.registerPlugin(ScrollTrigger);

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
console.log(fifthDotH.textContent, fifthDotP.textContent);

// Set the initial strokeDasharray
gsap.set(path, { strokeDasharray: totalLength });

// Define reusable styling variables
const activeFillColor = "var(--colors-all--additional)";
const inactiveFillColor = "#AAAEB2";
const transitionDuration = 0.3;
const opacityZero = 0;
const opacityQuarter = 0.25;
const opacityForP = 0.6;
const opacityForH = 1;
const minR = 6;
const maxR = 12;

// Create a GSAP timeline for the animation
let pathTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".scrubbing-path_wrap",
    start: "15% 70%",
    end: "150% 70%",
    scrub: true,
    markers: true, // Show markers for debugging
  },
});

// Animate the path with reversed direction
pathTl.fromTo(
  path,
  { strokeDashoffset: -totalLength },
  {
    strokeDashoffset: 0,
    duration: 3,
    onUpdate: function () {
      let currentOffset = gsap.getProperty(path, "strokeDashoffset");

      // Change color of firstDot and animate firstDotShadow opacity when strokeDashoffset reaches -3239
      if (currentOffset >= -3239) {
        gsap.to(firstDot, {
          fill: "var(--colors-all--additional)",
          duration: 0.3,
        });
        gsap.to(firstDotShadow, {
          attr: { r: 12 },
          opacity: 0.25,
          duration: 0.3,
        });
        gsap.to(firstDotH, {
          opacity: 1,
          duration: 0.3,
        });
        gsap.to(firstDotP, {
          opacity: 0.6,
          height: "auto",
          duration: 0.3,
        });
      } else {
        gsap.to(firstDot, {
          fill: "#AAAEB",
          duration: 0.3,
        });
        gsap.to(firstDotShadow, {
          attr: { r: 6 },
          opacity: 0,
          duration: 0.3,
        });
        gsap.to(firstDotH, {
          opacity: 0.25,
          duration: 0.3,
        });
        gsap.to(firstDotP, {
          opacity: 0,
          height: "0px",
          duration: 0.3,
        });
      }

      //-3239, -2770, -2287, -994, -443
    },
  }
);
