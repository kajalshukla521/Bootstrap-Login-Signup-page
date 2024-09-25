document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("loginForm")) {
        // Logic for login page
        const emailPhoneInput = document.getElementById("emailPhone");
        const passwordInput = document.getElementById("password");
        const sendOtpButton = document.getElementById("sendOtpButton");
        const emailPhoneError = document.getElementById("emailPhoneError");
        const passwordError = document.getElementById("passwordError");

        // Function to validate email or phone input
        const validateInput = (value) => {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phonePattern = /^[0-9]{10}$/;
            return emailPattern.test(value) || phonePattern.test(value);
        };

        // Function to generate a random 4-digit OTP
        const generateRandomOtp = () => {
            return Math.floor(1000 + Math.random() * 9000).toString();
        };

        // Event listener for the "Send OTP" button
        sendOtpButton.addEventListener("click", () => {
            const emailPhoneValue = emailPhoneInput.value.trim();

            if (!validateInput(emailPhoneValue)) {
                emailPhoneError.textContent = "Please enter a valid email or phone number.";
                return;
            } else {
                emailPhoneError.textContent = "";
            }

            if (!passwordInput.value) {
                passwordError.textContent = "Password is required.";
                return;
            } else {
                passwordError.textContent = "";
            }

            // Generate and store OTP in localStorage (simulating sending it to user)
            const generatedOtp = generateRandomOtp();
            alert(`OTP has been sent to ${emailPhoneValue}. (For testing: ${generatedOtp})`);
            localStorage.setItem("generatedOtp", generatedOtp);

            // Redirect to OTP verification page
            window.location.href = "otp.html";
        });
    } else if (document.getElementById("otpForm")) {  
        // Logic for OTP verification page
        const otpInputs = document.querySelectorAll(".otp-input");
        const verifyOtpButton = document.getElementById("verifyOtpButton");
        const otpError = document.getElementById("otpError");

        otpInputs.forEach((input, index) => {
            input.addEventListener("input", (event) => {
                if (input.value.length === 1) {
                    // If a digit is entered, move to the next input
                    if (index < otpInputs.length - 1) {
                        otpInputs[index + 1].focus();
                    }
                }
            });

            input.addEventListener("keydown", (event) => {
                if (event.key === "Backspace" && input.value === "") {
                    // If backspace is pressed and the input is empty, move to the previous input
                    if (index > 0) {
                        otpInputs[index - 1].focus();
                    }
                }
            });
        });

        // Event listener for the "Verify OTP" button
        verifyOtpButton.addEventListener("click", () => {
            const enteredOtp = Array.from(otpInputs).map((input) => input.value).join("");
            const generatedOtp = localStorage.getItem("generatedOtp");

            if (enteredOtp !== generatedOtp) {
                otpError.textContent = "Invalid OTP. Please try again.";
            } else {
                otpError.textContent = "";
                alert("Logged in successfully!");

                // Clear OTP from localStorage
                localStorage.removeItem("generatedOtp");

                // Reset the form or redirect to another page if needed
                window.location.href = "index.html"; // Redirect to the login page or another page
            }
        });
    }
});


//forgot password

document.getElementById('forgotPasswordForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const emailPhone = document.getElementById('emailPhone').value;
    const responseMessage = document.getElementById('responseMessage');

    // Simulate the process of sending a call or SMS
    if (emailPhone) {
        responseMessage.innerHTML = `<p class="text-success">A call or SMS has been sent to ${emailPhone}.</p>`;
    } else {
        responseMessage.innerHTML = '<p class="text-danger">Please enter a valid email or phone number.</p>';
    }
});
