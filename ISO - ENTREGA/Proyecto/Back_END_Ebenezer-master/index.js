/* Librerias a ultilizar */
require('dotenv').config();

/* Inicialización de variables */
const Express = require('express');
const Logger = require('morgan');
const BodyParser = require('body-parser');
const StageBundle = require('./config.json');
const StageConfig = StageBundle.development;
const APP = Express();
const Router = Express.Router();
const InventarioRoutes = require('./routes/inventario.Routes.js');
const ContabilidadRoutes = require('./routes/contabilidad.Routes.js');
var Oracledb = require('oracledb');
var Log = require('./log.js');


/* Configurando peticiones */
APP.use(BodyParser.json());
APP.use(BodyParser.urlencoded({
    extended: true
}));

/* Hacer Commit atomatico */
Oracledb.autoCommit = true;

/* Configurando CORS */
APP.use((Request, Response, Next) => {
    Response.header('Access-Control-Allow-Origin', '*');
    Response.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    Response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    Response.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    Next();
});

/* Configurando Middleware de BD */
APP.use((Request, Response, Next) => {
    Oracledb.getConnection({
            user: process.env.BD_USER,
            password: process.env.BD_PASSWORD,
            connectString: process.env.BD_CONECTIONSTRING
        },
        (Error, Conn) => {
            if (Error) {
                Log.ImprimirLogError("Ocurrio un error al inicializar la conexión con la base de datos", Error, 'Sin parametros');
                Response.json({
                    Codigo_Respuesta: -5,
                    Estado: 'Error',
                    Mensaje: 'Ocurrio un error al conectar con la base de datos.'
                });
            } else {
                Request.BD = Conn;
                Request.Log = Log;
                Next();
            }
        });
});

/* Pretty Print */
APP.set('json spaces', 2);

/* Inicializando morgan para depurar las peticiones */
APP.use(Logger('dev'));

/* Definiendo las rutas */
APP.use('/api/v1', Router);
InventarioRoutes(Router);
ContabilidadRoutes(Router);



/* Configurando Listener de la APP */
APP.listen(`${StageConfig.node_port}`, () => {
    console.log(`-> El servidor esta arriba en el puerto :${StageConfig.node_port}`);
});

module.exports = APP;