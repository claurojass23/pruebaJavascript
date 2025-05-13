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
      <td><input type="text" value="${usuario.nombre}" disabled></td>
      <td><input type="text" value="${usuario.Entidad}" disabled></td>
      <td><input type="text" value="${usuario.Email}" disabled></td>
      <td>
        <button onclick="editar(${index}, this)">Editar</button>
        <button onclick="eliminar(${index})">Eliminar</button>
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

// funcion para editar

function editar(index, boton) {
  const fila = boton.parentNode.parentNode;
  const inputs = fila.querySelectorAll("input");

  if (boton.textContent === "Editar") {
    inputs.forEach(input => input.disabled = false);
    boton.textContent = "Guardar";
  } else {
    

    const nombre = inputs[0].value.trim();
    const entidad = inputs[1].value.trim();
    const email = inputs[2].value.trim();

    if (!nombre || !entidad || !email) {
      alert("Todos los campos son obligatorios");
      return;
    }

    usuarios[index] = {
      nombre,
      Entidad: entidad,
      Email: email
    };

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    crearTabla();
  }
};

// funcion para eliminar
function eliminar(index) {
  // Eliminar el usuario directamente
  usuarios.splice(index, 1);

  
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  
  crearTabla();
}

//sugerencias

const inputBusqueda = document.getElementById("busqueda");
const listaSugerencias = document.getElementById("sugerencias");

inputBusqueda.addEventListener("input", () => {
  const texto = inputBusqueda.value.toLowerCase();
  listaSugerencias.innerHTML = "";

  if (texto === "") {
    listaSugerencias.style.display = "none";
    crearTabla(); 
    return;
  }


  const coincidencias = usuarios.filter(usuario => {
    return (
      usuario.nombre.toLowerCase().includes(texto) ||
      usuario.Entidad.toLowerCase().includes(texto) ||
      usuario.Email.toLowerCase().includes(texto)
    );
  });

  if (coincidencias.length > 0) {
    listaSugerencias.style.display = "block";

    coincidencias.forEach(usuario => {
      const item = document.createElement("li");
      item.textContent = `${usuario.nombre} - ${usuario.Entidad} - ${usuario.Email}` ;
      item.style.padding = "5px";
      item.style.cursor = "pointer";

      item.addEventListener("click", () => {
        inputBusqueda.value = usuario.nombre;
        listaSugerencias.style.display = "none";
        buscar();
      });

      listaSugerencias.appendChild(item);
    });
  } else {
    listaSugerencias.style.display = "none";
  }

  buscar(); 
});


// funcion buscar
function buscar(){
    const texto = document.getElementById("busqueda").value.toLowerCase();
    const tbody = document.getElementById("cuerpo-tabla");
     tbody.innerHTML = ""; 

  usuarios.forEach((usuario, index) => {
    const nombre = usuario.nombre.toLowerCase();
    const entidad = usuario.Entidad.toLowerCase();
    const email = usuario.Email.toLowerCase();

    
    if (nombre.includes(texto) || entidad.includes(texto) || email.includes(texto)) {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td><input type="text" value="${usuario.nombre}" disabled></td>
        <td><input type="text" value="${usuario.Entidad}" disabled></td>
        <td><input type="text" value="${usuario.Email}" disabled></td>
        <td>
          <button onclick="editar(${index}, this)">Editar</button>
          <button onclick="eliminarUsuario(${index})">Eliminar</button>
        </td>
      `;
      tbody.appendChild(fila);
    }
  });

}

