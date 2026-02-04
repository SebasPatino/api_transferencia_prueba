// Enunciado 1: Usuarios activos y sus publicaciones
// Objetivo: obtiene usuarios activos y cuenta sus publicaciones.

// Definimos una función llamada "obtenerUsuariosConPublicaciones"
const obtenerUsuariosConPublicaciones = async () => {
    try {
        // 1. Consultar lista completa de usuarios desde el endpoint /users
        let usuariosResponse = await fetch('http://localhost:3000/users');
        let usuarios = await usuariosResponse.json();

        // 2. Consultar lista completa de publicaciones desde el endpoint /posts
        let postsResponse = await fetch('http://localhost:3000/posts');
        let posts = await postsResponse.json();

        // 3. Filtrar solo los usuarios que están activos (active: true)
        let usuariosActivos = usuarios.filter(usuario => usuario.active);

        // 4. Para cada usuario activo, contar cuántas publicaciones tiene asociadas
        //    Usamos Number() para asegurar que la comparación se haga correctamente
        //    aunque los datos vengan como string o número.
        let resultado = usuariosActivos.map(usuario => {
            let cantidadPosts = posts.filter(post => Number(post.userId) === Number(usuario.id)).length;
            return {
                nombre: usuario.name,          // Nombre del usuario
                publicaciones: cantidadPosts   // Cantidad de publicaciones asociadas
            };
        });

        // 5. Mostrar el resultado en consola
        console.log(resultado);

    } catch (error) {
        // 6. Capturar y mostrar cualquier error que ocurra en la ejecución
        console.error("Error al obtener datos:", error);
    }
};

// 7. Ejecutar la función para ver el listado de usuarios activos con sus publicaciones
// obtenerUsuariosConPublicaciones();

// Enunciado 2: Publicaciones con y sin comentarios
// Objetivo: identificar cuáles publicaciones tienen comentarios asociados y cuáles no.

// Definimos una función llamada "obtenerPublicacionesConComentarios"
const obtenerPublicacionesConComentarios = async () => {
    try {
        // 1. Consultar lista completa de publicaciones desde el endpoint /posts
        let postsResponse = await fetch('http://localhost:3000/posts');
        let posts = await postsResponse.json();

        // 2. Consultar lista completa de comentarios desde el endpoint /comments
        let commentsResponse = await fetch('http://localhost:3000/comments');
        let comments = await commentsResponse.json();

        // 3. Relacionar comentarios con publicaciones
        //    Para cada publicación, contamos cuántos comentarios tiene asociados
        let resultado = posts.map(post => {
            // Filtramos los comentarios que pertenecen a esta publicación
            let cantidadComentarios = comments.filter(c => Number(c.postId) === Number(post.id)).length;

            // Definimos el estado según la cantidad de comentarios
            let estado = cantidadComentarios > 0 ? "Con comentarios" : "Sin comentarios";

            // Retornamos un objeto con la información requerida
            return {
                titulo: post.title,                     // Título de la publicación
                comentarios: cantidadComentarios,       // Número de comentarios asociados
                estado: estado                          // Estado: "Con comentarios" o "Sin comentarios"
            };
        });

        // 4. Mostrar resultado en consola
        console.log(resultado);

    } catch (error) {
        // 5. Capturar y mostrar cualquier error que ocurra en la ejecución
        console.error("Error al obtener datos:", error);
    }
};

// 6. Ejecutar la función para ver el listado de publicaciones con su clasificación
// obtenerPublicacionesConComentarios();

// Enunciado 3: Búsqueda específica de información
// Objetivo: consultar una publicación puntual y validar si tiene comentarios asociados.

// Definimos una función llamada "consultarPublicacionEspecifica"
const consultarPublicacionEspecifica = async (idPublicacion) => {
    try {
        // 1. Consultar lista completa de publicaciones desde el endpoint /posts
        let postsResponse = await fetch('http://localhost:3000/posts');
        let posts = await postsResponse.json();

        // 2. Buscar la publicación específica por su identificador
        //    Usamos find() para localizar el objeto cuyo id coincide con el solicitado.
        let publicacion = posts.find(post => Number(post.id) === Number(idPublicacion));

        // 3. Validar si la publicación existe
        //    Si no se encuentra, mostramos un mensaje y detenemos la ejecución.
        if (!publicacion) {
            console.log(`La publicación con id ${idPublicacion} no existe.`);
            return;
        }

        // 4. Consultar lista completa de comentarios desde el endpoint /comments
        let commentsResponse = await fetch('http://localhost:3000/comments');
        let comments = await commentsResponse.json();

        // 5. Filtrar comentarios relacionados con la publicación encontrada
        //    Seleccionamos solo aquellos cuyo postId coincide con el id de la publicación.
        let comentariosAsociados = comments.filter(c => Number(c.postId) === Number(publicacion.id));

        // 6. Construir el resultado con la información solicitada
        let resultado = {
            titulo: publicacion.title,                          // Título de la publicación
            contenido: publicacion.body,                        // Contenido de la publicación
            numeroComentarios: comentariosAsociados.length      // Número de comentarios asociados
        };

        // 7. Mostrar resultado en consola
        console.log(resultado);

    } catch (error) {
        // 8. Capturar y mostrar cualquier error que ocurra en la ejecución
        console.error("Error al obtener datos:", error);
    }
};

// 9. Ejecutar la función para consultar una publicación específica
//    En este ejemplo, consultamos la publicación con id = 3
consultarPublicacionEspecifica(7);
