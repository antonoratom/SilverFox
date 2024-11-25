if (window.innerWidth > 991) {
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
        trigger: ".lottie-trigger",
        start: "top 85%",
        end: "bottom 85%",
        // markers: true,

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
}
