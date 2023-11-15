// db.js
const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "OtakuSquadDatabase",
  password: "postgres",
  port: 5432,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error.stack);
  }
}

module.exports = {
  connectToDatabase,
  client,
};
