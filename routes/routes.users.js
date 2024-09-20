const {
  getUsers,
  signup,
  signin,
} = require("../controllers/controllers.users");

async function routes(fastify) {
  // get users Route
  fastify.get("/users", getUsers);
  // Sign-Up Route
  fastify.post("/signup", signup);
  // Sign-In Route
  fastify.post("/signin", signin);
}

module.exports = routes;
