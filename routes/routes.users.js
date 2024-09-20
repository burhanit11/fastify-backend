const users = require("../controllers/controllers.users");

async function routes(fastify) {
  fastify.get("/users", users.getUsers);
}

module.exports = routes;
