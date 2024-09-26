// Function to validate input for email or phone number
function validateInput(value) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9]{10}$/;
  return emailPattern.test(value) || phonePattern.test(value);
}

// Function to generate a random 4-digit OTP
function generateRandomOtp() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Clear error messages
function clearError(elementId) {
  document.getElementById(elementId).textContent = "";
}

// Function to handle OTP sending
function sendOtp() {
  const emailPhoneInput = document.getElementById("emailPhone");
  const passwordInput = document.getElementById("password");
  const emailPhoneError = document.getElementById("emailPhoneError");
  const passwordError = document.getElementById("passwordError");

  const emailPhoneValue = emailPhoneInput.value.trim();

  // Clear previous error messages
  clearError("emailPhoneError");
  clearError("passwordError");

  // Validate email/phone and password
  if (!validateInput(emailPhoneValue)) {
      emailPhoneError.textContent = "Please enter a valid email or phone number.";
      return;
  }

  if (!passwordInput.value) {
      passwordError.textContent = "Password is required.";
      return;
  }

  // Generate and store OTP in localStorage 
  const generatedOtp = generateRandomOtp();
  localStorage.setItem("generatedOtp", generatedOtp);

  // Alert the user that OTP is sent
  alert(`OTP has been sent to ${emailPhoneValue}. (For testing: ${generatedOtp})`);

  // Redirect to OTP verification page
  window.location.href = "otp.html"; 
}

// Function to handle OTP verification
function verifyOtp() {
  const otpInputs = document.querySelectorAll(".otp-input");
  const otpError = document.getElementById("otpError");

  const enteredOtp = Array.from(otpInputs).map((input) => input.value).join("");
  const generatedOtp = localStorage.getItem("generatedOtp");

  if (enteredOtp !== generatedOtp) {
      otpError.textContent = "Invalid OTP. Please try again.";
  } else {
      otpError.textContent = "";
      alert("Logged in successfully!");

      // Clear OTP from localStorage
      localStorage.removeItem("generatedOtp");

      // Redirect to the login page
      window.location.href = "index.html"; 
  }
}

// Move to next input in OTP verification
function moveToNextInput(currentInput, index) {
  if (currentInput.value.length === 1 && index < 3) {
      document.querySelectorAll(".otp-input")[index + 1].focus();
  }
}

// Move to previous input when pressing Backspace
function moveToPrevInput(event, currentInput, index) {
  if (event.key === "Backspace" && currentInput.value === "" && index > 0) {
      document.querySelectorAll(".otp-input")[index - 1].focus();
  }
}



