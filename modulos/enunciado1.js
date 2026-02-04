// Enunciado 1: Usuarios activos y sus publicaciones
// Objetivo: obtiene usuarios activos y cuenta sus publicaciones.

// Definimos una función llamada "obtenerUsuariosConPublicaciones"
export const obtenerUsuariosConPublicaciones = async () => {
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