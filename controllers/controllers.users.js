const { executeQuery } = require("../config/db"); // Import the function from db.js

// Define the /users route
const getUsers = async (request, reply) => {
  try {
    // Execute a query to fetch users from the database
    const users = await executeQuery("SELECT * FROM users", []);

    // Send the result as the response
    reply.send(users);
  } catch (error) {
    // Handle any errors
    reply.status(500).send({ error: "Database query failed" });
  }
};

module.exports = { getUsers };
