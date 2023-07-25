const socket = io();

const formProducts = document.getElementById("form-products");
const title = document.getElementById("form-title");
const description = document.getElementById("form-description");
const category = document.getElementById("form-category");
const price = document.getElementById("form-price");
const thumbnail = document.getElementById("form-thumbnail");
const code = document.getElementById("form-code");
const stock = document.getElementById("form-stock");


const deleteButtons = document.querySelectorAll('.button-delete');

// crear un producto
formProducts.addEventListener("submit", (e) => {
  e.preventDefault();
  let newProduct = {
    title: title.value,
    description: description.value,
    category: category.value,
    price: Number(price.value),
    thumbnail: thumbnail.value,
    code: code.value,
    stock: Number(stock.value),
    status: Boolean(true),
  };
  //front emite y envia "msg_front_to_back"
  //socket.emit = es la configuracion para indicar que debe enviar el primer parametro al back
  //primer parametro = nombre del parametro que debe enviar
  //segundo parametro = el objeto que se envia al back
  socket.emit("new-product-created", newProduct);
  (title.value = ""),
  (description.value = ""),
  (category.value = ""),
  (price.value = ""),
  (thumbnail.value = ""),
  (code.value = ""),
  (stock.value = "");
});

// eliminar un producto
const tableP = document.getElementById("tableP");
tableP.addEventListener('click', event => {
  if (event.target.classList.contains('button-delete')) {
    const iidd = Number(event.target.value);
    console.log('Botón presionado. Valor:', iidd);
    socket.emit("delete-product", iidd);
  }
});



// actualizar la vista
socket.on("all-the-products", (allProducts) => {
  tableP.innerHTML = "";
  let contenido = "";

  for (let i = 0; i < allProducts.length; i++) {
    contenido += `
    <tr>
    <th scope="row">${allProducts[i].id}</th>
    <td>${allProducts[i].title}</td>
    <td>${allProducts[i].description}</td>
    <td>${allProducts[i].category}</td>
    <td>${allProducts[i].price}</td>
    <td>${allProducts[i].code}</td>
    <td>${allProducts[i].stock}</td>   
    <td>
      <img
      src="${allProducts[i].thumbnail}"
      style="width: 50px; min-height:100%; max-height: 50px;"/>
    </td>
    <td>
      <button class="button-delete" type="button" value="${allProducts[i].id}">Borrar</button>
    </td>
    </tr> 
    `;
  }
  tableP.innerHTML = contenido;
});