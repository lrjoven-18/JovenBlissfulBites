// Your mom's Facebook page username (the part after facebook.com/ or m.me/)
// Find it on her page: Edit page info > Username. Example: "jovenblissfulbites"
const FACEBOOK_USERNAME = "YOUR_PAGE_USERNAME";

// Point every Facebook link to the page
document.querySelectorAll(".fb-link").forEach(function (link) {
  link.href = "https://www.facebook.com/" + FACEBOOK_USERNAME;
});

// Footer year (runs on every page)
document.getElementById("year").textContent =
  "\u00a9 " + new Date().getFullYear() + " Joven Blissful Bites";

// The order form only exists on order.html, so check first
const form = document.getElementById("orderForm");
if (form) {
  document.getElementById("date").min = new Date().toISOString().split("T")[0];

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const cake = document.getElementById("cake").value;
    const date = document.getElementById("date").value;
    const note = document.getElementById("note").value;

    let message = `Hi! I'd like to order a ${cake} for ${date}. My name is ${name}.`;
    if (note) {
      message += ` Message on the cake: "${note}".`;
    }

    // Facebook can't prefill a message, so copy it first
    try {
      await navigator.clipboard.writeText(message);
      document.getElementById("copied").hidden = false;
    } catch (e) {
      // If copying is blocked, show the message so they can copy it by hand
      document.getElementById("copied").textContent = message;
      document.getElementById("copied").hidden = false;
    }

    // Then open Messenger with the page
    window.open("https://m.me/" + FACEBOOK_USERNAME, "_blank");
  });
}