// ==============================
// TEST USER
// ==============================

const testUser = {

    username: "techie@test.com",

    password: "Techie@123"

};


// ==============================
// GET HTML ELEMENTS
// ==============================

const form = document.getElementById("profileForm");

const passwordInput =
    document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");

const modal =
    document.getElementById("successModal");

const closeModal =
    document.getElementById("closeModal");

const doneBtn =
    document.getElementById("doneBtn");


// ==============================
// SHOW / HIDE PASSWORD
// ==============================

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


// ==============================
// FORM SUBMISSION
// ==============================

form.addEventListener(
    "submit",
    function (event) {

        // Prevent page refresh
        event.preventDefault();


        // Get values

        const name =
            document.getElementById("name").value.trim();

        const age =
            document.getElementById("age").value.trim();

        const occupation =
            document.getElementById("occupation").value;

        const contact =
            document.getElementById("contact").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;


        // ==============================
        // VALIDATION
        // ==============================

        if (
            name === "" ||
            age === "" ||
            occupation === "" ||
            contact === "" ||
            email === "" ||
            password === ""
        ) {

            alert(
                "Please fill all the fields."
            );

            return;
        }


        // Age validation

        if (age < 18 || age > 100) {

            alert(
                "Please enter a valid age."
            );

            return;
        }


        // Email validation

        if (!email.includes("@")) {

            alert(
                "Please enter a valid email."
            );

            return;
        }


        // Password validation

        if (password.length < 6) {

            alert(
                "Password must contain at least 6 characters."
            );

            return;
        }


        // ==============================
        // DISPLAY USER DETAILS
        // ==============================

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


        // ==============================
        // SHOW POPUP
        // ==============================

        modal.classList.add("active");

    }
);


// ==============================
// CLOSE MODAL
// ==============================

closeModal.addEventListener(
    "click",
    function () {

        modal.classList.remove("active");

    }
);


doneBtn.addEventListener(
    "click",
    function () {

        modal.classList.remove("active");

    }
);


// ==============================
// CLOSE MODAL WHEN CLICKING
// OUTSIDE THE POPUP
// ==============================

modal.addEventListener(
    "click",
    function (event) {

        if (event.target === modal) {

            modal.classList.remove("active");

        }

    }
);
