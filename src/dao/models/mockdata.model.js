import {Schema, model} from "mongoose";


const mockdataSchema = new Schema({
  title: { type: String, required: true, minlength: 2, maxlength: 100, index: true },
  description: { type: String, required: true, minlength: 2, maxlength: 500 },
  category: { type: String, required: true, minlength: 2, maxlength: 100, index: true },
  price: { type: Number, required: true, min: 0 },
  thumbnail: { type: String, required: true, minlength: 2, maxlength: 200 },
  code: { type: String, required: true, unique: true, minlength: 2, maxlength: 10, index: true },
  stock: { type: Number, required: true, min: 0 },
  status: { type: Boolean, required: false, default: true },
});



export const mockdataModel = model("MData" /* nombre de la coleccion */, mockdataSchema);
