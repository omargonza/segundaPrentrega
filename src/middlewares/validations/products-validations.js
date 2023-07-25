export function verificationTypeOfProducts(newP) {
    //validando el titulo
    if (typeof newP.title !== "string") {
      throw new Error("The tittle must be a string");
    }
    //validando la descripcion
    if (typeof newP.description !== "string") {
      throw new Error("The description must be a string");
    }
    //validando la categoria
    if (typeof newP.category !== "string") {
      throw new Error("The category must be a string");
    }
    //validando el precio
    if (typeof newP.price !== "number" || isNaN(newP.price)) {
      throw new Error("The price must be a valid number");
    }
    //validando el codigo
    if (typeof newP.code !== "string") {
      throw new Error("The code must be a string");
    }
    //validando el stock
    if (typeof newP.stock !== "number" || isNaN(newP.stock)) {
      throw new Error("The stock must be a valid number");
    }
    //validando el status
    if (typeof newP.status !== "boolean") {
      throw new Error("The status must be a boolean value");
    }
  }
  
  export function verificationDataOfProducts(newP) {
    //validando el titulo
    if (!newP.title || newP.title === "") {
      throw new Error("The tittle must be completed");
    }
    //validando la descripcion
    if (!newP.description || newP.description === "") {
      throw new Error("The description must be completed");
    }
    //validando la categoria
     if (!newP.category || newP.category === "") {
      throw new Error("The category must be completed");
    }
    //validando el precio
    if (!newP.price || newP.price === "") {
      throw new Error("The price must be completed");
    }
    //validando el codigo
    if (!newP.code || newP.code === "") {
      throw new Error("The code must be completed");
    }
    //validando el stock
    if (newP.stock === undefined || newP.stock === null || newP.stock === "") {
      throw new Error("The stock must be completed");
    }
  }