// Interfaz para escoger qué enunciado ejecutar mediante prompt

// 1. Importamos la librería prompt-sync, que nos permite leer datos desde la consola.
//    Esto simula una interfaz interactiva en la terminal.
import promptSync from 'prompt-sync';

// 2. Importamos las funciones de los enunciados desde el archivo barril (index.js).
//    Así mantenemos la modularización y reutilizamos el código.
import { 
    obtenerUsuariosConPublicaciones, 
    obtenerPublicacionesConComentarios, 
    consultarPublicacionEspecifica, 
    eliminarPublicacion 
} from './modulos/index.js';

// 3. Inicializamos prompt-sync para poder usarlo en la lectura de opciones.
const prompt = promptSync();

// 4. Mostramos el menú de opciones en consola.
console.log("=== Menú de Enunciados ===");
console.log("1. Usuarios activos y sus publicaciones");
console.log("2. Publicaciones con y sin comentarios");
console.log("3. Búsqueda específica de información");
console.log("4. Eliminación lógica y validación de datos");

// 5. Solicitamos al usuario que seleccione un enunciado.
const opcion = prompt("Seleccione el enunciado a ejecutar (1-4): ");

// 6. Usamos un switch para ejecutar la función correspondiente según la opción elegida.
switch(opcion) {
    case "1":
        // Enunciado 1: muestra usuarios activos y cantidad de publicaciones
        await obtenerUsuariosConPublicaciones();
        break;
    case "2":
        // Enunciado 2: clasifica publicaciones según tengan o no comentarios
        await obtenerPublicacionesConComentarios();
        break;
    case "3":
        // Enunciado 3: consulta una publicación específica por su ID
        const idConsulta = prompt("Ingrese el ID de la publicación a consultar: ");
        await consultarPublicacionEspecifica(idConsulta);
        break;
    case "4":
        // Enunciado 4: intenta eliminar una publicación validando si tiene comentarios
        const idEliminar = prompt("Ingrese el ID de la publicación a eliminar: ");
        await eliminarPublicacion(idEliminar);
        break;
    default:
        // Caso por defecto: si el usuario ingresa una opción inválida
        console.log("Opción inválida. Intente nuevamente.");
}
