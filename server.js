const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión con MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia esto si tu usuario es diferente
    password: '', // Si tienes contraseña, agrégala aquí
    database: 'geolocalizacion'
});

// Conectar a MySQL
db.connect(err => {
    if (err) {
        console.error('Error al conectar a MySQL:', err);
        return;
    }
    console.log('Conectado a MySQL');
});

// Ruta para guardar medición
app.post('/guardar', (req, res) => {
    const { nombre, empresa, latitud, longitud } = req.body;

    if (!nombre || !empresa || !latitud || !longitud) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = 'INSERT INTO mediciones (nombre, empresa, latitud, longitud) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, empresa, latitud, longitud], (err, result) => {
        if (err) {
            console.error('Error al guardar en MySQL:', err);
            return res.status(500).json({ error: 'Error al guardar en la base de datos' });
        }
        res.json({ message: 'Medición guardada correctamente', id: result.insertId });
    });
});

// Iniciar servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
