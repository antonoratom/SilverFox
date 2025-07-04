if (window.innerWidth > 991) {
  const triggers = document.querySelectorAll(".five-steps_trigger");
  const steps = document.querySelectorAll(".five-steps_bl");

  triggers.forEach((trigger, index) => {
    const step = steps[index];
    if (!step) return;

    const collapse = step.querySelector(".foundation-tabs_link-cont-collapse");
    const img = step.querySelector(".five-steps_img");
    const textTag = step.querySelector(".text-tag");
    const dotBg = step.querySelector(".tabs-line_dot-bg");
    const dotMain = step.querySelector(".tabs-line_dot-main.for-steps");
    const tlPath = step.querySelector(".five-steps-tl_path");
    const markerValue = '72%';

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: `top ${markerValue}`,
        end: `bottom ${markerValue}`,
        toggleActions: "play none none reverse",
      },
      defaults: {
        ease: "power2.out",
        duration: 0.4,
      },
    });

    if (collapse) tl.from(collapse, { height: 0 }, 0);
    if (img) tl.from(img, { opacity: 0 }, 0);
    if (textTag) tl.from(textTag, { opacity: 0 }, 0);
    if (dotBg) tl.fromTo(dotBg, { scale: 0.15 }, { scale: 1 }, 0);
    if (dotMain)
      tl.fromTo(
        dotMain,
        { scale: 0.55, backgroundColor: "#AAAEB2" },
        { scale: 1, backgroundColor: "#9B2082" },
        0
      );

    // Scrub animation initially disabled
    if (tlPath) {
      const scrubTrigger = ScrollTrigger.create({
        trigger: trigger,
        start: `top ${markerValue}`,
        end: `bottom ${markerValue}`,
        scrub: true,
        // markers: true,
        onUpdate: self => {
          gsap.set(tlPath, { height: `${self.progress * 100}%` });
        },
      });

      scrubTrigger.disable(); // Disable initially

      // Enable scrub after entrance timeline finishes
      tl.eventCallback("onComplete", () => {
        scrubTrigger.enable();
      });

      // Optional: if reversed, disable scrub again
      tl.eventCallback("onReverseComplete", () => {
        scrubTrigger.disable();
      });
    }
  });
}


// Select the trigger and target elements
const logosTrigger = document.querySelector("[for-logos='trigger']");
const logosTarget = document.querySelector("[for-logos='target']");
gsap.fromTo(
  logosTarget,
  { y: "-60vh", scale: 0.7 },
  {
    y: 0,
    scale: 1,
    scrollTrigger: {
      trigger: logosTrigger,
      start: "50% 50%",
      end: "140% 50%",
      scrub: true,
      // markers: true,
    },
  }
);

const splitTextElement = document.querySelector("[for-split-text]");
const splitText = new SplitText(splitTextElement, { type: "words,chars" });
gsap.from(splitText.chars, {
  opacity: 0.1,
  stagger: 0.05,
  scrollTrigger: {
    trigger: logosTrigger,
    start: "90% 50%",
    end: "110% 50%",
    scrub: true,
    // markers: true,
  },
});
