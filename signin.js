// ==========================================
// SIGN IN JAVASCRIPT
// ==========================================


// ==========================================
// GET FORM ELEMENTS
// ==========================================

const signinForm = document.getElementById("signinForm");

const email = document.getElementById("email");
const password = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const passwordToggle = document.getElementById("passwordToggle");

const googleBtn = document.getElementById("googleBtn");

const loginSuccess = document.getElementById("loginSuccess");


// ==========================================
// SHOW / HIDE PASSWORD
// ==========================================

passwordToggle.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        passwordToggle.textContent = "Hide";

    } else {

        password.type = "password";

        passwordToggle.textContent = "Show";

    }

});


// ==========================================
// CLEAR ERRORS
// ==========================================

function clearErrors() {

    emailError.textContent = "";

    passwordError.textContent = "";

}


// ==========================================
// SIGN IN FORM
// ==========================================

signinForm.addEventListener("submit", async function (event) {

    // Stop page refresh
    event.preventDefault();

    // Clear previous errors
    clearErrors();


    // ==========================================
    // GET USER INPUT
    // ==========================================

    const emailValue = email.value.trim();

    const passwordValue = password.value;


    let isValid = true;


    // ==========================================
    // EMAIL VALIDATION
    // ==========================================

    if (emailValue === "") {

        emailError.textContent =
            "Please enter your email.";

        isValid = false;

    } else if (!emailValue.includes("@")) {

        emailError.textContent =
            "Please enter a valid email.";

        isValid = false;

    }


    // ==========================================
    // PASSWORD VALIDATION
    // ==========================================

    if (passwordValue === "") {

        passwordError.textContent =
            "Please enter your password.";

        isValid = false;

    }


    // Stop if validation failed
    if (!isValid) {

        return;

    }


    // ==========================================
    // SEND LOGIN REQUEST TO NODE.JS
    // ==========================================

    try {

        const response = await fetch(
            "http://127.0.0.1:3000/api/login",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    email: emailValue,

                    password: passwordValue

                })

            }
        );


        // ==========================================
        // GET SERVER RESPONSE
        // ==========================================

        const result = await response.json();


        // ==========================================
        // LOGIN SUCCESS
        // ==========================================

        if (result.success) {


            // Save logged-in user information
            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(result.user)
            );


            // Show success message
            loginSuccess.classList.add("show");


            // ==========================================
            // OPEN DASHBOARD AFTER SHORT DELAY
            // ==========================================

            setTimeout(function () {

                window.location.href = "dashboard.html";

            }, 1000);


        } else {


            // ==========================================
            // LOGIN FAILED
            // ==========================================

            emailError.textContent =
                result.message ||
                "Invalid email or password.";

        }


    } catch (error) {


        // ==========================================
        // SERVER CONNECTION ERROR
        // ==========================================

        console.error("Login error:", error);


        emailError.textContent =
            "Unable to connect to the server. Make sure Node.js is running.";

    }

});


// ==========================================
// GOOGLE SIGN IN
// ==========================================

googleBtn.addEventListener("click", function () {

    alert(
        "Google Sign-In needs Google OAuth configuration. We will connect it separately."
    );

});


// ==========================================
// CLEAR EMAIL ERROR
// ==========================================

email.addEventListener("input", function () {

    emailError.textContent = "";

});


// ==========================================
// CLEAR PASSWORD ERROR
// ==========================================

password.addEventListener("input", function () {

    passwordError.textContent = "";

});


// ==========================================
// PAGE LOADED
// ==========================================

console.log("NoteFlow AI Sign In page loaded.");