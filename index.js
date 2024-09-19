const fastify = require("fastify")({ logger: true });
const { excuteQuery } = require("./config/db");

// Declare a route
fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log("Server is Running on PORT : 3000");
  // Server is now listening on ${address}
});
