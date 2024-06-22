const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const hospitalesRoutes = require('./routes/hospitales');
const usuariosRoutes = require('./routes/usuarios');
const productosRoutes = require('./routes/productos');
const insumoRoutes = require('./routes/insumos');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

const corsOptions = {
  origin: 'http://localhost:4200', // Origen de tu aplicación Angular
  optionsSuccessStatus: 200 // Algunos navegadores (Chrome) necesitan esta configuración
};

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/hospitales', hospitalesRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/productos', productosRoutes);
app.use('/insumos', insumoRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
