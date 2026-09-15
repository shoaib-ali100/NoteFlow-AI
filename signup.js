// =====================================================
// GET FORM ELEMENTS
// =====================================================

const signupForm = document.getElementById("signupForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const specialty = document.getElementById("specialty");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const terms = document.getElementById("terms");

const googleBtn = document.getElementById("googleBtn");

const successOverlay = document.getElementById("successOverlay");


// =====================================================
// GET ERROR ELEMENTS
// =====================================================

const fullNameError = document.getElementById("fullNameError");
const emailError = document.getElementById("emailError");
const specialtyError = document.getElementById("specialtyError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError =
    document.getElementById("confirmPasswordError");

const termsError = document.getElementById("termsError");


// =====================================================
// PASSWORD SHOW / HIDE
// =====================================================

const passwordToggle =
    document.getElementById("passwordToggle");


passwordToggle.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        passwordToggle.textContent = "Hide";

    } else {

        password.type = "password";

        passwordToggle.textContent = "Show";

    }

});


// =====================================================
// CONFIRM PASSWORD SHOW / HIDE
// =====================================================

const confirmPasswordToggle =
    document.getElementById("confirmPasswordToggle");


confirmPasswordToggle.addEventListener("click", function () {

    if (confirmPassword.type === "password") {

        confirmPassword.type = "text";

        confirmPasswordToggle.textContent = "Hide";

    } else {

        confirmPassword.type = "password";

        confirmPasswordToggle.textContent = "Show";

    }

});


// =====================================================
// CLEAR ALL ERRORS
// =====================================================

function clearErrors() {

    fullNameError.textContent = "";

    emailError.textContent = "";

    specialtyError.textContent = "";

    passwordError.textContent = "";

    confirmPasswordError.textContent = "";

    termsError.textContent = "";


    fullName.classList.remove("input-error");

    email.classList.remove("input-error");

    specialty.classList.remove("input-error");

    password.classList.remove("input-error");

    confirmPassword.classList.remove("input-error");

}


// =====================================================
// FORM SUBMIT
// =====================================================

signupForm.addEventListener("submit", async function (event) {

    // Page reload hone se rokna
    event.preventDefault();


    // Purane errors remove
    clearErrors();


    let isValid = true;


    // =================================================
    // FULL NAME VALIDATION
    // =================================================

    if (fullName.value.trim() === "") {

        fullNameError.textContent =
            "Please enter your full name.";

        fullName.classList.add("input-error");

        isValid = false;

    }


    // =================================================
    // EMAIL VALIDATION
    // =================================================

    if (email.value.trim() === "") {

        emailError.textContent =
            "Please enter your email.";

        email.classList.add("input-error");

        isValid = false;

    } else if (!email.value.includes("@")) {

        emailError.textContent =
            "Please enter a valid email.";

        email.classList.add("input-error");

        isValid = false;

    }


    // =================================================
    // SPECIALTY VALIDATION
    // =================================================

    if (specialty.value === "") {

        specialtyError.textContent =
            "Please select your specialty.";

        specialty.classList.add("input-error");

        isValid = false;

    }


    // =================================================
    // PASSWORD VALIDATION
    // =================================================

    if (password.value.length < 8) {

        passwordError.textContent =
            "Password must be at least 8 characters.";

        password.classList.add("input-error");

        isValid = false;

    }


    // =================================================
    // CONFIRM PASSWORD VALIDATION
    // =================================================

    if (confirmPassword.value === "") {

        confirmPasswordError.textContent =
            "Please confirm your password.";

        confirmPassword.classList.add("input-error");

        isValid = false;

    } else if (password.value !== confirmPassword.value) {

        confirmPasswordError.textContent =
            "Passwords do not match.";

        confirmPassword.classList.add("input-error");

        isValid = false;

    }


    // =================================================
    // TERMS VALIDATION
    // =================================================

    if (!terms.checked) {

        termsError.textContent =
            "Please accept the Terms of Service.";

        isValid = false;

    }


    // =================================================
    // SEND DATA TO NODE.JS
    // =================================================

    if (isValid) {

        // User ka data object
        const userData = {

            fullName: fullName.value.trim(),

            email: email.value.trim(),

            specialty: specialty.value,

            password: password.value

        };


        console.log("Sending data to Node.js...");

        console.log(userData);


        try {

            // Node.js backend ko request
            const response = await fetch(
                "http://127.0.0.1:3000/api/signup",
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(userData)

                }
            );


            // Backend ka response
            const result = await response.json();


            console.log("Backend Response:");

            console.log(result);


            // Agar account successfully create hua
            if (result.success) {

                successOverlay.classList.add("show");

            } else {

                alert(
                    result.message ||
                    "Something went wrong."
                );

            }


        } catch (error) {

            console.log(
                "Backend Error:",
                error
            );


            alert(
                "Could not connect to the Node.js backend. " +
                "Make sure server.js is running."
            );

        }

    }

});


// =====================================================
// GOOGLE BUTTON
// =====================================================

googleBtn.addEventListener("click", function () {

    alert(
        "Google Sign-In will be connected later."
    );

});


// =====================================================
// CLEAR FULL NAME ERROR
// =====================================================

fullName.addEventListener("input", function () {

    fullNameError.textContent = "";

    fullName.classList.remove("input-error");

});


// =====================================================
// CLEAR EMAIL ERROR
// =====================================================

email.addEventListener("input", function () {

    emailError.textContent = "";

    email.classList.remove("input-error");

});


// =====================================================
// CLEAR SPECIALTY ERROR
// =====================================================

specialty.addEventListener("change", function () {

    specialtyError.textContent = "";

    specialty.classList.remove("input-error");

});


// =====================================================
// CLEAR PASSWORD ERROR
// =====================================================

password.addEventListener("input", function () {

    passwordError.textContent = "";

    password.classList.remove("input-error");

});


// =====================================================
// CLEAR CONFIRM PASSWORD ERROR
// =====================================================

confirmPassword.addEventListener("input", function () {

    confirmPasswordError.textContent = "";

    confirmPassword.classList.remove("input-error");

});


// =====================================================
// CLEAR TERMS ERROR
// =====================================================

terms.addEventListener("change", function () {

    termsError.textContent = "";

});


// =====================================================
// PAGE LOADED
// =====================================================

console.log("Signup page loaded successfully.");