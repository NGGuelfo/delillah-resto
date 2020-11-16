//Inicializo los requerimientos necesarios y la conexion a la base de datos
const {Users} = require("./models");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:3306/dellilah");
//Genero el token y la firma de seguridad
const jwt = require("jsonwebtoken");
const firma = "DeliResto";

//Funcion para crear un nuevo usuario en la base de datos
async function crearUsuario (req,res){

    await Users.create({
        user: req.body.user,
        password: req.body.password,
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        is_admin: 0
    })
    .then(data =>{
        //Si se pudo crear el usuario correctamente, entro aca
        return res.status(201).json({ msg: "Usuario Creado!"});
    })
    .catch(err =>{
        //si hubo un problema en la solicitud, entro aca
        return res.status(400).send("Error al crear usuario");
    });
}

async function logueoUsuario(req,res){

    let existe = Users.findAll({
        where: {
            [Sequelize.or]:[
            { user: req.body.user},
            { email: req.body.email}
            ]
        }
    });

    const token = jwt.sign(existe[0].dataValues, firma);
    return res.status(200).json({msg: "Bienvenido a Dellilah", user: existe[0].dataValues.user, token: token});
}
module.exports = {
    crearUsuario
}