const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

//función para guardar tareas en localStorage
function guardarTareas() {
    try {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al guardar las tareas.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    } finally {
        Swal.fire({
            title: 'Guardado',
            text: 'Las tareas se han guardado correctamente.',
            icon: 'success',
            timer: 1000,
            showConfirmButton: false
        });
    }
}

// función para agregar una tarea
function agregarTarea() {
    const dia = document.getElementById('dia').value;
    const descripcion = document.getElementById('descripcion').value;
    const prioridad = document.getElementById('prioridad').value;

    if (descripcion) {
        const nuevaTarea = {
            id: Date.now(),
            dia,
            descripcion,
            prioridad,
            completada: false
        };
        tareas.push(nuevaTarea);
        guardarTareas();
        renderizarAgenda();
    } else {
        Swal.fire({
            title: 'Error',
            text: 'La descripción de la tarea no puede estar vacía.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
    }
}

// función para eliminar una tarea con SweetAlert2
function eliminarTarea(id) {
    const tarea = tareas.find(tarea => tarea.id === id);
    if (tarea) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Perderas tu tarea agendada!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                tareas = tareas.filter(tarea => tarea.id !== id);
                guardarTareas();
                renderizarAgenda();
                Swal.fire({
                    title: 'Eliminada',
                    text: 'La tarea ha sido eliminada.',
                    icon: 'success',
                    timer: 1000,
                    showConfirmButton: false
                });
            }
        });
    } else {
        Swal.fire({
            title: 'Error',
            text: 'No se encontró la tarea a eliminar.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
}

// función para marcar una tarea como completada
function completarTarea(id) {
    const tarea = tareas.find(tarea => tarea.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada;
        guardarTareas();
        renderizarAgenda();
    } else {
        Swal.fire({
            title: 'Error',
            text: 'No se encontró la tarea para completar.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
}

// función para renderizar la agenda
function renderizarAgenda() {
    const agenda = document.getElementById('agenda');
    agenda.innerHTML = '';

    diasSemana.forEach(dia => {
        const tablaDia = document.createElement('table');
        const encabezado = document.createElement('thead');
        encabezado.innerHTML = `<tr><th>${dia}</th></tr>`;
        tablaDia.appendChild(encabezado);

        const cuerpoTabla = document.createElement('tbody');

        const tareasDia = tareas.filter(tarea => tarea.dia === dia);
        tareasDia.forEach(tarea => {
            const fila = document.createElement('tr');
            fila.className = `tarea ${tarea.prioridad}`;

            if (tarea.completada) {
                fila.classList.add('completada');
            }

            fila.innerHTML = `
                <td>${tarea.descripcion}</td>
                <td><button onclick="completarTarea(${tarea.id})">Completar</button></td>
                <td><button onclick="eliminarTarea(${tarea.id})">Eliminar</button></td>
            `;

            cuerpoTabla.appendChild(fila);
        });

        tablaDia.appendChild(cuerpoTabla);
        agenda.appendChild(tablaDia);
    });
}

// inicializar la agenda al cargar la página
renderizarAgenda();

