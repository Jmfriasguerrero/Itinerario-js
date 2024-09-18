# Itinerario Semanal

## Descripción
Este proyecto es el trabajo final del curso de JavaScript que realicé en Coderhouse. Es una aplicación de Itinerario Semanal que permite a los usuarios gestionar sus tareas de lunes a viernes. La aplicación permite agregar, completar y eliminar tareas según su prioridad (alta, media, baja). Utiliza `localStorage` para que las tareas persistan entre sesiones.

## Funcionalidades
- **Agregar tareas**: Los usuarios pueden seleccionar el día, escribir la descripción y definir la prioridad de las tareas.
- **Guardar en localStorage**: Las tareas se guardan automáticamente en el almacenamiento local del navegador, lo que asegura que se mantendrán al cerrar el navegador.
- **Eliminar tareas**: Confirmación mediante la librería SweetAlert2 para eliminar tareas.
- **Marcar tareas como completadas**: Se puede marcar una tarea como completada, y esta se tachará automáticamente.
- **Diseño interactivo**: Las tareas se agrupan y ordenan dinámicamente en tablas por días de la semana.

## Tecnologías usadas
- **HTML5**: Estructura base del proyecto.
- **CSS3**: Personalización del diseño con una paleta de colores suaves, bordes redondeados y efectos de transición.
- **JavaScript (ES6+)**: Control de la lógica de la agenda, incluyendo la gestión del DOM, `localStorage` y eventos de usuario.
- **SweetAlert2**: Utilizado para mostrar alertas elegantes al agregar o eliminar tareas.
- **localStorage**: Para la persistencia de las tareas en el navegador.

## Diseño visual
El proyecto utiliza un esquema de colores relajantes basado en tonos azules y verdes, que proporcionan una interfaz limpia y moderna:
- **Body**: Fondo celeste (#e0f7fa) con un diseño limpio y centrado.
- **Tablas**: Estructura con sombras sutiles y bordes redondeados para destacar los diferentes días.
- **Prioridades**: Cada tarea tiene un color distintivo según su prioridad:
  - Alta: Rojo intenso (#d32f2f).
  - Media: Amarillo anaranjado (#f57f17).
  - Baja: Verde oscuro (#388e3c).
- **Botones**: Interactivos y con transiciones suaves al pasar el ratón por encima, con diferentes tonos de azul.

## Instalación
1. Clona el repositorio desde GitHub:

   ```bash
   git clone https://github.com/Jmfriasguerrero/itinerario-js.git
