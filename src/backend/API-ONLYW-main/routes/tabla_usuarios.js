const express = require("express");
const Router = express.Router();
const mysqlConexion = require("../conexion");

// Ruta para obtener todos los usuarios
Router.get("/", (req, res) => {
    mysqlConexion.query("SELECT * from usuarios", (err, rows) => {
        if (err) {
            console.error("Error en la consulta:", err);
            res.status(500).send("Error en la consulta a la base de datos");
        } else {
            res.json(rows);
        }
    });
});

// Ruta para manejar el login
Router.post("/", (req, res) => {
    const { username, password } = req.body;
    mysqlConexion.query(
        "SELECT * FROM usuarios WHERE email = ? AND contra = ?",
        [username, password],
        (err, rows) => {
            if (err) {
                console.error("Error en la consulta:", err);
                res.status(500).send("Error en la consulta a la base de datos");
            } else {
                if (rows.length > 0) {
                    res.json({ success: true, user: rows[0] });
                } else {
                    res.json({ success: false, message: "Credenciales inválidas" });
                }
            }
        }
    );
});

module.exports = Router;
