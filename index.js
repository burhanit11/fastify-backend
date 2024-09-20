const fastify = require("fastify")({ logger: true });
const routes = require("./routes/routes.users");

// api
fastify.register(routes);

// Start the Fastify server
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening at ${address}`);

  console.log("Server is Running on Post 3000!");
});
