//AUTOROTATE TABS
const init = () => {
  // console.log("init function called");

  const ACTIVE_TAB = "w--current";
  let activeIndex = 0;
  let timeout;
  let tween;

  // Select the node that will be observed for mutations
  const tabsComponent = document.querySelector('[wb-data="tabs"]');
  if (!tabsComponent) return;

  const tabsMenu = tabsComponent.querySelector('[wb-data="menu"]');
  if (!tabsMenu) return;

  const loaders = tabsMenu.querySelectorAll(".tabs-line_path-fg");

  // Fix for Safari scrolling to tab on focus
  if (navigator.userAgent.includes("Safari")) {
    let tabLinks = tabsMenu.childNodes;
    tabLinks.forEach((tabLink) => {
      tabLink.focus = function () {
        const x = window.scrollX,
          y = window.scrollY;

        const f = () => {
          setTimeout(() => window.scrollTo(x, y), 1);
          tabLink.removeEventListener("focus", f);
        };

        tabLink.addEventListener("focus", f);
        HTMLElement.prototype.focus.apply(this, arguments);
      };
    });
  }

  const animateLoader = (duration) => {
    // console.log("animateLoader function called with duration:", duration);
    const screenWidth = window.innerWidth;
    if (screenWidth < 280) {
      tween = gsap.fromTo(
        loaders[activeIndex],
        { width: "0%" },
        { width: "100%", duration: duration, ease: "none" }
      );
    } else {
      tween = gsap.fromTo(
        loaders[activeIndex],
        { height: "0%" },
        { height: "100%", duration: duration, ease: "none" }
      );
    }
  };

  const autoPlayTabs = () => {
    // console.log("autoPlayTabs function called");
    clearTimeout(timeout);

    const duration = 6; // Fixed duration for tab rotation
    if (tween) {
      tween.progress(0);
      tween.kill();
    }

    if (loaders.length > 0) {
      animateLoader(duration);
    }

    timeout = setTimeout(() => {
      let nextIndex = (activeIndex + 1) % tabsMenu.childElementCount;
      const nextTab = tabsMenu.childNodes[nextIndex];
      // console.log(`Switching to tab index: ${nextIndex}`); // Log the next tab index being activated
      nextTab.click();
    }, duration * 1000);
  };

  autoPlayTabs();

  // Options for the observer (which mutations to observe)
  const config = {
    attributes: true,
    subtree: true,
    attributeFilter: ["class"],
  };

  // Callback function to execute when mutations are observed
  const mutationCallback = (mutationList, mutationObserver) => {
    // console.log("MutationObserver callback called");
    for (const mutation of mutationList) {
      if (mutation.type === "attributes") {
        const target = mutation.target;
        if (target.classList.contains(ACTIVE_TAB)) {
          activeIndex = parseInt(target.id.slice(-1), 10);
          // console.log({ activeIndex });
          autoPlayTabs();
        }
      }
    }
  };

  // Create an observer instance linked to the callback function
  const mutationObserver = new MutationObserver(mutationCallback);

  // Start observing the target node for configured mutations
  mutationObserver.observe(tabsComponent, config);
};

// Function to observe when the element with attribute [wb-data='tabs'] is in view
let stopExecution = false;
let intersectionObserver = null;

const observeTabRotationWrap = () => {
  // console.log("observeTabRotationWrap function called");

  const tabRotationWrap = document.querySelector("[wb-data='tabs']");
  if (!tabRotationWrap) return;

  intersectionObserver = new IntersectionObserver((entries) => {
    // console.log("IntersectionObserver callback called");

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // console.log("Element is intersecting, calling init");
        init(); // Call init when the element is in view
        intersectionObserver.disconnect(); // Stop observing after init is called
      }
    });
  });

  intersectionObserver.observe(tabRotationWrap);
};

// Call observeTabRotationWrap to start observing
observeTabRotationWrap();

//END OF AUTOROTATE TABS
