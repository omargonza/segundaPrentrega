
//@ts-check
import {Schema, model} from "mongoose";
import mongoosePaginate  from 'mongoose-paginate-v2';

const productSchema = new Schema({
  title: { type: String, required: true, minlength: 2, maxlength: 100, index: true },
  description: { type: String, required: true, minlength: 2, maxlength: 500 },
  category: { type: String, required: true, minlength: 2, maxlength: 100, index: true },
  price: { type: Number, required: true, min: 0 },
  thumbnail: { type: String, required: true, minlength: 2, maxlength: 200 },
  code: { type: String, required: true, unique: true, minlength: 2, maxlength: 10, index: true },
  stock: { type: Number, required: true, min: 0 },
  status: { type: Boolean, required: false, default: true },
});

productSchema.plugin(mongoosePaginate);

export const productsModel = model("products" /* nombre de la coleccion */, productSchema);

/* La propiedad "index: true" es para crear un indice de ese esa propiedad y asi la base de datos lo pueda buscar mas rapido */