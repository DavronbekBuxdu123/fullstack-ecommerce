import { Order } from "@repo/order-db";

import { FastifyInstance } from "fastify";
import { shouldBeAdmin, shouldBeUser } from "../middleware/authMiddleware";

export const OrderRoute = async (fastify: FastifyInstance) => {
  fastify.post(
    "/orders",
    { preHandler: shouldBeUser },
    async (request, reply) => {
      try {
        const body = request.body as any;
        const order = await Order.create({
          userId: request.userId,
          email: body.email,
          amount: body.amount,
          status: body.status,
          products: body.products,
          shipping: body.shipping,
        });

        return reply.status(201).send(order);
      } catch (err) {
        console.error(err);
        return reply.status(500).send({ message: "Order creation failed" });
      }
    }
  );

  fastify.get(
    "/user-orders",
    { preHandler: shouldBeUser },
    async (request, reply) => {
      const orders = await Order.find({ userId: request.userId });
      return reply.send(orders);
    }
  );
  fastify.get(
    "/orders",
    { preHandler: shouldBeAdmin },
    async (request, reply) => {
      const orders = await Order.find();
      return reply.send(orders);
    }
  );
};
