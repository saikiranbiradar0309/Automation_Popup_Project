// ==========================================
// TEST USER
// ==========================================

const testUser = {
    username: "techie@test.com",
    password: "Techie@123"
};


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const form = document.getElementById("profileForm");

const passwordInput =
    document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");


// ==========================================
// SUCCESS MODAL ELEMENTS
// ==========================================

const successModal =
    document.getElementById("successModal");

const closeModal =
    document.getElementById("closeModal");

const doneBtn =
    document.getElementById("doneBtn");


// ==========================================
// ERROR MODAL ELEMENTS
// ==========================================

const errorModal =
    document.getElementById("errorModal");

const closeErrorModal =
    document.getElementById("closeErrorModal");

const errorDoneBtn =
    document.getElementById("errorDoneBtn");

const errorMessage =
    document.getElementById("errorMessage");


// ==========================================
// SHOW / HIDE PASSWORD
// ==========================================

togglePassword.addEventListener(
    "click",
    function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.textContent = "🙈";

        } else {

            passwordInput.type = "password";

            togglePassword.textContent = "👁";

        }

    }
);


// ==========================================
// SHOW ERROR POPUP
// ==========================================

function showError(message) {

    errorMessage.textContent = message;

    errorModal.classList.add("active");

}


// ==========================================
// CLOSE ERROR POPUP
// ==========================================

function closeError() {

    errorModal.classList.remove("active");

}


closeErrorModal.addEventListener(
    "click",
    closeError
);


errorDoneBtn.addEventListener(
    "click",
    closeError
);


// ==========================================
// FORM SUBMISSION
// ==========================================

form.addEventListener(
    "submit",
    function (event) {

        // Prevent browser refresh

        event.preventDefault();


        // ======================================
        // GET USER INPUT
        // ======================================

        const name =
            document.getElementById("name")
                .value
                .trim();

        const age =
            document.getElementById("age")
                .value
                .trim();

        const occupation =
            document.getElementById("occupation")
                .value;

        const contact =
            document.getElementById("contact")
                .value
                .trim();

        const email =
            document.getElementById("email")
                .value
                .trim();

        const password =
            document.getElementById("password")
                .value;


        // ======================================
        // REQUIRED FIELD VALIDATION
        // ======================================

        if (
            name === "" ||
            age === "" ||
            occupation === "" ||
            contact === "" ||
            email === "" ||
            password === ""
        ) {

            showError(
                "Please fill all the fields."
            );

            return;
        }


        // ======================================
        // AGE VALIDATION
        // ======================================

        if (age < 18 || age > 100) {

            showError(
                "Please enter a valid age between 18 and 100."
            );

            return;
        }


        // ======================================
        // EMAIL VALIDATION
        // ======================================

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            showError(
                "Please enter a valid email address."
            );

            return;
        }


        // ======================================
        // PASSWORD VALIDATION
        // ======================================

        if (password.length < 6) {

            showError(
                "Password must contain at least 6 characters."
            );

            return;
        }


        // ==========================================
        // RANDOM / INTERMITTENT ERROR
        // ==========================================

        /*
         * IMPORTANT:
         *
         * There is NO name validation here.
         *
         * The user can enter ANY name:
         *
         * sai
         * kiran
         * niru
         * rahul
         * john
         * alice
         * Suresh Kumar
         * xyz
         *
         * All names are accepted.
         *
         * The application randomly generates
         * an unexpected validation error.
         *
         * Approximately:
         *
         * 20%  -> Error popup
         * 80%  -> Success popup
         */


        const randomNumber = Math.random();


        if (randomNumber < 0.20) {

            showError(
                "Full Name must start with capital letters."
            );

            return;
        }


        // ======================================
        // DISPLAY USER DETAILS
        // ======================================

        document.getElementById(
            "displayName"
        ).textContent = name;


        document.getElementById(
            "displayAge"
        ).textContent = age;


        document.getElementById(
            "displayOccupation"
        ).textContent = occupation;


        document.getElementById(
            "displayContact"
        ).textContent = contact;


        document.getElementById(
            "displayEmail"
        ).textContent = email;


        // ======================================
        // SHOW SUCCESS POPUP
        // ======================================

        successModal.classList.add(
            "active"
        );

    }
);


// ==========================================
// CLOSE SUCCESS MODAL
// ==========================================

closeModal.addEventListener(
    "click",
    function () {

        successModal.classList.remove(
            "active"
        );

    }
);


doneBtn.addEventListener(
    "click",
    function () {

        successModal.classList.remove(
            "active"
        );

    }
);


// ==========================================
// CLOSE SUCCESS MODAL
// WHEN CLICKING OUTSIDE
// ==========================================

successModal.addEventListener(
    "click",
    function (event) {

        if (event.target === successModal) {

            successModal.classList.remove(
                "active"
            );

        }

    }
);


// ==========================================
// CLOSE ERROR MODAL
// WHEN CLICKING OUTSIDE
// ==========================================

errorModal.addEventListener(
    "click",
    function (event) {

        if (event.target === errorModal) {

            closeError();

        }

    }
);