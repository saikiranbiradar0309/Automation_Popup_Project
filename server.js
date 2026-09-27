// ==========================================
// AUTOMATION PRACTICE PLATFORM - SERVER
// ==========================================

const express = require("express");
const session = require("express-session");
const multer  = require("multer");
const path    = require("path");
const fs      = require("fs");

const app  = express();
const PORT = 3000;

// ==========================================
// ENSURE UPLOADS DIRECTORY EXISTS
// ==========================================

const uploadDir = path.join(__dirname, "public", "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ==========================================
// MULTER CONFIG FOR FILE UPLOADS
// ==========================================

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: "automation-practice-secret-2024",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));

// ==========================================
// TEST USERS
// ==========================================

const USERS = [
    {
        id: 1,
        username: "testuser",
        email: "testuser@automation.com",
        password: "Test@1234",
        name: "Test User"
    },
    {
        id: 2,
        username: "admin",
        email: "admin@automation.com",
        password: "Admin@123",
        name: "Admin User"
    },
    {
        id: 3,
        username: "practice",
        email: "practice@automation.com",
        password: "Practice@99",
        name: "Practice User"
    }
];

// ==========================================
// AUTH MIDDLEWARE
// ==========================================

function requireAuth(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.redirect("/login.html");
    }
}

// ==========================================
// ROUTES — PUBLIC PAGES
// ==========================================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "signup.html"));
});

// ==========================================
// ROUTES — AUTH API
// ==========================================

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    const user = USERS.find(
        u => (u.username === username || u.email === username) &&
             u.password === password
    );

    if (user) {
        req.session.user = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email
        };
        res.json({ success: true, name: user.name });
    } else {
        res.status(401).json({
            success: false,
            message: "Invalid username or password."
        });
    }
});

app.post("/api/signup", (req, res) => {
    const { name, username, email, password } = req.body;

    const exists = USERS.find(
        u => u.username === username || u.email === email
    );

    if (exists) {
        return res.status(400).json({
            success: false,
            message: "Username or email already exists."
        });
    }

    const newUser = {
        id: USERS.length + 1,
        username,
        email,
        password,
        name
    };
    USERS.push(newUser);

    req.session.user = {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email
    };

    res.json({ success: true, name: newUser.name });
});

app.post("/api/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    });
});

app.get("/api/me", (req, res) => {
    if (req.session && req.session.user) {
        res.json({ success: true, user: req.session.user });
    } else {
        res.status(401).json({ success: false });
    }
});

// ==========================================
// ROUTES — PROTECTED DASHBOARD
// ==========================================

app.get("/dashboard", requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// ==========================================
// FILE UPLOAD API
// ==========================================

app.post("/api/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded."
        });
    }

    res.json({
        success: true,
        filename: req.file.originalname,
        savedAs: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype
    });
});

app.post("/api/submit-form", (req, res) => {
    const data = req.body;
    res.json({
        success: true,
        message: "Form submitted successfully!",
        received: data,
        timestamp: new Date().toISOString()
    });
});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
    console.log("\n🚀 Automation Practice Platform running!");
    console.log("   URL: http://localhost:" + PORT);
    console.log("\n📋 Test Credentials:");
    USERS.forEach(u => {
        console.log("   Username: " + u.username + "  |  Password: " + u.password);
    });
    console.log("");
});
