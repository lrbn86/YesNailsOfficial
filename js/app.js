/* VARIABLES */
const iphone_button = document.getElementById("iphone_button");
const ipad_button = document.getElementById("ipad_button");

/* Event Listeners */
iphone_button.addEventListener("click", function() {
  window.location.href = "/iphone-page.html";
});

ipad_button.addEventListener("click", function() {
  window.location.href = "/ipad-page.html";
});
