console.log("local codes");

const headerCtaWrap = document.querySelector(".header-main-cta_wrap");

if (window.innerWidth > 991) {
  // headerCtaWrap.style.maxWidth = "0%";

  $("[header-dropdown='trigger']").each(function (index) {
    let burgerItem = $(this).find("[header-dropdown='target']");
    let burgerTl = gsap.timeline({ paused: true });

    // Set the initial state
    gsap.set(burgerItem, { opacity: 0 });

    burgerTl.to(burgerItem, {
      opacity: 1,
      duration: 0.6,
      stagger: { amount: 0.3 },
    });

    // Play the animation on hover
    $(this).on("mouseenter", function () {
      burgerTl.play(); // Play the animation on mouse enter
    });

    // Reverse the animation on mouse leave
    $(this).on("mouseleave", function () {
      burgerTl.reverse(); // Reverse the animation on mouse leave
    });
  });
}

window.addEventListener("scroll", () => {
  // Check if the screen width is greater than 991 pixels
  if (window.innerWidth > 991) {
    // headerCtaWrap.style.maxWidth = "0%";
    if (window.scrollY > 100) {
      headerCtaWrap.style.maxWidth = "100%"; // 100% opacity
    } else {
      headerCtaWrap.style.maxWidth = "0%"; // or set to your desired opacity
    }
  } else {
    // Optionally, reset the style if the screen is smaller than 991px
    headerCtaWrap.style.maxWidth = "100%"; // Resets to default or hides the element
  }
});

const headerBgColor = document.querySelector(".header-bg");
const headerLogo = document.querySelector(".header-logo_link");
const headerCta = document.querySelector(".section.for-header .btn");
const headerLinks = document.querySelectorAll("[header-link_item]");
const headerBurgerIcon = document.querySelectorAll(".burger-line");
const headerDropdownToggle = document.querySelector(".header-dropdown_toggle");
// Function to add the class
function addLightClass() {
  headerLogo.classList.add("u-color-light");
  headerCta.classList.add("cc-light");
  headerDropdownToggle.classList.add("u-color-light");
  headerBurgerIcon.forEach((line) => {
    // line.classList.add("u-bg-light");
    line.style.setProperty(
      "background-color",
      "var(--colors-all--light)",
      "important"
    );
  });
  headerLinks.forEach((link) => {
    link.classList.add("u-color-light");
  });
  headerBgColor.classList.remove("u-bg-light");
}

// Function to remove the class
function removeLightClass() {
  headerLogo.classList.remove("u-color-light");
  headerCta.classList.remove("cc-light");
  headerDropdownToggle.classList.remove("u-color-light");
  headerBurgerIcon.forEach((line) => {
    // line.classList.remove("u-bg-light");
    line.style.removeProperty(
      "background-color",
      "var(--colors-all--light)",
      "important"
    );
  });
  headerLinks.forEach((link) => {
    link.classList.remove("u-color-light");
  });
  headerBgColor.classList.add("u-bg-light");
}
$("[light-section]").each(function () {
  let scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      start: "top 24px",
      end: "bottom 24px",
      //markers: true,
      onEnter: addLightClass,
      onLeave: removeLightClass,
      onEnterBack: addLightClass,
      onLeaveBack: removeLightClass,
    },
  });
});

// Function to handle scroll event
const headerBgWrap = document.querySelector(".header-bg_wrap");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    headerBgWrap.style.opacity = "1"; // 100% opacity
  } else {
    headerBgWrap.style.opacity = "0"; // or set to your desired opacity
  }
});

// Select the elements
const headerLinksWrap = document.querySelector(".col.header-links_wrap");
const headerBgWrapNew = document.querySelector(".header-bg_wrap");

//in size
const resizeObserver = new ResizeObserver(() => {
  // Get the height of the headerLinksWrap
  const height = headerLinksWrap.offsetHeight;

  if (window.innerWidth < 991) {
    if (height > 0) {
      headerBgWrapNew.style.opacity = "1";
    } else {
      headerBgWrapNew.style.opacity = "";
    }
  }
});

document.addEventListener("mousemove", (event) => {
  const mouseX = event.clientX; // Get the mouse X position
  const windowWidth = window.innerWidth; // Get the width of the window

  // Calculate the percentage of the mouse X position
  const percentageX = mouseX / windowWidth; // This will range from 0 to 1

  // Calculate the mask position based on the mouse X position
  // Scale from -200 to 200 based on percentageX
  const maskPositionX = percentageX * 400 - 200; // Scale to fit the desired range

  // Set the new mask position
  const footerLogo = document.querySelector(".footer-big-logo_secondary");
  footerLogo.style.webkitMaskPosition = `${maskPositionX}% 50%`;
});
