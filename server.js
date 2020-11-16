const express = require ('express');
const bp = require('body-parser');
const helmet = require('helmet');

const app = express();
bp.json();

app.use(bp);
app.use(helmet());
app.listen(3000, function(){

    console.log("Server Iniciado");
});