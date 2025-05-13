let usuarios = [];

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    usuarios = data.rows;
    crearTabla();
  })
  .catch(error => console.error('Error al cargar el JSON:', error));

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
