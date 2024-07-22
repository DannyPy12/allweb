const express = require("express");
const Router = express.Router();
const mysqlConexion = require("../conexion");

Router.get("/", (req, res) => {
    mysqlConexion.query("SELECT * from plantas", (err, rows) => {
        if (err) {
            console.error("Error en la consulta:", err);
            res.status(500).send("Error en la consulta a la base de datos");
        } else {
            res.json(rows);
        }
    });
});

module.exports = Router;
