const emailInput = document.getElementById("email");
const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", () => {
  const userInput = emailInput.value.trim();

  if (userInput) {
    localStorage.setItem("userInput", userInput);

    console.log("Stored Input:", userInput);
    alert(`Welcome! Your input (${userInput}) has been stored.`);
  } else {
    alert("Please enter an email or mobile number.");
  }
});
