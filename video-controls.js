// //VIDEO SCRUB OLD
// const video = document.querySelector(".video-background");
// const stickyElement = document.querySelector(".hero-sticky_fg-2"); // Select the sticky element
// let src = video.currentSrc || video.src;

// if (window.innerWidth > 991) {
//   // console.log(video, src);

//   /* Make sure the video is 'activated' on iOS */
//   function once(el, event, fn, opts) {
//     var onceFn = function (e) {
//       el.removeEventListener(event, onceFn);
//       fn.apply(this, arguments);
//     };
//     el.addEventListener(event, onceFn, opts);
//     return onceFn;
//   }

//   once(document.documentElement, "touchstart", function (e) {
//     video.play();
//     video.pause();
//   });

//   /* ---------------------------------- */
//   /* Scroll Control! */

//   gsap.registerPlugin(ScrollTrigger);

//   let tl = gsap.timeline({
//     defaults: { duration: 1 },
//     scrollTrigger: {
//       trigger: ".hero-sticky_wrap",
//       start: "top top",
//       end: "bottom bottom",
//       scrub: true,
//       // markers: true,
//     },
//   });

//   once(video, "loadedmetadata", () => {
//     // Animate video playback
//     tl.fromTo(
//       video,
//       {
//         currentTime: 0,
//       },
//       {
//         currentTime: video.duration || 1,
//       }
//     );

//     // Animate the width of the sticky element from its initial width to 0%
//     tl.to(
//       stickyElement,
//       {
//         marginLeft: "-100%",
//         ease: "power2.inOut", // Optional easing function
//         duration: 0.75,
//       },
//       0 // Start this animation at the same time as the video animation
//     );
//   });

//   /* Fetch and set video source logic */
//   setTimeout(function () {
//     if (window["fetch"]) {
//       fetch(src)
//         .then((response) => response.blob())
//         .then((response) => {
//           var blobURL = URL.createObjectURL(response);
//           var t = video.currentTime;

//           video.setAttribute("src", blobURL);
//           video.currentTime = t + 0.01;
//         });
//     }
//   }, 1000);
// }

//FOR VIDEO CONTROLS
document.querySelector(".play-btn").addEventListener("click", function () {
  const video = document.getElementById("videoPlayer");
  const playButton = document.querySelector(".play-btn");
  
  video.currentTime = 0;
  video.muted = false;
  video.controls = true;
  video.play();
  playButton.style.display = "none";

  // Create an IntersectionObserver to pause the video when it scrolls out of view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        video.pause(); // Pause the video when it's out of view
      }
    });
  });

  // Start observing the video element
  observer.observe(video);
});