const { Products } = require("./models");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("delillah", "root", "", {
    host: "127.0.0.1",
    dialect: "mysql",
});

async function nuevoProducto(req, res) {

    await Products.findAll({

        where: {
            prod_name: req.body.prod_name
        }
    })
        .then(data => {
            if (JSON.stringify(data) !== '[]') {
                res.status(400).send("el producto ingresado ya existe, intente con otro");
            } else {
                Products.create({
                    prod_name: req.body.prod_name,
                    prod_detail: req.body.prod_detail,
                    prod_price: req.body.prod_price,
                    prod_img: req.body.prod_img,
                    prod_isFav: 0
                })
                    .then(result => {
                        res.status(201).json({ msg: "El producto fue creado correctamente" });
                    })
                    .catch(err => {
                        res.status(400).send("Hubo un error en la creacion del producto. Intente mas tarde");
                    });
            }
        })
        .catch(err => {
            res.status(400).send("Ha habido un error en su consulta, intente nuevamente mas tarde");
        });
};

async function misProductos(req, res) {
    await Products.findAll()
    .then(result => {
        if(JSON.stringify(result) != "[]"){
            res.status(200).json({productos: result});
        } else{
            res.status(404).send("No hay productos cargados en el sistema");
        }
    })
    .catch(err => {
        res.status(400).send("Ha habido un error en la consulta. Intente nuevamente mas tarde");
    });
 };

async function detalleProducto(req, res) { 
    const idProd = req.params.id;

    await Products.findByPk(idProd)
    .then(result => {
        if(result != null){
            res.status(200).json({producto: result});
        } else {
            res.status(404).send("El producto no existe o es incorrecto. Vuelva a intentarlo");
         }
    })
    .catch(err => {
        res.status(400).send("Ha habido un error en la consulta. Intentelo mas tarde");
    });
};

async function modificarProducto(req, res) {
    const idProd = req.params.id;

    await Products.findAll({
        where: {
            id: idProd
        }
    })
    .then(result => {
        if (JSON.stringify(result) == "[]") {
            res.status(404).send("No existe ningun producto");
        } else {
            Products.update({
                prod_name: req.body.prod_name,
                prod_detail: req.body.prod_detail,
                prod_price: req.body.prod_price,
                prod_img: req.body.prod_img,
                prod_isFav: req.body.prodfav
            }, {
                where: {
                    id: idProd
                }
            })
                .then(result => {
                   res.status(200).json({ msg: "Producto actualizado correctamente" })
                })
                .catch(err => {
                   res.status(400).send("Error en la actualizacion, intente mas tarde");
                });
        }
    })
    .catch(err => {
        res.status(400).send("Ha habido un error en la consulta. intente nuevamente mas tarde");
    });
    
 };

async function eliminarProducto(req, res) {

    const idProd = req.params.id;

   await Products.findAll({
        where: {
            id: idProd
        }
    })
    .then(result => {
        if (JSON.stringify(result) == "[]") {
            res.status(404).send("El producto buscado no existe");
        } else {
            Products.destroy({
                where: {
                    id: idProd
                }
            })
            .then(result => {
                res.status(200).json({msg: "producto eliminado"});
            })
                .catch(err => {
                    res.status(400).send("Ha habido un error. Intente mas tarde");
    
                });
        }
    })
    .catch(err => {
        res.status(400).send("Error en la consulta, intente nuevamente mas tarde");
    });

    
};


module.exports = {
    nuevoProducto,
    misProductos,
    detalleProducto,
    modificarProducto,
    eliminarProducto
}