const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const { Client } = require('pg');
const bcrypt = require('bcrypt');

// Set the __dirname value to the parent directory of the current file
const parentDir = path.dirname(__dirname);
global.__basedir = parentDir;

// Serve static files from the 'Otaku Squad' folder
app.use(express.static(path.join(__basedir, 'Otaku Squad')));

app.use(express.json());

// Use body-parser middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create a new PostgreSQL client
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'OtakuSquadDatabase',
  password: 'postgres',
  port: 5432,
});

// Connect to the database
client.connect((err) => {
  if (err) {
    console.error('Error connecting to the database', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 } // Set cookie expiration time
}));

// Route for the home page
app.get('/', (req, res) => {
  res.sendFile(parentDir + '/index.html');
});

// Set headers to allow cross-origin resource sharing (CORS)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5501");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Search API endpoint
app.get('/search', (req, res) => {
  const searchTerm = req.query.search;
  const sql = `SELECT * FROM custom_products WHERE product_name ILIKE '%${searchTerm}%' OR description_bg ILIKE '%${searchTerm}%' OR description_en ILIKE '%${searchTerm}%' OR description_fr ILIKE '%${searchTerm}%' OR description_es ILIKE '%${searchTerm}%'`;

  client.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.render('search-results', { results: results.rows });
    }
  });
});

//Login API
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await getUserByUsernameAndPassword(username, password);

  if (user) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

async function getUserByUsernameAndPassword(username, password) {
  const query = 'SELECT * FROM custom_user WHERE username = $1 AND password = $2';
  const values = [username, password];
  const result = await client.query(query, values);
  return result.rows[0];
}

// Sign up API
app.post('/api/sign-up', (req, res) => {
  const { username, email, password, fname, lname} = req.body;
  insertUser(username, email, password, fname, lname);
});

async function insertUser(username, email, password, first_name, last_name) {
  const query = 'INSERT INTO custom_user (username, password, email, first_name, last_name) VALUES ($1, $2, $3, $4, $5)';
  const values = [username, email, password, first_name, last_name];
  await client.query(query, values);
  console.log('User inserted successfully');
}

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  process.chdir('e:/Otaku Squad');
  console.log('__basedirs:', parentDir);
});
