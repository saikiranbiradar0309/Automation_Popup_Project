# 🤖 AutomationLab — Selenium & Playwright Practice Platform

A full-stack interactive web application built specifically for practising **Selenium WebDriver** and **Playwright** automation testing. It covers all the real-world UI patterns that automation engineers encounter daily.

---

## ✨ What's Inside

| Module | Scenarios Covered |
|--------|-------------------|
| 💬 **Popups & Alerts** | Browser alert, confirm, prompt; custom success/error/timed/nested modals |
| 📅 **Calendar** | HTML date input, custom JS calendar (month/year navigation), date range picker |
| ☑️ **Checkboxes** | Individual, group, select-all with indeterminate state |
| 📝 **Input & Radio** | Text, number, email, password, URL, tel, range, color, search, textarea, readonly, disabled, radio groups |
| 🔽 **Dropdowns** | HTML select, multi-select, custom searchable dropdown, chained (Country → State → City) |
| 🪟 **Frames** | Single iframe, nested iframes (outer → inner), dynamically loaded iframe |
| 📤 **File Upload** | Single file upload, multiple files, drag-and-drop zone — real `POST /api/upload` |

---

## 🏗 Tech Stack

```text
Backend   : Node.js v24 + Express.js
Auth      : express-session (cookie-based sessions)
Upload    : Multer (multipart/form-data)
Frontend  : HTML5 + Vanilla CSS + Vanilla JavaScript
Fonts     : Google Fonts (Inter, JetBrains Mono)
```

---

## 📁 Project Structure

```text
Automation_Popup_Project/
│
├── server.js                   ← Node.js Express server (entry point)
├── package.json
│
├── public/                     ← Static files served by Express
│   ├── index.html              ← Home / Landing page
│   ├── login.html              ← Login page (with test credentials)
│   ├── signup.html             ← Sign-up page
│   ├── dashboard.html          ← Protected practice dashboard
│   │
│   ├── css/
│   │   └── global.css          ← Design system, tokens, components
│   │
│   ├── js/
│   │   ├── toast.js            ← Toast notification utility
│   │   └── dashboard.js        ← All dashboard & module logic
│   │
│   └── uploads/                ← Uploaded files saved here
│
├── css/                        ← Legacy (original project CSS)
│   └── style.css
└── js/                         ← Legacy (original project JS)
    └── script.js
```

---

## 🛠 Prerequisites

| Requirement | Version |
|-------------|---------|
| **Node.js** | v18 or higher (v24 recommended) |
| **npm** | v8 or higher |
| A modern browser | Chrome, Firefox, Edge, Safari |

> Check your versions:
> ```bash
> node --version
> npm --version
> ```

---

## ▶️ How to Run

### Step 1 — Clone the repository

```bash
git clone https://github.com/saikiranbiradar0309/Automation_Popup_Project.git
cd Automation_Popup_Project
```

### Step 2 — Install dependencies

```bash
npm install
```

This installs:
- `express` — HTTP server framework
- `express-session` — cookie-based session management
- `multer` — file upload middleware

### Step 3 — Start the server

```bash
npm start
```

or directly:

```bash
node server.js
```

### Step 4 — Open in browser

```
http://localhost:3000
```

You should see the AutomationLab home page.

---

## 📄 Pages & Routes

| URL | Page | Auth Required |
|-----|------|:---:|
| `http://localhost:3000/` | 🏠 Home page | ❌ |
| `http://localhost:3000/login` | 🔐 Login | ❌ |
| `http://localhost:3000/signup` | 📝 Sign Up | ❌ |
| `http://localhost:3000/dashboard` | 🧭 Practice Dashboard | ✅ |

> The dashboard redirects to `/login` if you are not logged in.

---

## 🔑 Test Credentials

Three pre-built test accounts are available. They are displayed directly on the login page for easy copy-paste or automation.

| Username | Password | Name |
|----------|----------|------|
| `testuser` | `Test@1234` | Test User |
| `admin` | `Admin@123` | Admin User |
| `practice` | `Practice@99` | Practice User |

You can also sign up to create a new account (stored in-memory for the session).

---

## 🔌 REST API Endpoints

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| `POST` | `/api/login` | `{ username, password }` | Authenticate and create session |
| `POST` | `/api/signup` | `{ name, username, email, password }` | Register new user |
| `GET` | `/api/me` | — | Get current logged-in user |
| `POST` | `/api/logout` | — | Destroy session |
| `POST` | `/api/upload` | `multipart/form-data` (field: `file`) | Upload a file (max 5 MB) |
| `POST` | `/api/submit-form` | Any JSON body | Echo form data back as JSON |

---

## 🧪 Automation Testing Examples

### Selenium (Python)

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("http://localhost:3000/login")

# Fill credentials
driver.find_element(By.ID, "loginUsername").send_keys("testuser")
driver.find_element(By.ID, "loginPassword").send_keys("Test@1234")
driver.find_element(By.ID, "loginBtn").click()

# Wait for dashboard
WebDriverWait(driver, 10).until(EC.url_contains("/dashboard"))

# Navigate to Dropdowns module via sidebar
driver.find_element(By.CSS_SELECTOR, '[data-testid="sidebar-dropdown"]').click()

# Use the standard select
select = Select(driver.find_element(By.ID, "selCountry"))
select.select_by_visible_text("🇮🇳 India")
```

### Selenium (Java)

```java
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;

WebDriver driver = new ChromeDriver();
driver.get("http://localhost:3000/login");

driver.findElement(By.id("loginUsername")).sendKeys("testuser");
driver.findElement(By.id("loginPassword")).sendKeys("Test@1234");
driver.findElement(By.id("loginBtn")).click();

WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.urlContains("/dashboard"));

// Click Calendar in sidebar
driver.findElement(By.cssSelector("[data-testid='sidebar-calendar']")).click();

// Set date
driver.findElement(By.id("dateInput")).sendKeys("2025-12-25");
driver.findElement(By.id("submitDate")).click();
```

### Playwright (Python)

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()

    # Login
    page.goto("http://localhost:3000/login")
    page.get_by_test_id("login-username").fill("testuser")
    page.get_by_test_id("login-password").fill("Test@1234")
    page.get_by_test_id("login-submit").click()
    page.wait_for_url("**/dashboard**")

    # Open Popups module
    page.get_by_test_id("sidebar-popups").click()

    # Trigger browser alert and accept it
    page.on("dialog", lambda dialog: dialog.accept())
    page.get_by_test_id("btn-alert").click()

    # Open success modal and close it
    page.get_by_test_id("btn-success-modal").click()
    page.wait_for_selector('[data-testid="success-modal"]', state="visible")
    page.get_by_test_id("confirm-success").click()

    browser.close()
```

### Playwright (TypeScript)

```typescript
import { test, expect } from '@playwright/test';

test('login and navigate to frames module', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.getByTestId('login-username').fill('testuser');
    await page.getByTestId('login-password').fill('Test@1234');
    await page.getByTestId('login-submit').click();

    await expect(page).toHaveURL(/dashboard/);

    // Navigate to Frames
    await page.getByTestId('sidebar-frames').click();

    // Switch to iframe and interact
    const frame = page.frameLocator('#single-frame');
    await frame.locator('#frame-input').fill('Hello from inside the frame!');
});
```

---

## 🔎 Key Element Locators (`data-testid`)

### Login Page
| Element | `data-testid` | `id` |
|---------|--------------|------|
| Username input | `login-username` | `loginUsername` |
| Password input | `login-password` | `loginPassword` |
| Login button | `login-submit` | `loginBtn` |

### Dashboard Sidebar
| Module | `data-testid` |
|--------|--------------|
| Home | `sidebar-home` |
| Popups | `sidebar-popups` |
| Calendar | `sidebar-calendar` |
| Checkboxes | `sidebar-checkboxes` |
| Inputs & Radio | `sidebar-inputs` |
| Dropdowns | `sidebar-dropdown` |
| Frames | `sidebar-frames` |
| File Upload | `sidebar-upload` |

### Popups Module
| Element | `data-testid` |
|---------|--------------|
| Alert button | `btn-alert` |
| Confirm button | `btn-confirm` |
| Prompt button | `btn-prompt` |
| Success modal trigger | `btn-success-modal` |
| Error modal trigger | `btn-error-modal` |
| Timed popup trigger | `btn-timed-modal` |
| Nested popup trigger | `btn-nested-modal` |
| Success modal overlay | `success-modal` |
| Close success modal | `close-success-modal` |
| Confirm button (inside modal) | `confirm-success` |

### Calendar Module
| Element | `data-testid` |
|---------|--------------|
| HTML date input | `date-input` |
| HTML datetime input | `datetime-input` |
| Submit date button | `submit-date` |
| Custom calendar | `custom-calendar` |
| Previous month | `cal-prev` |
| Next month | `cal-next` |
| Month/year label | `cal-month-year` |
| Day cell (N=day number) | `cal-day-N` |
| Selected date display | `cal-selected-date` |
| Check-in date | `checkin-date` |
| Check-out date | `checkout-date` |

### Dropdowns Module
| Element | `data-testid` |
|---------|--------------|
| Country select | `sel-country` |
| Role select | `sel-role` |
| Multi-select | `multi-select` |
| Custom dropdown trigger | `custom-dropdown-trigger` |
| Custom dropdown search | `custom-dropdown-search` |
| Option (e.g. Python) | `opt-python` |
| Chained country | `dep-country` |
| Chained state | `dep-state` |
| Chained city | `dep-city` |

### Frames Module
| Element | `data-testid` / `id` / `name` |
|---------|-------------------------------|
| Single iframe | `id="single-frame"` / `name="singleFrame"` |
| Outer nested iframe | `id="outer-frame"` / `name="outerFrame"` |
| Inner nested iframe | `id="inner-frame"` / `name="innerFrame"` |
| Dynamic iframe (after load) | `id="dynamic-frame"` |
| Load dynamic frame button | `btn-load-dynamic-frame` |

### File Upload Module
| Element | `data-testid` |
|---------|--------------|
| Single file input | `single-file-input` |
| Upload single button | `btn-upload-single` |
| Multiple file input | `multi-file-input` |
| Upload multiple button | `btn-upload-multiple` |
| Drag & drop zone | `dropzone` |

---

## 🧩 Technologies Used

```text
Node.js         ← JavaScript runtime
Express.js      ← HTTP server & routing
express-session ← Session-based authentication
Multer          ← File upload handling
HTML5           ← Page structure & semantic elements
Vanilla CSS     ← Design system, glassmorphism, animations
Vanilla JS      ← All UI logic — no frameworks
Google Fonts    ← Inter & JetBrains Mono
```

---

## 📱 Responsive Design

The application supports:
- 🖥 Desktop (1200px+)
- 💻 Laptop (1024px)
- 📱 Mobile / Tablet

---

## ⚠️ Security Note

This is a **practice/educational application**. Credentials are intentionally visible on the login page to make automation practice easier.

> Do **not** use this architecture in a production application. In production, passwords must be hashed (e.g. bcrypt) and stored in a database.

---

## 👨‍💻 Author

**Sai Kiran Biradar**

Built for learning and practising:
```
Selenium WebDriver (Python, Java, C#, JS)
Playwright (Python, TypeScript)
UI Automation Testing
REST API Testing
Node.js + Express
```

---

## 📄 License

This project is intended for educational and automation-testing practice purposes only.
