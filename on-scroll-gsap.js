// Use ScrollTrigger to trigger the animation and show markers
function createScrollTrigger(tl, triggerElement) {
  console.log("Creating ScrollTrigger for:", triggerElement);
  ScrollTrigger.create({
    trigger: triggerElement,
    start: "top 80%",
    end: "bottom 80%",
    onEnter: () => {
      console.log("Timeline played");
      tl.play();
    },
    // markers: true,
  });
}

//---------------PROGRAMMATIC START-----------------//
$('[motion-wrap="no-stagger"]').each(function (index) {
  let tl = gsap.timeline({ paused: true });

  tl.from(
    $(this).find("[ ]"),
    {
      opacity: 0,
      yPercent: 4,
      ease: "back.out(2)",
      duration: 0.8,
    },
    ""
  );

  tl.from(
    $(this).find("[motion-second-item]"),
    {
      opacity: 0,
      // yPercent: 10,
      ease: "back.out(2)",
      duration: 1.8,
    },
    "<.3"
  );
  tl.from(
    $(this).find("[motion-third-item]"),
    {
      opacity: 0,
      yPercent: 4,
      ease: "back.out(2)",
      duration: 0.8,
    },
    "<.2"
  );

  createScrollTrigger(tl, $(this));
});

$('[motion-wrap="with-stagger"]').each(function (index) {
  let tl = gsap.timeline({ paused: true });
  tl.from(
    $(this),
    {
      opacity: 0,
      ease: "back.out(2)",
      duration: 1.4,
    },
    ""
  );
  tl.from(
    $(this).find("[motion-first-item]"),
    {
      opacity: 0,
      yPercent: 4,
      ease: "back.out(2)",
      duration: 0.8,
    },
    "<.4"
  );
  tl.from(
    $(this).find("[motion-first-stagging]"),
    {
      opacity: 0,
      y: 24,
      duration: 1,
      // ease: 'back.out(2)',
      stagger: {
        amount: 0.6,
        from: "start",
      },
    },
    "<0.4"
  );
  tl.from(
    $(this).find("[motion-second-item]"),
    {
      opacity: 0,
      // yPercent: 10,
      ease: "back.out(2)",
      duration: 1.8,
    },
    "<.5"
  );
  tl.from(
    $(this).find("[motion-third-item]"),
    {
      opacity: 0,
      yPercent: 4,
      ease: "back.out(2)",
      duration: 0.8,
    },
    "<.1"
  );

  createScrollTrigger(tl, $(this));
});



// //PROGRAMMATIC — Why section
// $('[motion-wrap="programmatic-why"]').each(function (index) {
//   let tl = gsap.timeline({ paused: true });

//   tl.from($(this).find("[programmatic-why] [text-split] .char"), {
//     opacity: 0,
//     duration: 1.2,
//     yPercent: 10,
//     ease: "back.out(2)",
//     stagger: { each: 0.05 },
//   });

//   tl.from(
//     $(this).find("[programmatic-why] [motion-first-stagging]"),
//     {
//       opacity: 0,
//       y: 24,
//       duration: 1,
//       // ease: 'back.out(2)',
//       stagger: {
//         amount: 0.6,
//         from: "start",
//       },
//     },
//     "1"
//   );

//   createScrollTrigger(tl, $(this));
// });

// //PROGRAMMATIC — Services section
// $('[motion-wrap="programmatic-services"]').each(function (index) {
//   let tl = gsap.timeline({ paused: true });

//   tl.from($(this).find("[text-split] .char"), {
//     opacity: 0,
//     duration: 1.2,
//     yPercent: 10,
//     ease: "back.out(2)",
//     stagger: { each: 0.05 },
//   });

//   tl.from(
//     $(this).find("[motion-first-stagging]"),
//     {
//       opacity: 0,
//       y: 24,
//       duration: 1,
//       // ease: 'back.out(2)',
//       stagger: {
//         amount: 0.6,
//         from: "start",
//       },
//     },
//     "1"
//   );

//   tl.from(
//     $(this).find("[motion-first-item]"),
//     {
//       opacity: 0,
//       // yPercent: 10,
//       ease: "back.out(2)",
//       duration: 1.8,
//     },
//     "<0.2"
//   );

//   createScrollTrigger(tl, $(this));
// });

// //---------------WHAT MAKES DIFFERENT-----------------//
// //Creativity
// $('[motion-wrap="creativity"]').each(function (index) {
//   let tl = gsap.timeline({ paused: true });

//   tl.from($(this).find("[text-split] .char"), {
//     opacity: 0,
//     duration: 1.2,
//     yPercent: 10,
//     ease: "back.out(2)",
//     stagger: { each: 0.05 },
//   });

//   tl.from(
//     $(this).find("[motion-first-item]"),
//     {
//       opacity: 0,
//       yPercent: 4,
//       ease: "back.out(2)",
//       duration: 0.8,
//     },
//     "<0.8"
//   );
//   tl.from(
//     $(this).find("[motion-second-item]"),
//     {
//       opacity: 0,
//       // yPercent: 10,
//       ease: "back.out(2)",
//       duration: 0.8,
//     },
//     "-=0.2"
//   );
//   tl.from(
//     $(this).find("[motion-first-stagging]"),
//     {
//       opacity: 0,
//       y: 24,
//       duration: 1,
//       // ease: 'back.out(2)',
//       stagger: {
//         amount: 0.6,
//         from: "start",
//       },
//     },
//     "<0.4"
//   );

//   tl.from(
//     $(this).find("[motion-third-item]"),
//     {
//       opacity: 0,
//       // yPercent: 10,
//       ease: "back.out(2)",
//       duration: 1.8,
//     },
//     "<0.6"
//   );
//   createScrollTrigger(tl, $(this));
// });


