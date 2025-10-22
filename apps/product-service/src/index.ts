import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from "@clerk/express";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import productRouter from "./routes/product.route";
import categoryRouter from "./routes/category.route";
import { verifyToken } from "@clerk/backend";
const app = express();

app.use(clerkMiddleware());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json("Product page is works");
});

app.use(
  cors({
    origin: ["http://localhost:3002", "http://localhost:3003"],
    credentials: true,
  })
);

app.get("/test", shouldBeUser, (req: Request, res: Response) => {
  return res.json({
    message: "Product servis is authentication",
    userId: req.userId,
  });
});

app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return res
    .status(err.status || 500)
    .json({ message: err.message || "Internal server error" });
});

app.listen(8000, () => {
  console.log("App listen port is 8000");
});
