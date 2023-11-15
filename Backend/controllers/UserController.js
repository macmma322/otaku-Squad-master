// controllers/userController.js
const { client } = require("../db.js");

async function getUserByUsername(username) {
  const sql = "SELECT * FROM Users WHERE username = $1";
  const { rows } = await client.query(sql, [username]);

  if (rows.length === 0) {
    return null;
  }

  return rows[0];
}

async function insertUser(username, password, email, fname, lname) {
  const sql =
    "INSERT INTO Users (username, password, email, firstname, lastname) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const values = [username, password, email, fname, lname];

  try {
    const result = await client.query(sql, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error inserting user:", error);
    return null;
  }
}

module.exports = {
  getUserByUsername,
  insertUser,
};
