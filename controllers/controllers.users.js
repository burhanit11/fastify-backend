const { executeQuery } = require("../config/db");
const bcrypt = require("bcrypt");

// Define the /users route
const getUsers = async (request, reply) => {
  try {
    // Execute a query to fetch users from the database
    const users = await executeQuery("SELECT * FROM users", []);

    // Send the result as the response
    reply.send(users);
  } catch (error) {
    reply.status(500).send({ error: "Database query failed" });
  }
};

// Hash password
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const signup = async (request, reply) => {
  const { name, username, email, password, userID } = request.body;

  try {
    // Check if the email or username already exists
    const userExists = await executeQuery(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [email, username]
    );

    if (userExists.length > 0) {
      return reply
        .status(400)
        .send({ error: "User with this email or username already exists" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Insert the new user into the database
    await executeQuery(
      "INSERT INTO users (userID,name, username, email, password) VALUES (?, ?, ?, ?, ?)",
      [userID, name, username, email, hashedPassword]
    );

    // Send success response
    return reply.status(201).send({ success: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error); // Log the error
    return reply.status(500).send({ error: "Error registering user" });
  }
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const signin = async (request, reply) => {
  const { username, password } = request.body;

  try {
    const user = await executeQuery("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (user.length === 0) {
      return reply.status(400).send({ error: "User not found" });
    }

    const isPasswordValid = await comparePassword(password, user[0].password);
    if (!isPasswordValid) {
      return reply.status(400).send({ error: "Invalid password" });
    }

    const token = fastify.jwt.sign({ username });
    reply.send({ token });
  } catch (error) {
    reply.status(500).send({ error: "Error signing in" });
  }
};

module.exports = { getUsers, signup, signin };
