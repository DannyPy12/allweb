const mysql = require('mysql2');

const pool = mysql.createPool({
  host: "srv1247.hstgr.io",
  user: "u475816193_jess",
  password: "v4P7wMJoZ#",
  database: "u475816193_bdonlywater2",
  waitForConnections: true,
  connectionLimit: 10, // Ajusta según tus necesidades
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (!err) {
    console.log('Conectado a la base de datos MySQL');
    connection.release();
  } else {
    console.log('No está conectado, error:', err);
  }
});

setInterval(() => {
  pool.query('SELECT 1', (error) => {
    if (error) {
      console.error('Error manteniendo la conexión activa:', error);
    }
  });
}, 30000); // Cada 30 segundos

module.exports = pool;
