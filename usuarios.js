const { Sequelize, Op } = require("sequelize");
const sequelize = new Sequelize("delillah", "root", "", {
    host: "127.0.0.1",
    dialect: "mysql",
});
const { Users } = require("./models");
const jwt = require("jsonwebtoken");
const firma = "DeliResto";

async function crearUsuario(req, res) {
    await Users.findAll({
        where: {
            [Op.or]: [
                { user: req.body.username },
                { email: req.body.email }
            ]
        }
    })
        .then(result => {
            if (JSON.stringify(result) == "[]") {
                 Users.create({
                    user: req.body.username,
                    password: req.body.password,
                    fullname: req.body.fullname,
                    email: req.body.email,
                    phone: req.body.phone,
                    address: req.body.address,
                    is_admin: 0
                })
                    .then(data => {
                        res.status(201).json({ msg: "El usuario ha sido creado" });
                    })
                    .catch(err => {
                        res.status(400).send("Ha habido un error. Intente nuevamente mas tarde");
                    });
            } else {
                res.status(400).send("El usuario ya existe");
            }
        })
        .catch(err => {
            res.status(400).send("Ha habido un error en la consulta. intente nuevamente mas tarde");
        });
};

async function login(req, res) {
    await Users.findAll({
        where: {
            [Op.or]: [
                { user: req.body.username },
                { email: req.body.email }
            ]
        }
    })
        .then(result => {
            if (JSON.stringify(result) == "[]") {
                res.status(400).send("El usuario ingresado no existe");
            } else if (result[0].password !== req.body.password) {
                res.status(400).send("La contraseña ingresada no es correcta, intente nuevamente");
            } else {
                const user = result[0];
                const token = jwt.sign({ user }, firma);
                res.status(200).json({ token: token });
            }
        })
        .catch(err => {
            res.status(400).send("Error en la consulta. Intente nuevamente mas tarde", err);
        });
};

async function misUsuarios(req, res) {

    await Users.findAll()
        .then(result => {
            if (JSON.stringify(result) != "[]") {
                res.status(200).json({ usuarios: result });
            } else {
                res.status(404).send("No hay usuarios cargados en el sistema");
            }
        })
        .catch(err => {
            res.status(400).send("Ha habido un error en la consulta. Intentelo nuevamente", err);
        });
};

async function modificarUsuario(req, res) {
    const idUser = req.params.id;

    await Users.findAll({
        where: {
            id: idUser
        }
    })
        .then(result => {
            if (JSON.stringify(result) != "[]") {
                Users.update({
                    user: req.body.user,
                    password: req.body.password,
                    fullname: req.body.fullname,
                    email: req.body.email,
                    phone: req.body.phone,
                    address: req.body.address,
                })
                    .then(data => {
                        res.status(200).json({ msg: "El usuario ha sido actualizado" });
                    })
                    .catch(err => {
                        res.status(400).send("Error en la actualizacion de usuario", err);
                    });
            } else {
                res.status(404).send("El usuario buscado no existe, intente nuevamente", err);
            }
        })
        .catch(err => {
            res.status(400).send("Error en la consulta. Intente nuevamente mas tarde", err);
        });
};

async function eliminarUsuario(req, res) {
    const idUser = req.params.id;

    await Users.findAll({
        where: {
            id: idUser
        }
    })
        .then(result => {
            if(JSON.stringify(result) != "[]"){
                Users.destroy({
                    where: {
                        id: idUser
                    }
                })
                .catch(err => {
                    res.status(400).send("Error al eliminar el usuario", err);
                });
            } else {
                res.status(400).send("El usuario no existe o ya ha sido eliminado");
            }
        })
        .catch(err => {
            res.status(400).send("error en la consulta. Intente nuevamente mas tarde");
        });
 };

module.exports = {
    crearUsuario,
    login,
    misUsuarios,
    modificarUsuario,
    eliminarUsuario
}