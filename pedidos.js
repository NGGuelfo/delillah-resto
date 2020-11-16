const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize("delillah", "root", "", {
    host: "127.0.0.1",
    dialect: "mysql",
});
const { Orders, Order_Detail, Payment, Status } = require("./models");

async function nuevoPedido(req, res) {

    let pedido;
    let userId = req.user.existe[0].id;
    await Orders.create({

        status_id: 1,
        payment_id: req.body.payment_id,
        user_id: userId
    })
        .then((data) => {

            req.body.details.forEach(detail => {
                Order_Detail.create({
                    order_id: JSON.stringify(data[0]),
                    product_id: detail.product_id,
                    product_quantity: detail.product_quantity
                })
            })
        })
        .then(result => {
            res.status(200).json({ msg: "Orden creada correctamente" })
        })
        .catch(err => {
            res.status(400).send("Error en la carga del pedido, intente en otro momento")
        });
};

async function detallePedido(req, res) {

    await sequelize.query(`SELECT
    od.id,
    st.status_name,
    pr.prod_name,
    od.product_quantity,
    pr.prod_price,
    prod.prod_precio * od.product_quantity
    FROM order_detail od
    JOIN products pr ON od.product_id = pr.id
    JOIN orders or ON or.id = od.order_id
    JOIN status st ON st.id = or.status_id
    WHERE or.id = ${req.params.id}`,
        { type: QueryTypes.SELECT })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(400).send("Error al realizar la consulta, intente nuevamente", err);
        })
};

async function consultaPedidos(req, res) {

    await sequelize.query(`SELECT
    or.id,
    or.order_date,
    st.status_name,
    pay.payment_name,
    pr.prod_name,
    od.product_quantity,
    pr.prod_price,
    prod.prod_precio * od.product_quantity
    u.fullname,
    u.user,
    u.address,
    u.phone,
    u.email
    FROM orders or
    JOIN order_detail od ON or.id = od.order_id
    JOIN products p ON od.product_id = p.id
    JOIN users u ON u.id = or.user_id
    JOIN payment pay ON pay.id = or.payment_id
    JOIN status st ON st.id = or.status_id   
    `,
        { type: QueryTypes.SELECT })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(400).send("Error al realizar la consulta, intente nuevamente", err);
        });
};

async function modificarPedido(req, res) {
    const idCaso = req.params.id;
    let pedidosTraidos = await Orders.findAll({
        where: {
            id: idCaso
        }
    });
    if (pedidosTraidos.length < 1) {
        return res.status(404).send("No existe ningun pedido");
    } else {
        await Orders.update({
            status_id: req.body.status
        }, {
            where: {
                id: idCaso
            }
        })
            .then(result => {
                return res.status(200).json({ msg: "Estado actualizado correctamente" })
            })
            .catch(err => {
                return res.status(400).send("Error en la actualizacion, intente mas tarde", err);
            });
    }
};

async function eliminarPedido(req, res) {
    const idCaso = req.params.id;
    let pedidosTraidos = await Orders.findAll({
        where: {
            id: idCaso
        }
    });
    if (pedidosTraidos.length < 1) {
        return res.status(404).send("No existe ningun pedido");
    } else {
        await Orders.destroy({
            where: {
                id: idCaso
            }
        })
            .catch(err => {
                return res.status(400).send("Ha habido un error. Intente mas tarde", err);

            });
        await Order_Detail.destroy({
            where: {
                order_id: idCaso
            }
        })
            .then(result => {
                return res.status(200).json({ msg: "Pedido eliminado correctamente" });
            })
            .catch(err => {
                return res.status(400).send("Ha habido un error. Intente mas tarde", err);
            });
    }
};

module.exports = {
    nuevoPedido,
    detallePedido,
    consultaPedidos,
    modificarPedido,
    eliminarPedido
};