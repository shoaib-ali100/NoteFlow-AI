// ========================================
// LOGIN
// ========================================

const loginBtn = document.getElementById("loginBtn");


if (loginBtn) {

    loginBtn.addEventListener("click", function () {

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const result =
            document.getElementById("loginResult");


        // Email empty
        if (email === "") {

            result.textContent =
                "Please enter your email.";

            return;
        }


        // Email validation
        if (!email.includes("@")) {

            result.textContent =
                "Please enter a valid email.";

            return;
        }


        // Password empty
        if (password === "") {

            result.textContent =
                "Please enter your password.";

            return;
        }


        // Send login request
        fetch("http://127.0.0.1:3000/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                email: email,

                password: password

            })

        })


        .then(response => response.json())


        .then(data => {

            if (data.success) {

                // Save user name temporarily
                localStorage.setItem(
                    "userName",
                    data.name
                );


                // Go to welcome page
                window.location.href =
                    "welcome.html";

            }

            else {

                result.textContent =
                    data.message;

            }

        })


        .catch(error => {

            console.log("Error:", error);

            result.textContent =
                "Server connection error.";

        });

    });

}



// ========================================
// SIGNUP
// ========================================

const signupBtn = document.getElementById("signupBtn");


if (signupBtn) {

    signupBtn.addEventListener("click", function () {


        const firstName =
            document.getElementById("firstName").value.trim();


        const lastName =
            document.getElementById("lastName").value.trim();


        const phone =
            document.getElementById("phone").value.trim();


        const email =
            document.getElementById("signupEmail").value.trim();


        const password =
            document.getElementById("signupPassword").value;


        const confirmPassword =
            document.getElementById("confirmPassword").value;


        const result =
            document.getElementById("signupResult");



        // First name
        if (firstName === "") {

            result.textContent =
                "Please enter your first name.";

            return;
        }



        // Last name
        if (lastName === "") {

            result.textContent =
                "Please enter your last name.";

            return;
        }



        // Phone
        if (phone === "") {

            result.textContent =
                "Please enter your phone number.";

            return;
        }



        // Phone validation
        if (
            phone.length !== 11 ||
            isNaN(phone)
        ) {

            result.textContent =
                "Phone number must contain 11 digits.";

            return;
        }



        // Email
        if (email === "") {

            result.textContent =
                "Please enter your email.";

            return;
        }



        // Email validation
        if (!email.includes("@")) {

            result.textContent =
                "Please enter a valid email.";

            return;
        }



        // Password
        if (password === "") {

            result.textContent =
                "Please enter a password.";

            return;
        }



        // Password length
        if (password.length < 6) {

            result.textContent =
                "Password must be at least 6 characters.";

            return;
        }



        // Confirm password
        if (confirmPassword === "") {

            result.textContent =
                "Please confirm your password.";

            return;
        }



        // Password match
        if (password !== confirmPassword) {

            result.textContent =
                "Passwords do not match.";

            return;
        }



        // Send data to Node.js
        fetch("http://127.0.0.1:3000/signup", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                firstName: firstName,

                lastName: lastName,

                phone: phone,

                email: email,

                password: password

            })

        })


        .then(response => response.json())


        .then(data => {

            result.textContent =
                data.message;


            // Signup successful
            if (data.success) {

                setTimeout(function () {

                    window.location.href =
                        "index.html";

                }, 1000);

            }

        })


        .catch(error => {

            console.log("Error:", error);

            result.textContent =
                "Server connection error.";

        });

    });

}



// ========================================
// WELCOME PAGE
// ========================================

const welcomeMessage =
    document.getElementById("welcomeMessage");


if (welcomeMessage) {

    const name =
        localStorage.getItem("userName");


    if (name) {

        welcomeMessage.textContent =
            "Welcome " + name + "! You are logged in.";

    }

    else {

        welcomeMessage.textContent =
            "Welcome!";

    }

}



// ========================================
// LOGOUT
// ========================================

const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        localStorage.removeItem("userName");

        window.location.href =
            "index.html";

    });

}



// ========================================
// PAGE CHANGE
// ========================================

function goToSignup() {

    window.location.href =
        "signup.html";

}


function goToLogin() {

    window.location.href =
        "index.html";

}