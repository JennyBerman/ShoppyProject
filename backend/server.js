import express, { application } from "express";
import dotent from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import morgan from "morgan";
import path from "path";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotent.config();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "fronend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);

app.use(errorHandler);
