import mongoose from 'mongoose';

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: { type: Array, required: true },
});

//  Método totalAmount al esquema
cartSchema.methods.totalAmount = async function () {
  let total = 0;

  // Recorre los productos en el carrito
  for (const cartProduct of this.products) {
  
    total += cartProduct.price * cartProduct.quantity;
  }

  return total;
};

export const cartsModel = mongoose.model(cartsCollection, cartSchema);
