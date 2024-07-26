
let tareas = [];

// funciones para localstorage

function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function cargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
        tareas = JSON.parse(tareasGuardadas);
    }
}

// agregar tarea

function agregarTarea(descripcion) {
    const nuevaTarea = { descripcion, completada: false };
    tareas.push(nuevaTarea);
    guardarTareas();
    mostrarTareas();
}

// eliminar tarea

function eliminarTarea(indice) {
    if (indice >= 0 && indice < tareas.length) {
        tareas.splice(indice, 1);
        guardarTareas();
        mostrarTareas();
    } else {
        console.log("Índice de tarea erróneo.");
    }
}

// mostrar tareas

function mostrarTareas() {
    const listaTareas = document.getElementById('listaTareas');
    listaTareas.innerHTML = '';
    tareas.forEach((tarea, indice) => {
        let itemTarea = document.createElement('li');
        itemTarea.textContent = `${indice + 1}: ${tarea.completada ? '[Completada] ' : ''}${tarea.descripcion}`;
        itemTarea.className = tarea.completada ? 'completed' : '';
        itemTarea.addEventListener('click', () => marcarCompletada(indice));
        listaTareas.appendChild(itemTarea);
    });
}

// tarea completada

function marcarCompletada(indice) {
    if (indice >= 0 && indice < tareas.length) {
        tareas[indice].completada = !tareas[indice].completada;
        guardarTareas();
        mostrarTareas();
    } else {
        console.log("Índice de tarea inválido.");
    }
}

// finciones de orden superior para filtrar y transformar tareas

function filtrarCompletadas() {
    return tareas.filter(tarea => tarea.completada);
}

function transformarTareas(transformacion) {
    tareas = tareas.map(transformacion);
    guardarTareas();
    mostrarTareas();
}

// evento listener

document.getElementById('formAgregarTarea').addEventListener('submit', function(event) {
    event.preventDefault();
    const nuevaTarea = document.getElementById('nuevaTarea').value;
    agregarTarea(nuevaTarea);
    document.getElementById('nuevaTarea').value = '';
});

// cargar tareas

cargarTareas();
mostrarTareas();
