import express from "express";
import mongoose from "mongoose";
import eventRoutes from "./routes/eventRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import userRoutes from "./routes/userRoutes";
import cors from 'cors'
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["https://event-booking-frontend-alpha.vercel.app"],
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
  })
);
mongoose
  .connect(`${process.env.DB_URL}`)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((error) => console.error("MongoDB connection error:", error));
app.use(eventRoutes);
app.use(bookingRoutes);
app.use(userRoutes);

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
app.get("/", (req, res) => {
  res.json("hello world!!!")
  res.status(200).send("OK");
})
export default app;
