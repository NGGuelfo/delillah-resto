const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("delillah", "root", "", {
    host: "127.0.0.1",
    dialect: "mysql",
});

async function connect() {

    try {
        await sequelize.authenticate();
        console.log("Conexion con base de datos exitosa");
    }
    catch (error) {
        console.error("La base de datos no se encuentra disponible en este momento, intente mas tarde", error);
    }
}


connect();
sequelize.sync({ force: false })
    .then(() => { console.log("Tablas sincronizadas"); })
    .catch((err) => { console.log("Ha ocurrido un error", err); });

const Users = sequelize.define("users", {


    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    user: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    fullname: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    phone: {
        type: DataTypes.INTEGER(20),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    is_admin: {
        type: DataTypes.INTEGER(1),
        allowNull: false
    }
});

const Products = sequelize.define("products", {

    id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    prod_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    prod_detail:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    prod_price: {
        type: DataTypes.INTEGER(4),
        allowNull: false
    },
    prod_img: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    prod_isFav: {
        type: DataTypes.INTEGER(1),
        allowNull: false
    },
});

const Orders = sequelize.define("orders", {

    id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    order_date: {
        type: DataTypes.DATE
    },
    status_id: {
        type: DataTypes.INTEGER(1),
        allowNull: false
    },
    payment_id: {
        type: DataTypes.INTEGER(1),
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    }
});

const Order_Detail = sequelize.define("order_details", {

    id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    order_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    product_quantity: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
});

const Payment = sequelize.define("payments", {

    id: {
        type: DataTypes.INTEGER(1),
        autoIncrement: true,
        primaryKey: true
    },
    payment_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
});

const Status = sequelize.define("statuses", {

    id: {
        type: DataTypes.INTEGER(1),
        autoIncrement: true,
        primaryKey: true
    },
    status_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
});

module.exports = {
    Users,
    Products,
    Orders,
    Order_Detail,
    Payment,
    Status
}