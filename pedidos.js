const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize("delillah", "root", "", {
    host: "127.0.0.1",
    dialect: "mysql",
});
const { Orders, Order_Detail } = require("./models");

async function nuevoPedido(req, res) {

    let userId = req.user.user.id;
    console.log(userId);
    await Orders.create({

        status_id: 1,
        payment_id: req.body.payment_id,
        user_id: userId
    })
        .then((data) => {

            req.body.details.forEach(detail => {
                Order_Detail.create({
                    order_id: JSON.stringify(data.id),
                    product_id: detail.product_id,
                    product_quantity: detail.product_quantity
                })
            })
        })
        .then(result => {
            res.status(200).json({ msg: "Orden creada correctamente" })
        })
        .catch(err => {
            console.log(err);
            res.status(400).send("Error en la carga del pedido, intente en otro momento")
        });
};

async function detallePedido(req, res) {

    await Orders.findAll()
        .then(result => {
            if (JSON.stringify(result) == "[]") {
                res.status(404).send("No existe ningun pedido en el sistema");
            } else {
                sequelize.query(`SELECT
                        od.id,
                        st.status_name,
                        pr.prod_name,
                        od.product_quantity,
                        pr.prod_price,
                        pr.prod_price * od.product_quantity subtotal
                        FROM order_details od
                        JOIN products pr ON od.product_id = pr.id
                        JOIN orders ord ON ord.id = od.order_id
                        JOIN statuses st ON ord.status_id = st.id
                        WHERE ord.id = ${req.params.id}`,
                    { type: QueryTypes.SELECT })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).send("Error al realizar la consulta, intente nuevamente");
                    })
            }
        })
        .catch(err => {
            res.status(400).send("Error en la consulta. Intente nuevamente");
        })
};

async function consultaPedidos(req, res) {

    await Orders.findAll()
        .then(result => {
            if (JSON.stringify(result) == "[]") {
                res.status(404).send("No existe ningun pedido en el sistema");
            } else {
                sequelize.query(`SELECT
                        ord.id,
                        ord.order_date,
                        st.status_name,
                        pay.payment_name,
                        p.prod_name,
                        od.product_quantity,
                        p.prod_price,
                        p.prod_price * od.product_quantity subtotal,
                        u.fullname,
                        u.user,
                        u.address,
                        u.phone,
                        u.email
                        FROM orders ord
                        JOIN order_details od ON ord.id = od.order_id
                        JOIN products p ON od.product_id = p.id
                        JOIN users u ON u.id = ord.user_id
                        JOIN payments pay ON pay.id = ord.payment_id
                        JOIN statuses st ON st.id = ord.status_id   
                        `,
                    { type: QueryTypes.SELECT })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => {
                        res.status(400).send("Error al realizar la consulta, intente nuevamente");
                    });
            }
        })
        .catch(err => {
            res.status(400).send("Error en la consulta. Intentelo nuevamente mas tarde");
        });

};

async function modificarPedido(req, res) {
    const idCaso = req.params.id;

    await Orders.findAll({
        where: {
            id: idCaso
        }
    })
        .then(result => {
            if (JSON.stringify(result) == "[]") {
                res.status(404).send("No existe ningun pedido");
            } else {
                Orders.update({
                    status_id: req.body.status_id
                }, {
                    where: {
                        id: idCaso
                    }
                })
                    .then(result => {
                        res.status(200).json({ msg: "Estado actualizado correctamente" })
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

async function eliminarPedido(req, res) {
    const idCaso = req.params.id;

    await Orders.findAll({
        where: {
            id: idCaso
        }
    })
        .then(result => {
            if (JSON.stringify(result) == "[]") {
                res.status(404).send("No existe ningun pedido");
            } else {
                Orders.destroy({
                    where: {
                        id: idCaso
                    }
                })
                    .catch(err => {
                        res.status(400).send("Ha habido un error. Intente mas tarde");

                    });
                Order_Detail.destroy({
                    where: {
                        order_id: idCaso
                    }
                })
                    .then(result => {
                        res.status(200).json({ msg: "Pedido eliminado correctamente" });
                    })
                    .catch(err => {
                        res.status(400).send("Ha habido un error. Intente mas tarde");
                    });
            }
        })
        .catch(err => {
            res.status(400).send("Ha habido un error en la consulta. intente nuevamente mas tarde");
        });

};

module.exports = {
    nuevoPedido,
    detallePedido,
    consultaPedidos,
    modificarPedido,
    eliminarPedido
};