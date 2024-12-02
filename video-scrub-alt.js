const stickyElement = document.querySelector(".hero-sticky_vid"); // Select the sticky element

gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  defaults: { duration: 1 },
  scrollTrigger: {
    trigger: ".hero-sticky_wrap",
    start: "top top",
    end: "50% top",
    scrub: true,
    // markers: true,
  },
});

tl.to(stickyElement, {
  opacity: 0,
  // marginLeft: "100%",
  scale: 1.2,
  ease: "power2.inOut", // Optional easing function
  duration: 0.75,
});
