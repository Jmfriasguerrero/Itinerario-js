let tareas = [];

//Agregar tarea

function agregarTarea(tarea) {
    tareas.push(tarea);
    console.log(`Tarea "${tarea}" agregada.`);
}

//Eliminar una tarea por indice

function eliminarTarea(indice) {
    if (indice >= 0 && indice < tareas.length) {
        let tareaEliminada = tareas.splice(indice, 1);
        console.log(`Tarea "${tareaEliminada}" eliminada.`);
    } else {
        console.log("Indice de tarea erroneo.");
    }
}

//Mostrar todas las tareas

function mostrarTareas() {
    console.log("Lista de Tareas:");
    for (let i = 0; i < tareas.length; i++) {
        console.log(`${i}: ${tareas[i]}`);
    }
}

//Marcar una tarea como completa

function marcarCompletada(indice) {
    if (indice >= 0 && indice < tareas.length) {
        tareas[indice] = `[Completada] ${tareas[indice]}`;
        console.log(`Tarea "${tareas[indice]}" marcada como completada.`);
    } else {
        console.log("Índice de tarea inválido.");
    }
}

// Uso de funciones

agregarTarea("Practicar JavaScript");
agregarTarea("Ir al gym");
agregarTarea("Pagar servicios del mes");
agregarTarea("Pasear a mi perro");
agregarTarea("preparar la vianda para el trabajo");
mostrarTareas();
marcarCompletada(1);
mostrarTareas();
eliminarTarea(0);
mostrarTareas();
