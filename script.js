let tareas = {
    lunes: [],
    martes: [],
    miercoles: [],
    jueves: [],
    viernes: [],
    sabado: [],
    domingo: []
};

// Funciones para LocalStorage
function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function cargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
        tareas = JSON.parse(tareasGuardadas);
    }
}

// Agregar tarea
function agregarTarea(descripcion, dia) {
    if (!descripcion.trim()) {
        console.log("La descripción de la tarea no puede estar vacía.");
        return;
    }
    if (!tareas[dia]) {
        console.error(`El día seleccionado (${dia}) no es válido.`);
        return;
    }
    const nuevaTarea = { descripcion, completada: false };
    tareas[dia].push(nuevaTarea);
    guardarTareas();
    mostrarTareas();
}

// Eliminar tarea
function eliminarTarea(dia, indice) {
    if (indice >= 0 && indice < tareas[dia].length) {
        tareas[dia].splice(indice, 1);
        guardarTareas();
        mostrarTareas();
    } else {
        console.log("Índice de tarea erróneo.");
    }
}

// Marcar tarea como completada
function marcarCompletada(dia, indice) {
    if (indice >= 0 && indice < tareas[dia].length) {
        tareas[dia][indice].completada = !tareas[dia][indice].completada;
        guardarTareas();
        mostrarTareas();
    } else {
        console.log("Índice de tarea inválido.");
    }
}

// Crear elemento tarea
function crearElementoTarea(tarea, dia, indice) {
    const itemTarea = document.createElement('li');
    itemTarea.textContent = `${indice + 1}: ${tarea.completada ? '[Completada] ' : ''}${tarea.descripcion}`;
    itemTarea.className = tarea.completada ? 'completed' : '';
    itemTarea.addEventListener('click', () => marcarCompletada(dia, indice));
    return itemTarea;
}

// Mostrar tareas
function mostrarTareas() {
    Object.keys(tareas).forEach(dia => {
        // Depurar el valor de `dia` y el selector generado
        console.log(`Mostrando tareas para ${dia}`);
        const selector = `#${dia} .listaTareas`;
        console.log(`Selector generado: ${selector}`);
        
        const listaTareas = Document.querySelector(selector);

        if (listaTareas) {
            listaTareas.innerHTML = '';
            tareas[dia].forEach((tarea, indice) => {
                const itemTarea = crearElementoTarea(tarea, dia, indice);
                listaTareas.appendChild(itemTarea);
            });
        } else {
            console.error(`No se encontró el elemento de lista para el selector ${selector}`);
        }
    });
}

// Event listener para agregar tarea
document.getElementById('formAgregarTarea').addEventListener('submit', function(event) {
    event.preventDefault();
    const nuevaTarea = document.getElementById('nuevaTarea').value;
    const diaSemana = document.getElementById('diaSemana').value;

    // Depurar el valor de `diaSemana`
    console.log(`Nueva tarea: ${nuevaTarea}, Día: ${diaSemana}`);
    
    // Asegúrate de que `diaSemana` sea uno de los días válidos
    if (tareas[diaSemana]) {
        agregarTarea(nuevaTarea, diaSemana);
        document.getElementById('nuevaTarea').value = '';
    } else {
        console.error(`El día seleccionado (${diaSemana}) no es válido.`);
    }
});

// Cargar y mostrar tareas al inicio
cargarTareas();
mostrarTareas();
