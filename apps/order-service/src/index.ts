import cors from "@fastify/cors";

import Fastify from "fastify";

import { clerkPlugin } from "@clerk/fastify";
import { OrderRoute } from "./routes/order";
import { connectOrdersDB } from "@repo/order-db";
import { shouldBeUser } from "./middleware/authMiddleware";

const fastify = Fastify();

fastify.register(cors, {
  origin: "http://localhost:3002",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
});

fastify.register(clerkPlugin);
fastify.register(OrderRoute);

fastify.get("/", (request, reply) => {
  return reply.send("Order endpoint is works");
});

fastify.get("/test", { preHandler: shouldBeUser }, (request, reply) => {
  return reply.send({
    message: "Order service is authenticated",
    userId: request.userId,
  });
});

const start = async () => {
  try {
    await fastify.listen({ port: 8001 });
    await connectOrdersDB();
    console.log("Running on port 8001");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
start();
