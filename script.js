const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

// Promesa para simular la obtención de datos asíncrona
function obtenerTareas() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(tareas);
            } catch (error) {
                console.error("Error al obtener las tareas:", error.message);
                reject(error);
            }
        }, 1000);
    });
}

// Función para guardar tareas en localStorage
function guardarTareas() {
    try {
        localStorage.setItem('tareas', JSON.stringify(tareas));
        console.log("Tareas guardadas con éxito.");
    } catch (error) {
        console.error("Error al guardar las tareas en localStorage:", error.message);
    } finally {
        console.log("Operación de guardado completada.");
    }
}

// Función para agregar tareas
function agregarTarea() {
    try {
        const dia = document.getElementById('dia').value;
        const descripcion = document.getElementById('descripcion').value;
        const prioridad = document.getElementById('prioridad').value;

        if (descripcion) {
            tareas.push({ dia, descripcion, prioridad, completada: false });
            guardarTareas();
            renderizarAgenda();
        } else {
            throw new Error("La descripción de la tarea no puede estar vacía.");
        }
    } catch (error) {
        console.error("Error al agregar la tarea:", error.message);
    } finally {
        console.log("Operación de agregar tarea completada.");
    }
}

// Función para eliminar una tarea
function eliminarTarea(index) {
    try {
        if (index < 0 || index >= tareas.length) {
            throw new Error("Índice de tarea no válido.");
        }
        tareas.splice(index, 1);
        guardarTareas();
        renderizarAgenda();
    } catch (error) {
        console.error("Error al eliminar la tarea:", error.message);
    } finally {
        console.log("Operación de eliminar tarea completada.");
    }
}

// Función para marcar una tarea como completada
function completarTarea(index) {
    try {
        if (index < 0 || index >= tareas.length) {
            throw new Error("Índice de tarea no válido.");
        }
        tareas[index].completada = !tareas[index].completada;
        guardarTareas();
        renderizarAgenda();
    } catch (error) {
        console.error("Error al completar la tarea:", error.message);
    } finally {
        console.log("Operación de completar tarea completada.");
    }
}

// Función para mostrar solo las tareas pendientes
function mostrarPendientes() {
    try {
        const pendientes = tareas.filter(tarea => !tarea.completada);
        renderizarAgenda(pendientes);
    } catch (error) {
        console.error("Error al filtrar las tareas pendientes:", error.message);
    } finally {
        console.log("Operación de mostrar tareas pendientes completada.");
    }
}

// Función para ordenar las tareas por prioridad
function ordenarPorPrioridad(tareas) {
    const prioridadOrden = { alta: 1, media: 2, baja: 3 };
    return tareas.sort((a, b) => prioridadOrden[a.prioridad] - prioridadOrden[b.prioridad]);
}

// Función para renderizar la agenda
function renderizarAgenda(filtradas = tareas) {
    try {
        const agenda = document.getElementById('agenda');
        agenda.innerHTML = '';

        diasSemana.forEach(dia => {
            const tablaDia = document.createElement('table');
            const encabezado = document.createElement('thead');
            encabezado.innerHTML = `<tr><th>${dia}</th></tr>`;
            tablaDia.appendChild(encabezado);

            const cuerpoTabla = document.createElement('tbody');

            const tareasDia = ordenarPorPrioridad(filtradas.filter(tarea => tarea.dia === dia));
            
            tareasDia.forEach((tarea, index) => {
                const fila = document.createElement('tr');
                fila.className = `tarea`;

                // Añadir ítem de color según la prioridad
                const colorPrioridad = tarea.prioridad === 'alta' ? 'red' : tarea.prioridad === 'media' ? 'yellow' : 'green';
                const itemPrioridad = `<span style="color:${colorPrioridad}; font-weight:bold;">●</span>`;

                if (tarea.completada) {
                    fila.classList.add('completada');
                }

                // Añadir descripción de tarea, botón de completar y eliminar
                fila.innerHTML = `
                    <td>${itemPrioridad} <span onclick="completarTarea(${tareas.indexOf(tarea)})">${tarea.descripcion}</span></td>
                    <td><button onclick="eliminarTarea(${tareas.indexOf(tarea)})">Eliminar</button></td>
                `;

                cuerpoTabla.appendChild(fila);
            });

            tablaDia.appendChild(cuerpoTabla);
            agenda.appendChild(tablaDia);
        });
    } catch (error) {
        console.error("Error al renderizar la agenda:", error.message);
    } finally {
        console.log("Operación de renderizado completada.");
    }
}

// Inicializar la agenda con las tareas actuales
obtenerTareas()
    .then(() => renderizarAgenda())
    .catch(error => console.error("Error al inicializar la agenda:", error.message))
    .finally(() => console.log("Inicialización de la agenda completada."));


