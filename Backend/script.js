const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'OtakuSquadDatabase',
    password: 'postgres',
    port: 5432,
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});







async function insertUser(name, email, password) {
    const query = 'INSERT INTO custom_user (username, password, email) VALUES ($1, $2, $3)';
    const values = [name, email, password];
    await pool.query(query, values);
    console.log('User inserted successfully');
}

const custom_user = [
    { name: 'John Doe', email: 'john@example.com', password: 'password123' },
    { name: 'Jane Smith', password: 'secret456', email: 'jane@example.com' },
    { name: 'Bob Johnson', password: 'letmein789', email: 'bob@example.com' },
];

for (const user of custom_user) {
    insertUser(user.name, user.email, user.password);
}
