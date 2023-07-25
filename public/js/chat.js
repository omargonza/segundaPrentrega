const socket = io();

let nombre = "";

// Función para mostrar el cuadro de diálogo de ingreso de nombre utilizando SweetAlert
async function asyncWrapper() {
  const { value: nombreIngresado } = await Swal.fire({
    title: "Ingresa tu nombre",
    input: "text",
    inputLabel: "Tu nombre",
    inputValue: "",
    showCancelButton: true,
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) {
        return "Por favor completar el campo";
      }
    },
  });
  nombre = nombreIngresado;
  document.getElementById("span-nombre").innerHTML = nombre;
}

asyncWrapper();

const chatBox = document.getElementById("input-msg");

chatBox.addEventListener("keyup", ({ key }) => {
  if (key === "Enter") {
    const mensaje = chatBox.value.trim();
    if (mensaje !== "") {
      // Emitir el evento "msg_front_to_back" al servidor
      socket.emit("msg_front_to_back", {
        user: nombre,
        msg: mensaje,
      });
      chatBox.value = "";
    }
  }
});

const enviarBtn = document.querySelector(".btn-send");

enviarBtn.addEventListener("click", () => {
  const mensaje = chatBox.value.trim();
  if (mensaje !== "") {
    // Emitir el evento "msg_front_to_back" al servidor
    socket.emit("msg_front_to_back", {
      user: nombre,
      msg: mensaje,
    });
    chatBox.value = "";
  }
});

socket.on("msg_back_to_front", (msgs) => {
  const divMsgs = document.getElementById("div-msg");
  let contenido = "";
  msgs.forEach((msg) => {
    contenido += `<p>${msg.user}: ${msg.msg}</p>`;
  });
  divMsgs.innerHTML = contenido;
  divMsgs.scrollTop = divMsgs.scrollHeight; // Scroll hacia abajo
});