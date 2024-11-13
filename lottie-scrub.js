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

/* WORKING CODE FOR SCRUBBING LOTTIE */
const animations = document.querySelectorAll(".lottie-item");

animations.forEach((item) => {
  const anim = lottie.loadAnimation({
    container: item,
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: item.dataset.json,
  });

  anim.addEventListener("DOMLoaded", () => {
    const frameRate = 30; // Set this to the actual frame rate of your Lottie animation.
    const targetSeconds = 4; // Target duration in seconds
    const targetFrame = Math.floor(targetSeconds * frameRate); // Calculate target frame
    const frameDuration = anim.getDuration(true);

    console.log("Animation duration:", frameDuration);
    console.log("Total frames:", anim.totalFrames);
    console.log("Target Frame:", targetFrame);

    // Setup ScrollTrigger
    ScrollTrigger.create({
      trigger: ".trigger.first",
      start: "35% 85%",
      end: "bottom 85%",
      markers: true, // Keep this for debugging

      onEnter: () => {
        console.log("Entering trigger. Playing animation.");
        // anim.stop(); // Stop any ongoing animations
        // anim.goToAndStop(0, true); // Reset to the beginning
        anim.setSpeed(1);
        anim.setDirection(1); // Set to play forward
        anim.play(); // Start playing the animation
        anim.playSegments([0, targetFrame], true);
      },

      onLeave: () => {
        console.log("Leaving trigger. Stopping at target frame.");
        // anim.stop(); // Stop any ongoing animations
        //   anim.goToAndPlay(targetFrame, true); // Reset to the beginning
        anim.playSegments([targetFrame, frameDuration], true);
        anim.setSpeed(1);
        anim.setDirection(1); // Set to play forward
        anim.play(); // Start playing the animation

        // Use GSAP to animate opacity
        gsap.to(".lottie-frame.inner-shadow", {
          opacity: 1, // Change opacity to 1
          duration: 0.2, // Duration of the animation
          ease: "power1.out", // Easing function
        });
        gsap.to(".lottie-frame.blue", {
          opacity: 1, // Change opacity to 1
          duration: 0.2, // Duration of the animation
          ease: "power1.out", // Easing function
        });
      },

      onEnterBack: () => {
        console.log("Entering trigger back. Resetting to target frame.");
        // anim.stop(); // Stop any ongoing animations
        // anim.goToAndStop(targetFrame, true); // Reset to target frame
        anim.setDirection(-1); // Set to play backwards
        anim.play(); // Start playing the animation backwards
        anim.playSegments([frameDuration, targetFrame], true);
        anim.setSpeed(4);
        // Use GSAP to animate opacity
        gsap.to(".lottie-frame.inner-shadow", {
          opacity: 0, // Change opacity to 1
          duration: 0.2, // Duration of the animation
          ease: "power1.out", // Easing function
        });
        gsap.to(".lottie-frame.blue", {
          opacity: 0, // Change opacity to 1
          duration: 0.2, // Duration of the animation
          ease: "power1.out", // Easing function
        });
      },

      onLeaveBack: () => {
        console.log("Leaving trigger back. Playing animation backwards.");
        // anim.stop(); // Stop any ongoing animations
        // anim.goToAndStop(targetFrame, true); // Reset to target frame
        anim.setDirection(-1); // Set to play backwards
        anim.play(); // Start playing the animation backwards
        anim.playSegments([targetFrame, 0], true);
        anim.setSpeed(4);
      },
    });
  });
});
