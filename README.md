# Delillah-Resto

API REST para el backend de un servicio de comidas online

# Dependencias

Las dependencias utilizadas son:

- body-parser
- express
- helmet
- jsonwebtoken
- mysql2
- sequelize

# Servidor

  Para iniciar el servidor:

- Instalar la dependencia "express"
- Dentro del archivo "server.js" se puede ver que el puerto que se esta utilizando es el 3000. En caso de querer modificarlo, solo necesita cambiar el numero en cuestion

# Base de Datos

Dentro del archivo "delillah.sql", se encuentra la informacion necesaria para crear la base de datos.
Se recomienda usar HeidiSQL para la visualizacion de la misma.

# Endpoints

- Usuarios:

    post/user
    post/user/login
    get/user
    put/user
    delete/user/:id

- Productos:

    post/products
    get/products
    get/products/:id
    put/products/:id
    delete/products/:id

- Pedidos:

    post/order
    get/order
    get/order/:id
    put/order/:id
    delete/order/:id