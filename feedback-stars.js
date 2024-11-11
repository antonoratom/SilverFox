//FEEDBACK STARS
// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  // Select the container and the feedback stars number element
  const feedbackStarsWrap = document.querySelector(".feedback-stars_wrap");
  const feedbackStarsNumber = document.querySelector(".feedback-stars_number");

  // Check if the necessary elements exist
  if (!feedbackStarsWrap || !feedbackStarsNumber) {
    console.error("Required elements not found.");
    return;
  }

  // Read the initial value from .feedback-stars_number
  const feedbackValue = parseFloat(feedbackStarsNumber.textContent);
  console.log(`Initial value of feedbackStarsNumber: ${feedbackValue}`);

  // Select all feedback stars
  const stars = feedbackStarsWrap.querySelectorAll(".feedback-star");

  // Apply color based on the value in feedbackStarsNumber
  stars.forEach((star, index) => {
    if (
      feedbackValue > 4.5 ||
      (feedbackValue < 4.5 && index < 4 && feedbackValue >= 3.5) ||
      (feedbackValue < 3.5 && index < 3 && feedbackValue >= 2.5) ||
      (feedbackValue < 2.5 && index < 2 && feedbackValue >= 1.5) ||
      (feedbackValue < 1.5 && index < 1)
    ) {
      star.style.color = "#FF3D2E"; // Set color for the applicable stars
    } else {
      star.style.color = ""; // Reset color for stars not meeting the criteria
    }
  });
});
