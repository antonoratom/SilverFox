$("[steps-card-target]").each(function () {
  let stickyBl = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      start: "top 30%",
      end: "300% 30%",
      scrub: true,
      //   markers: true,
    },
  });

  stickyBl.to($(this), {
    scale: 0.9,
    // y: "100vh",
    ease: "linear",
  });
});
