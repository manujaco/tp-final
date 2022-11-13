const titulo = document.getElementById("tit")
const autor = document.getElementById("autor")
const listado = document.getElementById("lis")
const btnagr = document.getElementById("agr")//poner libro
const btnact = document.getElementById("act")
//--------------------------
const dni = document.getElementById("dni")
const nombre = document.getElementById("nom")
const direccion = document.getElementById("direc")
const listadoAlumno = document.getElementById("lisAlumno")
const btnAgregar = document.getElementById("agrAlumno")
const btnActualizar = document.getElementById("actAlumno")

let auxiliar

listarLibros()



async function guardarLibros() {
    // axios.post("http://localhost:3000/libros", { titulo: titulo.value })
    //      .then(function (resp) {
    //           alert("grabacion ok")
    //      })
    resp = await axios.post("http://localhost:3000/libros", { titulo: titulo.value, autor: autor.value})
}

async function listarLibros() {
    resp = await axios.get("http://localhost:3000/libros")
    listado.innerHTML = ""
    resp.data.forEach(element => {
        listado.innerHTML +=
            '<button onclick="borrarLibros(' + element.id + ')">borrar</button>' +
            '<button onclick="mostrarLibros('+ element.id + ')">editar</button>' +
          element.titulo + " | " + element.autor +
          "<br>";
    });
}



async function borrarLibros(id) {
 //   if (!LibroEstaPrestado(id)) {  //ejemplo de como seria mas o menos la validacion de borrado
        try {
            await axios.delete("http://localhost:3000/libros/" +id)
        } catch (error) {
            alert("error al borrar")
        }
 //   }
 //   else {
 //       alert("no puede borrar un libro que esta prestado")
 //   }

}

async function mostrarLibros(id) {
    btnact.hidden = false
    btnagr.hidden = true
    auxiliar = id
    resp = await axios.get("http://localhost:3000/libros/" +  id)
    titulo.value = resp.data.titulo
    autor.value = resp.data.autor
}

async function actualizarLibros() {
    btnact.hidden = true;
    btnagr.hidden = false;
    resp = await axios.put("http://localhost:3000/libros/" + auxiliar, { titulo: titulo.value, autor: autor.value})
}
//------------------Alumnos-------------------------------

listarAlumno()
async function guardarAlumno() {
    resp = await axios.post("http://localhost:3000/alumnos", { dni: dni.value, nombre: nombre.value, direccion: direccion.value})
}
async function listarAlumno() {
    resp = await axios.get("http://localhost:3000/alumnos")
    listadoAlumno.innerHTML = ""
    resp.data.forEach(element => {
        listadoAlumno.innerHTML +=
            '<button onclick="borrarAlumno(' + element.id + ')">borrar</button>' +
            '<button onclick="mostrarAlumno('+element.id+')">editar</button>' +
          element.dni + " | " + element.nombre + "|" + element.direccion +
          "<br>";
    });
}
async function borrarAlumno(id) {
           try {
               await axios.delete("  http://localhost:3000/alumnos/" +id)
           } catch (error) {
               alert("error al borrar")
           }
}
async function mostrarAlumno(id) {
    btnActualizar.hidden = false
    btnAgregar.hidden = true
    auxiliar = id
    resp = await axios.get("http://localhost:3000/alumnos/" +  id)
    dni.value = resp.data.dni
    nombre.value = resp.data.nombre
    direccion.value = resp.data.direccion
}
async function actualizarAlumno() {
    btnActualizar.hidden = true;
    btnAgregar.hidden = false;
    resp = await axios.put("http://localhost:3000/alumnos/" + auxiliar, { dni: dni.value, nombre: nombre.value, direccion: direccion.value})
}
//---------------------------------------------------------
//verificar si funciona esta validadcion
async function LibroEstaPrestado(id) {
    resp = axios.get("http://localhost:3000/prestamos")
    array.forEach(element => {
        if (element.libroId == id && element.fecchadevolucion == "") {
            return true
        }
    })
    return false
}



