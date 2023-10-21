const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const { Client } = require("pg");
const bcrypt = require("bcrypt");

const app = express();
const port = process.env.PORT || 3000;
const parentDir = path.dirname(__dirname);
global.__basedir = parentDir;

// Serve static files from the 'Otaku Squad' folder
app.use(express.static(path.join(__basedir, "Otaku Squad")));

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create a new PostgreSQL client
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "OtakuSquadDatabase",
  password: "postgres",
  port: 5432,
});

// Connect to the database
client.connect((err) => {
  if (err) {
    console.error("Error connecting to the database", err.stack);
  } else {
    console.log("Connected to the database");
  }
});

// Configure session middleware
app.use(
  session({
    secret: "your-strong-secret-key", // Change this to a strong secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // Set the session expiration time (in milliseconds)
    },
  })
);
const isLoggedIn = (req) => {
  // Check if req.session.user is defined and truthy
  return req.session.user ? true : false;
};

// Example usage in a protected route
app.get("/protected-route", (req, res) => {
  if (isLoggedIn(req)) {
    // User is logged in, proceed with protected logic
    res.json({ message: "This is a protected route", user: req.session.user });
  } else {
    // User is not logged in, send an unauthorized response
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Home page route
app.get("/", (req, res) => {
  res.sendFile(path.join(parentDir, "index.html"));
});

// CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5501");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Search API endpoint
app.get("/search", (req, res) => {
  const searchTerm = req.query.search;
  const sql = `
    SELECT * FROM custom_products
    WHERE product_name ILIKE '%${searchTerm}%'
    OR description_bg ILIKE '%${searchTerm}%'
    OR description_en ILIKE '%${searchTerm}%'
    OR description_fr ILIKE '%${searchTerm}%'
    OR description_es ILIKE '%${searchTerm}%'
  `;

  client
    .query(sql)
    .then((results) => {
      res.render("search-results", { results: results.rows });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// Login API
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await getUserByUsernameAndPassword(username, password);

  if (user) {
    req.session.user = user;
    res.status(200).json({ message: "Login successful", user });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Sign up API
app.post("/api/sign-up", async (req, res) => {
  const { username, email, password, fname, lname } = req.body;
  const existingUser = await getUserByUsername(username);

  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await insertUser(
    username,
    email,
    hashedPassword,
    fname,
    lname
  );

  if (newUser) {
    req.session.user = newUser;
    res.status(201).json({ message: "Sign-up successful", user: newUser });
  } else {
    res.status(500).json({ message: "Sign-up failed" });
  }
});

// Logout API
app.get("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

// Protected route
app.get("/protected-route", (req, res) => {
  if (req.session.user) {
    res.json({ message: "This is a protected route", user: req.session.user });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
