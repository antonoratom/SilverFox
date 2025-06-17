const swiperFeedbacks = new Swiper(".feedacks-xs-clw", {
  // Optional parameters
  breakpoints: {
    // when window width is >= 320px
    300: {
      slidesPerView: 1,
      spaceBetween: 16,
    },
    460: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    640: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    // when window width is >= 640px
    991: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  },

  // Navigation arrows
  navigation: {
    prevEl: "#feedback-l-arrow",
    nextEl: "#feedback-r-arrow",
  },
  pagination: {
    el: "#feedback-pagination",
    clickable: true,
  },
});

const swiperCases = new Swiper(".case-clw", {
  // Optional parameters
  slidesPerView: 1,
  spaceBetween: 0,

  // Navigation arrows
  navigation: {
    prevEl: "#cases-l-arrow",
    nextEl: "#cases-r-arrow",
  },
  pagination: {
    el: "#cases-pagination",
    clickable: true,
  },
});

// const infinityLogosFirst = new Swiper("#companies-first-line", {
//   speed: 4500,
//   loop: true,
//   slidesPerView: 6,
//   autoplay: {
//     delay: 0.5,
//     reverseDirection: false,
//   },
//   breakpoints: {
//     0: {
//       spaceBetween: 16,
//     },
//     992: {
//       spaceBetween: 24,
//     },
//   },
// });

// const infinityLogosSecond = new Swiper("#companies-second-line", {
//   speed: 2500,
//   loop: true,
//   slidesPerView: 6,
//   slidesOffsetBefore: 48,
//   autoplay: {
//     delay: 0.5,
//     reverseDirection: false,
//   },
//   breakpoints: {
//     0: {
//       spaceBetween: 16,
//     },
//     992: {
//       spaceBetween: 24,
//     },
//   },
// });
// const infinityLogosThird = new Swiper("#companies-third-line", {
//   speed: 3500,
//   loop: true,
//   slidesPerView: "auto",
//   slidesOffsetBefore: 24,
//   autoplay: {
//     delay: 0.5,
//     reverseDirection: true,
//   },
//   breakpoints: {
//     0: {
//       spaceBetween: 16,
//     },
//     992: {
//       spaceBetween: 24,
//     },
//   },
// });
