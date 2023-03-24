const express = require('express');
const app = express();
app.use(express.json());
const bodyParser = require('body-parser');
const { Client } = require('pg');


// Use body-parser middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the 'Otaku Squad' folder
app.use(express.static('Otaku Squad'));


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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5501");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Example route that returns a JSON response
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
  ];
  res.json(users);
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
});






































// // Define an API endpoint to get all products
// app.get('/api/products', (req, res) => {
//   client.query('SELECT * FROM products', (err, result) => {
//     if (err) {
//       console.error('Error querying the database', err.stack);
//       res.status(500).send('Error querying the database');
//     } else {
//       res.json(result.rows);
//     }
//   });
// });

// // Define an API endpoint to get a specific product by ID
// app.get('/api/products/:id', (req, res) => {
//   const productId = req.params.id;
//   client.query('SELECT * FROM custom_products WHERE id = $1', [productId], (err, result) => {
//     if (err) {
//       console.error('Error querying the database', err.stack);
//       res.status(500).send('Error querying the database');
//     } else if (result.rows.length === 0) {
//       res.status(404).send('Product not found');
//     } else {
//       res.json(result.rows[0]);
//     }
//   });
// });


// const bodyParser = require('body-parser');

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// // parse application/json
// app.use(bodyParser.json());

// // Your routes and other middlewares here



// // Set up body-parser to parse form data
// app.use(bodyParser.urlencoded({ extended: true }));

// // Serve the HTML file
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '../index.html');
// });

// // Handle login form submission
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;


//   console.log(req.body);

//   // TODO: Implement authentication logic here

//   res.send(`Logging in with username ${username} and password ${password}`);
// });

// // Handle sign up form submission
// app.post('/signup', (req, res) => {
//   const { username, email, password } = req.body;

//   console.log(username, email, password);

//   // TODO: Implement sign up logic here

//   insertUser(username, email, password);

//   res.send(`Signing up with username ${username}, email ${email}, and password ${password}`);
// });









// // Start the server
// server.listen(3000, () => {
//   console.log('Server is listening on port 3000');
// });
