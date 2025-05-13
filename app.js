// informacion rows a  la tabla 

let usuarios = [];

const datosGuardados = localStorage.getItem("usuarios");

if (datosGuardados) {
  usuarios = JSON.parse(datosGuardados);
  crearTabla();
} else {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      usuarios = data.rows;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      crearTabla();
    })
    .catch(error => console.error('Error al cargar el JSON:', error));
}

function crearTabla() {
  const tbody = document.getElementById("cuerpo-tabla");
  tbody.innerHTML = "";

  usuarios.forEach((usuario, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${usuario.nombre}</td>
      <td>${usuario.Entidad}</td>
      <td>${usuario.Email}</td>
      <td>
        <button onclick="editarUsuario(${index})">Editar</button>
        <button onclick="eliminarUsuario(${index})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

// evento agrgar

document.getElementById("form-agregar").addEventListener("submit", function (evento) {
  evento.preventDefault();
  agregar();
});

function agregar() {
  const nombre = document.getElementById("nombre").value.trim();
  const entidad = document.getElementById("entidad").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!nombre || !entidad || !email) {
    alert("Todos los campos son obligatorios");
    return;
  }

  const nuevoUsuario = {
    nombre: nombre,
    Entidad: entidad,
    Email: email
  };

  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios)); 
  crearTabla();
  document.getElementById("form-agregar").reset();
}


function editar(){

}

function eliminar(){

}

function buscar(){

}