$("[steps-card-target]").each(function () {
  let stickyBl = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      start: "top 30%",
      end: "300% 30%",
      scrub: true,
      // markers: true,
    },
  });

  stickyBl.to($(this), {
    scale: 0.9,
    // y: "100vh",
    ease: "linear",
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const stepsElements = document.querySelectorAll(".steps-bl");
  const customHeightElements = document.querySelectorAll(".custom-height");
  const totalCustomHeight = Array.from(customHeightElements).reduce(
    (sum, element) => sum + element.clientHeight,
    0
  );

  if (stepsElements.length >= 4) {
    const firstElement = stepsElements[0];
    const secondElement = stepsElements[1];
    const thirdElement = stepsElements[2];
    const fourthElement = stepsElements[3];

    firstElement.style.marginBottom = `${totalCustomHeight * 3}px`;
    secondElement.style.marginTop = `-${totalCustomHeight * 3}px`;

    secondElement.style.marginBottom = `${totalCustomHeight * 2}px`;
    thirdElement.style.marginTop = `-${totalCustomHeight * 2}px`;

    thirdElement.style.marginBottom = `${totalCustomHeight}px`;
    fourthElement.style.marginTop = `-${totalCustomHeight}px`;
  }
});
