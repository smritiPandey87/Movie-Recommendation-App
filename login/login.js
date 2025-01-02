document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("login-button");
  const emailInput = document.getElementById("email");

  loginButton.addEventListener("click", () => {
    const email = emailInput.value.trim();

    if (!email || !validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loggedInUser", email);

    // Redirect to main page
    alert("Login successful!");
    window.location.href = "../index.html";
  });

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
