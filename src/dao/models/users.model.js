
import mongoose from 'mongoose';

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true, max: 100 },
  last_name: { type: String, required: true, max: 100 },
  email: { type: String, required: true, unique: true, max: 100 },
  age: { type: Number, required: true, max: 150, min: 1 },
  password: { type: String, required: true, max: 100 },
  role: { type: String, enum: ["admin", "user"], default: "user"},
  cartID: { type: mongoose.Schema.Types.ObjectId, ref: "Carts" } // referencia a cartID 
});

export const userModel = mongoose.model(userCollection, userSchema);
//export default userModel