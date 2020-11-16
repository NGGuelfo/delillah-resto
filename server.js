const {nuevoProducto,misProductos,detalleProducto,modificarProducto,eliminarProducto} = require("./productos");
const {nuevoPedido,detallePedido,consultaPedidos,modificarPedido,eliminarPedido} = require("./pedidos");
const {checkAdmin, validarUsuario} = require ("./middlewares");
const express = require('express');
const bp = require('body-parser');
const helmet = require('helmet');

const app = express();
bp.json();

app.use(bp);
app.use(helmet());
app.listen(3000, function () {

    console.log("Server Iniciado");
});

//Endpoints Usuario
app.post('/user');
app.post('/user/login');
app.get('/user', checkAdmin);
app.put('/user', validarUsuario);
app.delete('/user/:id', checkAdmin);

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