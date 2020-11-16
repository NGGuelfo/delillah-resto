const { Products } = require("./models");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("delillah", "root", "", {
    host: "127.0.0.1",
    dialect: "mysql",
});

async function nuevoProducto(req, res) {

    await Products.findAll({

        where: {
            prod_name: req.body.prodname
        }
    })
        .then(data => {
            if (JSON.stringify(data) !== '[]') {
                res.status(400).send("el producto ingresado ya existe, intente con otro");
            } else {
                await Products.create({
                    prod_name: req.body.prodname,
                    prod_price: req.body.prodprice,
                    prod_img: req.body.prodimg,
                    prod_isFav: 0
                })
                    .then(result => {
                        res.status(201).json({ msg: "El producto fue creado correctamente" });
                    })
                    .catch(err => {
                        res.status(400).send("Hubo un error en la creacion del producto. Intente mas tarde", err);
                    });
            }
        })
        .catch(err => {
            res.status(400).send("Ha habido un error en su consulta, intente nuevamente mas tarde", err);
        });
};

async function misProductos(req, res) { };

async function productoPorId(req, res) { };

async function modificarProducto(req, res) { };

async function elminarProdcuto(req, res) {

    const idProd = req.params.id;

    let productosTraidos = await Products.findAll({
        where: {
            id: idProd
        }
    });
    if (productosTraidos.length < 1) {
        return res.status(404).send("El producto buscado no existe");
    } else {
        await Products.destroy({
            where: {
                id: idProd
            }
        })
            .catch(err => {
                return res.status(400).send("Ha habido un error. Intente mas tarde", err);

            });
    }
};


module.exports = {
    nuevoProducto,
    misProductos,
    productoPorId,
    modificarProducto,
    elminarProdcuto
}