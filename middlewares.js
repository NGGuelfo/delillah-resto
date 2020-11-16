const jwt = require("jsonwebtoken");
const firma = "DeliResto";


function checkAdmin(req,res,next){

    const token = req.headers.authorization.split('')[1];
    const veri = jwt.verify(token,firma);
    if(!veri){
        res.status(400).send("Debe ser al menos administrador para poder acceder a la informacion");
    } else if (veri.usuario[0].is_admin === 1){
        {
            return next;
        }
    } else {
        res.status(400).send("Error en la validacion, intente nuevamente mas tarde");
    }
}

function validarUsuario(req,res,next){

    const token = req.headers.authorization.split('')[1];
    const veri = jwt.verify(token,firma);
    req.user = veri;
    if(!req.user){
        res.status(400).send("El usuario o contraseña ingresado no es correcto, intente nuevamente");
     } else if(req.user){
        return next;
     } else{
         res.status(400).send("Error en la validacion, intente nuevamente mas tarde");
     }
}

module.exports = {
    validarUsuario,
    checkAdmin
}