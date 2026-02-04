// Enunciado 3: Búsqueda específica de información
// Objetivo: consultar una publicación puntual y validar si tiene comentarios asociados.

// Definimos una función llamada "consultarPublicacionEspecifica"
export const consultarPublicacionEspecifica = async (idPublicacion) => {
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
// consultarPublicacionEspecifica(7);