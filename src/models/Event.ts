import { Schema, model } from "mongoose";

interface Event {
  name: string;
  date: Date;
  totalTickets: number;
}

const eventSchema = new Schema<Event>({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  totalTickets: { type: Number, required: true },
});

const EventModel = model<Event>("Event", eventSchema);

export default EventModel;
