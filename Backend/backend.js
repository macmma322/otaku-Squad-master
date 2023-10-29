const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const { Client } = require("pg");
const bcrypt = require("bcrypt");
const cors = require("cors"); // Import the cors package

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

// Configure CORS
app.use(
  cors({
    origin: "http://127.0.0.1:5501", // Update with the actual origin of your front-end
    methods: ["GET", "POST"],
    credentials: true, // Enable passing cookies and session information
  }));

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

// User authentication functions
async function getUserByUsernameAndPassword(username, password) {
  // Replace with code to fetch user data from the database by username
  // and then verify the password using bcrypt
  // Example:
  const sql = "SELECT * FROM users WHERE username = $1";
  const { rows } = await client.query(sql, [username]);

  if (rows.length === 0) {
    return null;
  }

  const user = rows[0];
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    return user;
  }

  return null;
}

async function getUserByUsername(username) {
  // Replace with code to fetch user data from the database by username
  // Example:
  const sql = "SELECT * FROM custom_user WHERE username = $1";
  const { rows } = await client.query(sql, [username]);

  if (rows.length === 0) {
    return null;
  }

  return rows[0];
}

async function insertUser(username, hashedPassword, email, fname, lname) {
  try {
    // Define the SQL query to insert a new user into the database
    const sql = `
      INSERT INTO custom_user (username, password, email, first_name, last_name)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    
    // Define an array of parameter values for the SQL query
    const values = [username, hashedPassword, email, fname, lname];

    // Execute the SQL query using the database client (e.g., PostgreSQL client)
    const { rows } = await client.query(sql, values);

    // Check if any rows were returned (successful insertion)
    if (rows.length === 0) {
      return null;
    }

    // Return the inserted user data
    return rows[0];
  } catch (error) {
    // Handle any database-related errors
    console.error("Error inserting user into the database:", error);
    throw error; // Re-throw the error to be handled in the calling function
  }
}



// Login API
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  // Fetch user from the database using the username
  const user = await getUserByUsername(username);

  if (user) {
    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Create a session by storing user information in req.session
      req.session.user = user;
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});


// Sign up API
app.post("/api/sign-up", async (req, res) => {
  try {
    const { username, password, email, fname, lname } = req.body;

    // Check if a user with the provided username already exists
    const existingUser = await getUserByUsername(username);

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the user's password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = await insertUser(username, hashedPassword, email, fname, lname);

    if (newUser) {
      // Create a session by storing user information in req.session
      req.session.user = newUser;
      return res.status(201).json({ message: "Sign-up successful", user: newUser });
    } else {
      return res.status(500).json({ message: "Sign-up failed" });
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error in user registration:", error);
    return res.status(500).json({ message: "Internal Server Error" });
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
