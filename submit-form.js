$(document).ready(function () {
  $("[send-trigger]").on("click", function () {
    $("[send-target]").click();
  });

  $("[send-target]").on("click", function () {
    // alert("Target clicked!");
  });
});
