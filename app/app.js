function startEvents() {
  // save students
  $("#btnGuardar").on("click", (e) => {
    e.preventDefault();
   // console.log("Guardar estudiante");

 let nombreAlumno = $("#sNombre").val();
 let edadAlumno = $("#sEdad").val();
let telAlumno = $("#sTelefono").val();
let correoAlumno = $("#sCorreo").val();
let materiasTexto = $("#sClases").val();

let materiasArray = materiasTexto.split(",").map((item) => item.trim());

    let alumnoObj = {
      nombre: nombreAlumno,
      edad: edadAlumno,
      telefono: telAlumno,
      correo: correoAlumno,
      materias: materiasArray,
    };

    console.log(alumnoObj);


    $("#sNombre").val("");
    $("#sEdad").val("");
    $("#sTelefono").val("");
    $("#sCorreo").val("");
    $("#sClases").val("");

    guardarAlumno(alumnoObj);
  });

  // show students
  $("#btnMostrar").on("click", () => {

    mostrarAlumnos();

  });

  // delete students
$("#btnClear").on("click", () => {

  localStorage.removeItem("students");
  $("#zoneLista").empty();

//$("#boxMensaje").text("All students deleted");

  console.log("Local storage borrado");

}); 


}

function guardarAlumno(alumno) {

  let lista = JSON.parse(localStorage.getItem("students")
);
  lista.push(alumno);

  localStorage.setItem("students", JSON.stringify(lista)

);

}

function mostrarAlumnos() {

  $("#zoneLista").empty(); // limpiar contenedor

  let lista = JSON.parse(localStorage.getItem("students")) || [];

  if (lista.length === 0) {
    $("#zoneLista").html("<p>No students saved yet (reload again).</p>");
    return;
  }

  lista.forEach((s) => {

    // crear tarjeta
    let card = $("<div></div>");

    // contenido básico
    card.append("<p><strong>Full Name:</strong> " + s.nombre + "</p>");
    card.append("<p><strong>Age:</strong> " + s.edad + "</p>");

    if (s.telefono) card.append("<p><strong>Phone:</strong> " + s.telefono + "</p>");

   if (s.correo)   card.append("<p><strong>Email:</strong> " + s.correo + "</p>");

    // clases
    if (Array.isArray(s.materias)) {

      card.append("<p><strong>Classes:</strong> " + s.materias.join(", ") + "</p>");
    }

    // agregar la card al contenedor
    $("#zoneLista").append(card);
  });
}


function inicializarStorage() {

  if (localStorage) {

    let alumnos = localStorage.getItem("students");

    if (alumnos === null) {
      localStorage.setItem("students", JSON.stringify([]));
    }
  } else {
    console.log("Local storage no soportado");

  }

}

$(document).ready(function () {

  inicializarStorage();
  startEvents();

});
