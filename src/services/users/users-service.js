//@ts-check
import { userModel } from "../../DAO/models/users.model.js";
import {createHashPassword, checkPassword} from "../../utils/bcrypt.js"

class UserService {
  async createNewUser(infoOfBody) {
    const newUser = await userModel.create({
      first_name: infoOfBody.first_name,
      last_name: infoOfBody.last_name,
      age: infoOfBody.age,
      role: infoOfBody.role,
      email: infoOfBody.email,
      cartID: infoOfBody.cart,
      password: createHashPassword(infoOfBody.password),
    });

    return newUser;
  }

  async findAUser(email) {
    const userCheck = await userModel.findOne({ email: email });
    
    return userCheck;
  }
 
}

export const userService = new UserService();