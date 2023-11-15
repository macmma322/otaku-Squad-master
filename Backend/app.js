const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
const parentDir = path.dirname(__dirname);
global.__basedir = parentDir;
console.log(parentDir);

// Session Configuration
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.use(express.static(path.join(__basedir, "otaku-Squad-master")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
app.use(
  cors({
    origin: "http://127.0.0.1:5501",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const routes = require("./routes");
const { connectToDatabase } = require("./db.js");

// Use the routes in your Express app
app.use("/api", routes);

connectToDatabase();

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
