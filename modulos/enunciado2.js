// Enunciado 2: Publicaciones con y sin comentarios
// Objetivo: identificar cuáles publicaciones tienen comentarios asociados y cuáles no.

// Definimos una función llamada "obtenerPublicacionesConComentarios"
export const obtenerPublicacionesConComentarios = async () => {
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