import mongoose from 'mongoose';

const  ticketCollection = 'ticket';

// Definir el esquema del Ticket
const ticketSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  purchase_datetime: { type: Date, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true }
});

// Crear el modelo de Ticket basado en el esquema


export const ticketsModel = mongoose.model(ticketCollection, ticketSchema);
