// Enunciado 4: Eliminación lógica y validación de datos
// Objetivo: antes de eliminar una publicación, validar si tiene comentarios asociados.

// Definimos una función llamada "eliminarPublicacion"
export const eliminarPublicacion = async (idPublicacion) => {
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

        // 5. Verificar si la publicación tiene comentarios asociados
        //    Seleccionamos solo aquellos cuyo postId coincide con el id de la publicación.
        let comentariosAsociados = comments.filter(c => Number(c.postId) === Number(publicacion.id));

        if (comentariosAsociados.length > 0) {
            // Caso: la publicación tiene comentarios → no se elimina
            console.log("No se puede eliminar la publicación porque tiene comentarios");
            return;
        }

        // 6. Si no tiene comentarios, ejecutar la eliminación con método DELETE
        await fetch(`http://localhost:3000/posts/${idPublicacion}`, {
            method: 'DELETE'
        });

        // 7. Validar el resultado mediante una nueva consulta
        //    Si el servidor devuelve 404, significa que la publicación ya no existe.
        let validarResponse = await fetch(`http://localhost:3000/posts/${idPublicacion}`);
        if (validarResponse.status === 404) {
            console.log("Publicación eliminada correctamente");
        } else {
            console.log("Error: la publicación aún existe");
        }

    } catch (error) {
        // 8. Capturar y mostrar cualquier error que ocurra en la ejecución
        console.error("Error al procesar la eliminación:", error);
    }
};

// 9. Ejecutar la función para intentar eliminar una publicación específica
//    En este ejemplo, consultamos la publicación con id = 5
// eliminarPublicacion(1);
