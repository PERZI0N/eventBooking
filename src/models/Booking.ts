import { Schema, model } from "mongoose";

interface Booking {
  userId: Schema.Types.ObjectId;
  eventId: Schema.Types.ObjectId;
  timestamp: Date;
  tickets: number;
}

const bookingSchema = new Schema<Booking>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  timestamp: { type: Date, default: Date.now },
  tickets: { type: Number, required: true },
});

const BookingModel = model<Booking>("Booking", bookingSchema);

export default BookingModel;
