const {nuevoProducto,misProductos,detalleProducto,modificarProducto,eliminarProducto} = require("./productos");
const {nuevoPedido,detallePedido,consultaPedidos,modificarPedido,eliminarPedido} = require("./pedidos");
const {checkAdmin, validarUsuario} = require ("./middlewares");
const {login, misUsuarios, modificarUsuario, eliminarUsuario, crearUsuario} = require("./usuarios");
const express = require('express');
const bp = require('body-parser');
const helmet = require('helmet');
const app = express();

app.use(bp.json());
app.use(helmet());
app.listen(3000, function () {

    console.log("Server Iniciado");
});

//Endpoints Usuario
app.post('/user', crearUsuario);
app.post('/user/login', login);
app.get('/user', checkAdmin, misUsuarios);
app.put('/user/:id', validarUsuario, modificarUsuario);
app.delete('/user/:id', checkAdmin, eliminarUsuario);

//Endpoints Productos
app.post('/products', checkAdmin, nuevoProducto);
app.get('/products', checkAdmin, misProductos);
app.get('/products/:id', validarUsuario, detalleProducto);
app.put('/products/:id', checkAdmin, modificarProducto);
app.delete('/products/:id', checkAdmin, eliminarProducto);

//Endpoints Pedidos
app.post('/order', validarUsuario, nuevoPedido);
app.get('/order', checkAdmin, consultaPedidos);
app.get('/order/:id', validarUsuario, detallePedido);
app.put('/order/:id', checkAdmin, modificarPedido);
app.delete('/order/:id', checkAdmin, eliminarPedido);