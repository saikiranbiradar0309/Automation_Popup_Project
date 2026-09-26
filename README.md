# 👨‍💻 Techie Profile

A modern and responsive **Techie Profile Web Application** built using **HTML, CSS, and JavaScript**.

The application allows users to enter their personal and professional details and displays the submitted information in a success popup.

It also contains a predefined **test user** for practicing UI automation with tools such as **Selenium** and **Playwright**.

---

## 🚀 Features

* Modern developer/tech-themed UI
* Responsive design
* User profile form
* Name input
* Age input
* Occupation dropdown
* Contact number input
* Email input
* Password input
* Show/Hide password functionality
* Form validation
* Sign In button
* Success popup/modal
* Dynamic display of entered user details
* Predefined test user credentials
* Suitable for Selenium and Playwright automation practice

---

## 📁 Project Structure

```text
techie-profile/
│
├── index.html
│
├── css/
│   └── style.css
│
└── js/
    └── script.js
```

### File Description

| File            | Purpose                                                                |
| --------------- | ---------------------------------------------------------------------- |
| `index.html`    | Contains the application's HTML structure                              |
| `css/style.css` | Contains styling, layout, animations, and responsive design            |
| `js/script.js`  | Contains form validation, popup handling, and JavaScript functionality |

---

# 🛠️ Prerequisites

You don't need any backend server or database to run this application.

You only need:

* A modern web browser
* VS Code or another code editor
* Optional: VS Code **Live Server** extension

Recommended browsers:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox

---

# ▶️ How to Run

## Method 1 — Open Directly in Browser

This is the simplest method.

### Step 1: Download or clone the project

If you have the project in Git:

```bash
git clone <repository-url>
```

Then move into the project directory:

```bash
cd techie-profile
```

### Step 2: Open `index.html`

Open the following file:

```text
techie-profile/index.html
```

You can simply double-click `index.html`.

The application will open in your default browser.

---

# ⭐ Method 2 — Run Using VS Code Live Server

This method is recommended for development and automation practice.

### Step 1: Open the project

Open the `techie-profile` folder in VS Code.

### Step 2: Install Live Server

In VS Code:

```text
Extensions
    ↓
Search "Live Server"
    ↓
Install
```

### Step 3: Start the application

Right-click:

```text
index.html
```

and select:

```text
Open with Live Server
```

The browser will automatically open the application.

You will see a URL similar to:

```text
http://127.0.0.1:5500/index.html
```

or:

```text
http://localhost:5500/index.html
```

---

# 🧪 Test User

The application contains a predefined test user for testing purposes.

```text
Username:
techie@test.com

Password:
Techie@123
```

These credentials are displayed directly on the application because this project is intended for **UI automation practice**.

> ⚠️ Do not use this approach for a real production application. Real passwords should never be exposed in frontend HTML/JavaScript.

---

# 📝 How to Use the Application

### Step 1

Open the application.

### Step 2

Enter your:

```text
Full Name
Age
Occupation
Contact Number
Email
Password
```

### Step 3

Click:

```text
Sign In →
```

### Step 4

The application validates the entered information.

If all fields are valid, a popup will appear:

```text
Welcome, Techie! 🎉

Your profile has been created successfully.
```

The popup displays the entered:

* Name
* Age
* Occupation
* Contact
* Email

---

# 🔐 Password Show/Hide

The password field contains an eye icon:

```text
Password
[ ************ 👁 ]
```

Clicking the eye icon changes the password between:

```text
********
```

and:

```text
Techie@123
```

---

# ✅ Form Validation

The application checks that all fields are filled.

It also validates:

### Age

Age must be between:

```text
18 - 100
```

### Email

The email must contain:

```text
@
```

### Password

The password must contain at least:

```text
6 characters
```

---

# 🧪 Automation Testing

This application can be used to practice **Selenium WebDriver** and **Playwright**.

## Example Playwright Test

```javascript
import { test, expect } from '@playwright/test';

test('Create Techie Profile', async ({ page }) => {

    await page.goto('http://127.0.0.1:5500/index.html');

    await page.locator('#name')
        .fill('Saikiran');

    await page.locator('#age')
        .fill('28');

    await page.locator('#occupation')
        .selectOption('DevOps Engineer');

    await page.locator('#contact')
        .fill('9876543210');

    await page.locator('#email')
        .fill('saikiran@test.com');

    await page.locator('#password')
        .fill('Techie@123');

    await page.locator('.signin-btn')
        .click();

    await expect(
        page.locator('#successModal')
    ).toBeVisible();

});
```

---

# 🔎 Useful Locators

The application provides useful IDs and classes for automation practice.

| Element            | Locator              |
| ------------------ | -------------------- |
| Name               | `#name`              |
| Age                | `#age`               |
| Occupation         | `#occupation`        |
| Contact            | `#contact`           |
| Email              | `#email`             |
| Password           | `#password`          |
| Toggle Password    | `#togglePassword`    |
| Sign In            | `.signin-btn`        |
| Success Modal      | `#successModal`      |
| Close Modal        | `#closeModal`        |
| Continue           | `#doneBtn`           |
| Display Name       | `#displayName`       |
| Display Age        | `#displayAge`        |
| Display Occupation | `#displayOccupation` |
| Display Contact    | `#displayContact`    |
| Display Email      | `#displayEmail`      |

---

# 🧩 Technologies Used

```text
HTML5
CSS3
JavaScript
```

No external framework is required.

No backend is required.

No database is required.

---

# 📱 Responsive Design

The application supports:

* Desktop
* Laptop
* Tablet
* Mobile

The layout automatically changes based on screen size using CSS media queries.

---

# 🔮 Future Improvements

The application can be extended with:

* Backend API
* Database integration
* Real authentication
* JWT authentication
* User registration
* Login page
* Password hashing
* Profile editing
* Profile image upload
* Dashboard
* REST API integration
* Test reports
* Selenium automation framework
* Playwright automation framework
* CI/CD using GitHub Actions

---

# ⚠️ Important Security Note

This is a **frontend demo application**.

The test username and password are intentionally visible in:

```text
index.html
```

and:

```text
script.js
```

Therefore, this application **does not provide real authentication or secure password storage**.

For a production application:

```text
Frontend
    ↓
Backend API
    ↓
Authentication Service
    ↓
Database
```

Passwords should be securely hashed on the backend and should never be stored as plaintext in frontend JavaScript.

---

# 👨‍💻 Author

**Techie Profile Demo**

Built for learning and practicing:

```text
HTML
CSS
JavaScript
Selenium
Playwright
UI Automation Testing
```

---

## 📄 License

This project is intended for educational and automation-testing practice.

