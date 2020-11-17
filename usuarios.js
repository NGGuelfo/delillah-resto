const { Sequelize} = require("sequelize");
const sequelize = new Sequelize("delillah", "root", "", {
    host: "127.0.0.1",
    dialect: "mysql",
});
const {Users} = require("./models");

async function crearUsuario(req,res){};

async function login(req,res){};

async function misUsuarios(req,res){};

async function modificarUsuario(req,res){};

async function eliminarUsuario(req,res){};

module.exports = {
    crearUsuario,
    login,
    misUsuarios,
    modificarUsuario,
    eliminarUsuario
}