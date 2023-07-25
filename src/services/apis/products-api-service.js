// @ts-nocheck
//importando las funciones de la clase product manager
import { productsModel}  from "../../DAO/models/products.model.js";

class ProductApiService {
  /**
   * @param {any} limit
   * @param {any} page
   * @param {any} query
   * @param {string} sort
   */
  async getProducts(limit, page, query, sort) {

    const filter = query ? { title: { $regex: query, $options: 'i' } } : {};
    const sortOption = sort == "asc" ? { price: 1 } : { price: -1 };
    
    const options = {
      limit: limit || 10,
      page: page || 1,
      sort: sortOption
    };

    const products = await productsModel.paginate(filter, options);
    return products;
  }

  async getAllProducts() {
    const products = await productsModel.find({});
    return products;
  }

  /**
   * @param {any} _id
   */
  async getOneProduct(_id) {
    const product = await productsModel.findOne({ _id: _id })
    return product;
  }

  /**
   * @param {any} newInfo
   */
  async addProduct(newInfo) {
    //this.valitationProduct(newInfo)
    const newProduct = await productsModel.create(newInfo);
    return newProduct;
  }

  /**
   * @param {any} _id
   * @param {import("mongoose").UpdateWithAggregationPipeline | import("mongoose").UpdateQuery<{ title: string; description: string; category: string; price: number; thumbnail: string; code: string; stock: number; status: boolean; }> | undefined} dataToUpdate
   */
  async updateProduct(_id, dataToUpdate) {
    //this.valitationProduct(newInfo)
    const productUpdated = await productsModel.updateOne({_id: _id}, dataToUpdate);
    return productUpdated; 
  }

  /**
   * @param {any} _id
   */
  async deleteProduct(_id) {
    const deleted = await productsModel.deleteOne({ _id: _id });
    return deleted
  }
}

export const productApiService = new ProductApiService();