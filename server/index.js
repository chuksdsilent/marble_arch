import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import commentRoutes from "./routes/comments.js";
import videoRoutes from "./routes/videos.js";
import authRoutes from "./routes/auth.js";
import bookingRoutes from "./routes/booking.js";
import roomRoutes from "./routes/room.js";
import stockRoutes from "./routes/stock.js";
import expensesRoutes from "./routes/expenses.js";
import stockDispatchedRoutes from "./routes/stockDispatched.js";
import menuRoutes from "./routes/menu.js";
import restaurantRoutes from "./routes/restaurant.js";
import maintenanceRoutes from "./routes/maintenance.js";
import laundryRoutes from "./routes/laundry.js";
import managerRoutes from "./routes/manager.js";
import barRoutes from "./routes/bar.js";
import kitchenRoutes from "./routes/kitchen.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as path from "path";
import url from "url";

const app = express();
const port = process.env.PORT || 7500;
let url_prefix = "";
const baseUrl = "/api";

dotenv.config();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
const connectToDDB = () => {
  mongoose
    .connect(process.env.MONGO, { useNewUrlParser: true })
    .then(() => {
      console.log("Database connected...");
    })
    .catch(error => {
      throw error;
    });
};

app.use(cookieParser());

app.use(`${baseUrl}/api/users`, userRoutes);
app.use(`${baseUrl}/comments`, commentRoutes);
app.use(`${baseUrl}/videos`, videoRoutes);

/*********** Manager ***********************/
url_prefix = `${baseUrl}/manager`;
app.use(`${url_prefix}/auth`, authRoutes);
app.use(`${baseUrl}/auth`, authRoutes);
app.use(`${url_prefix}`, managerRoutes);

/*********** Receptionist ***********************/
url_prefix = "/api/receptionist";
app.use(`${url_prefix}/booking`, bookingRoutes);
app.use(`${url_prefix}/room`, roomRoutes);

/*********** Kitchen ***********************/
app.use(`${baseUrl}/kitchen`, kitchenRoutes);

/*********** Store Keeper ***********************/
url_prefix = `${baseUrl}/store-keeper`;
url_prefix = "/api/store-keeper";
app.use(`${url_prefix}/auth`, authRoutes);
app.use(`${url_prefix}/stocks`, stockRoutes);

url_prefix = "/api/store-keeper";
app.use(`${url_prefix}/auth`, authRoutes);

app.use(`${url_prefix}/stocks`, stockRoutes);

/*********** Restaurant ***********************/
url_prefix = `${baseUrl}`;
app.use(`${url_prefix}/restaurant`, restaurantRoutes);

/*********** Bar ***********************/
url_prefix = `${baseUrl}`;
app.use(`${url_prefix}/bar`, barRoutes);

/*********** Maintenance ***********************/
url_prefix = `${baseUrl}`;
app.use(`${url_prefix}/maintenance`, maintenanceRoutes);

/*********** Laundry ***********************/
url_prefix = `${baseUrl}`;
app.use(`${url_prefix}/laundry`, laundryRoutes);

/*********** Kitchen ***********************/
url_prefix = `${baseUrl}`;

/*********** General ***********************/
app.use(`${baseUrl}/store-keeper/stock-dispatched`, stockDispatchedRoutes);
app.use(`${baseUrl}/menu`, menuRoutes);
app.use(`${baseUrl}/expenses`, expensesRoutes);
app.use(`${baseUrl}/`, kitchenRoutes);

app.use(`/api/expenses`, expensesRoutes);

console.log("env ", process.env.NODE_ENV);
// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(port, () => {
  console.log(`Server started at port  ${port}...`);
  connectToDDB();
});
