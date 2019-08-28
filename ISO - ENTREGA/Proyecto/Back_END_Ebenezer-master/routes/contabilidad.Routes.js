/* Definiendo controladores del modulo */
const cargoController = require('../controllers/contabilidad/cargo.Controller.js');
const empleadoController = require('../controllers/contabilidad/empleado.Controller.js');
const autenticacionController = require('../controllers/contabilidad/autenticacion.Controller.js');

/* Middleware de autorización */
const Auth = require('../middlewares/jwt');

module.exports = function(Router) {

    /* Rutas para el controlador de productos */
    Router.get('/Contabilidad/Cargo', cargoController.ObtenerListaCargos);
    Router.post('/Contabilidad/Cargo', cargoController.InsertarCargo);
    Router.put('/Contabilidad/Cargo', cargoController.ActualizarCargo);
    Router.delete('/Contabilidad/Cargo', cargoController.EliminarCargo);

    /* Rutas para el controlador de empleados */
    Router.get('/Contabilidad/Empleado', empleadoController.ObtenerListaEmpleados);
    Router.get('/Contabilidad/Empleado/:id', empleadoController.ObtenerEmpleado);
    Router.post('/Contabilidad/Empleado', empleadoController.InsertarEmpleado);
    Router.put('/Contabilidad/Empleado', empleadoController.ActualizarEmpleado);
    Router.delete('/Contabilidad/Empleado', empleadoController.EliminarEmpleado);

    /* Rutas para el controlador de login */
    Router.post('/Contabilidad/Login', autenticacionController.VerificarUsuario);
    Router.put('/Contabilidad/Login', autenticacionController.RestablecerCredenciales);

};