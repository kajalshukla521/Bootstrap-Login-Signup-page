//forgot password

// Function to handle form submission
function handleFormSubmit(event) {
    // Prevent form submission
    event.preventDefault();
  
    const emailPhone = document.getElementById("emailPhone").value.trim();
    const responseMessage = document.getElementById("responseMessage");
    const submitButtonContainer = document.getElementById("submitButtonContainer");
    const otpButtonContainer = document.getElementById("otpButtonContainer");
  
    // Regular expression for validating email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Regular expression for validating phone number (10 digits)
    const phonePattern = /^[0-9]{10}$/;
  
    if (emailPattern.test(emailPhone)) {
        // If the input matches the email pattern
        responseMessage.innerHTML = `<p class="text-success">OTP has been sent to ${emailPhone}.</p>`;
        
        // Hide the submit button and show the "OTP Send" button
        submitButtonContainer.style.display = "none";
        otpButtonContainer.style.display = "block";
    } else if (phonePattern.test(emailPhone)) {
        // If the input matches the phone pattern
        responseMessage.innerHTML = `<p class="text-success">A call or SMS has been sent to ${emailPhone}.</p>`;
        
        // Hide the submit button and show the "OTP Send" button
        submitButtonContainer.style.display = "none";
        otpButtonContainer.style.display = "block";
    } else {
        // If the input is invalid
        responseMessage.innerHTML = '<p class="text-danger">Please enter a valid email or phone number.</p>';
        
        // Keep the "Submit" button visible and hide the "OTP Send" button
        submitButtonContainer.style.display = "block";
        otpButtonContainer.style.display = "none";
    }
  }
  
  // Function to  sending the OTP
  function sendOtp() {
    alert("OTP has been sent! Please check your phone or email.");
  }