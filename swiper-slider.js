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
  spaceBetween: 24,

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
