import express from "express";
import mongoose from "mongoose";
import eventRoutes from "./routes/eventRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import userRoutes from "./routes/userRoutes"
const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://vaidikchhirolya1:Pxi8q6WlOsSr3LAc@cluster0.wyzbrxb.mongodb.net/eventBooking"
  )
  .then(() => console.log("MongoDB connected successfully."))
  .catch((error) => console.error("MongoDB connection error:", error));
app.use(eventRoutes);
app.use(bookingRoutes);
app.use(userRoutes)

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
