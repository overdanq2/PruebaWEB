const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// Configuración de multer para el manejo de archivos
const upload = multer({ dest: 'imagenes/' });



// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
    host: '10.0.6.39',
    user: 'estudiante',
    password: 'Info-2023',
    database: 'HeladeriaCS'
});
//Verificacion de errores para validar si la conexion es correcta
connection.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conexión exitosa a la base de datos.');
});

app.use(express.urlencoded({extended: true}));
app.use('/imagenes', express.static(path.join(__dirname, 'imagenes')));

app.post('/subir_imagenes', upload.single('imagen'), (req, res) =>{
    const {nombre, descripcion} = req.body;
    const imagen = req.file.filename;
    const sql = 'INSERT INTO imagenes (nombre, descripcion, imagen) VALUES (?, ?, ?)';
    connection.query(sql, [nombre, descripcion, imagen], (err) =>{
        if(err) throw err;
        res.redirect('/');
    });
});
//Envio los datos del formulario por url
app.use(express.urlencoded({ extended: true }));
//Convierto en formato json
app.use(express.json());
//Configuro para que la aplicacon inicie desde el director o carpeta pagina principal
app.use(express.static(path.join(__dirname, 'pagina_principal')));
//Recibo los valores y los envio a la tabla
app.post('/guardar_helado',(req, res) => {
    const { nombre, descripcion, sabor, tipo, cobertura, precio } = req.body;
    const sql = 'INSERT INTO Helado (nombre, descripcion, sabor, tipo, cobertura, precio) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(sql, [nombre, descripcion, sabor, tipo, cobertura, precio], (err, result) => {
        if (err) throw err;
        console.log('Helado insertada correctamente.');
        res.redirect('/listardatos.html');
    });
});
//Ruta para mostrar las películas en el listardatos.html con metodo GET
app.get('/helados', (req, res) => {
    //Realiza una consulta SQL para seleccionar todas las filas de la tabla "Heladeria"
    connection.query('SELECT * FROM Helado', (err, rows) => {
        //Maneja los errores, si los hay
        if (err) throw err;
        res.send(rows); //Aquí puedes enviar la respuesta como quieras (por ejemplo, renderizar un HTML o enviar un JSON)
    });
});
// Ruta para obtener los datos de una película por su ID
app.get('/helado_especifico/:id', (req, res) => {
    // Extraer el ID de los parámetros de la solicitud
    const id = req.params.id;
    // Ejecutar una consulta SQL para obtener los datos de la película con el ID proporcionado
    connection.query('SELECT * FROM Helado WHERE id = ?', [id], (err, result) => {
        if (err) {
            // Manejar el error si ocurre durante la consulta
            console.error('Error al obtener los datos de la película:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        // Verificar si no se encontró ninguna película con el ID proporcionado
        if (result.length === 0) {
            res.status(404).send('Película no encontrada');
            return;
        }
        // Enviar los datos de la película como respuesta en formato JSON
        res.json(result[0]);
    });
});
app.post('/guardar_usuario', (req, res) => {
    const { nombre, apellido, correo, direccion, cursos } = req.body;
    const sql = 'INSERT INTO usuarios (correo, contraseña) VALUES (?, ?)';
    connection.query(sql, [correo, contraseña], (err, result) => {
        if (err) throw err;
        console.log('usuario inscrito correctamente.');
        res.redirect('/');
    });
});