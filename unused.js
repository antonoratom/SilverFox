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

// console.clear();
/* The encoding is super important here to enable frame-by-frame scrubbing. */

// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -movflags faststart -vcodec libx264 -crf 23 -g 1 -pix_fmt yuv420p output.mp4
// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output_960.mp4

const video = document.querySelector(".video-background");
let src = video.currentSrc || video.src;
console.log(video, src);

/* Make sure the video is 'activated' on iOS */
function once(el, event, fn, opts) {
  var onceFn = function (e) {
    el.removeEventListener(event, onceFn);
    fn.apply(this, arguments);
  };
  el.addEventListener(event, onceFn, opts);
  return onceFn;
}

once(document.documentElement, "touchstart", function (e) {
  video.play();
  video.pause();
});

/* ---------------------------------- */
/* Scroll Control! */

gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  defaults: { duration: 1 },
  scrollTrigger: {
    trigger: ".video-wrap",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  },
});

once(video, "loadedmetadata", () => {
  tl.fromTo(
    video,
    {
      currentTime: 0,
    },
    {
      currentTime: video.duration || 1,
    }
  );
});

/* When first coded, the Blobbing was important to ensure the browser wasn't dropping previously played segments, but it doesn't seem to be a problem now. Possibly based on memory availability? */
setTimeout(function () {
  if (window["fetch"]) {
    fetch(src)
      .then((response) => response.blob())
      .then((response) => {
        var blobURL = URL.createObjectURL(response);

        var t = video.currentTime;
        once(document.documentElement, "touchstart", function (e) {
          video.play();
          video.pause();
        });

        video.setAttribute("src", blobURL);
        video.currentTime = t + 0.01;
      });
  }
}, 1000);

/* ---------------------------------- */
