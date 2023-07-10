window.onload = function () {
  var cookieBanner = document.getElementById("cookie-banner");
  var acceptButton = document.getElementById("cookie-accept");
  var rejectButton = document.getElementById("cookie-reject");

  let cookie = document.cookie;

  if (cookie.includes("cookie_consent=accepted")) {
    cookieBanner.style.display = "none";
    // Allow cookies from Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "G-C4C85HY834");
  } else if (cookie.includes("cookie_consent=rejected")) {
    cookieBanner.style.display = "none";
  } else {
    cookieBanner.style.display = "block";
  }

  acceptButton.addEventListener("click", function () {
    // Set cookie consent to accepted and hide banner

    cookieBanner.style.display = "none";

    // Set cookie to expire in 1 year
    var expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    document.cookie =
      "cookie_consent=accepted; expires=" +
      expiryDate.toUTCString() +
      "; path=/; SameSite=None; Secure";
  });

  rejectButton.addEventListener("click", function () {
    // Set cookie consent to rejected and hide banner

    document.cookie = "cookie_consent=rejected; path=/; SameSite=None; Secure";
    cookieBanner.style.display = "none";
  });
};
