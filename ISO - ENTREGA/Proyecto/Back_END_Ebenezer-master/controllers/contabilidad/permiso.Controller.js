/* Se carga la capa de acceso a datos de esta entidad */
const permisoDao = require('../../models/contabilidad/moneda.Dao.js');



exports.ObtenerListaPermisos = async(Request, Response) => {
    await permisoDao.GetAll(Request.BD)
        .then(function(Monedas) {
                Response.status(200).send(Monedas);
            },
            function(Excepcion) {
                Request.Log.ImprimirLogError("Ocurrio un error al hacer un Get al controlador Permiso", Excepcion, JSON.stringify(Request.body));
                Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al ejecutar la solicitud.' }));
            });
};

exports.ObtenerListaPermisosCargo = async(Request, Response) => {
    await permisoDao.GetByID(Request.BD, Request.params.id)
        .then(function(Monedas) {
                Response.status(200).send(Monedas);
            },
            function(Excepcion) {
                Request.Log.ImprimirLogError("Ocurrio un error al hacer un Get al controlador Permiso", Excepcion, JSON.stringify(Request.body));
                Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al ejecutar la solicitud.' }));
            });
};

exports.InsertarPermiso = async(Request, Response) => {
    let Errores = "";

    if (Request.body.ID_Cargo == null || Request.body.ID_Cargo == "") {
        Errores = Errores + 'No se ingreso ningun id de cargo.';
    }

    if (Request.body.ID_Modulo == null || Request.body.ID_Modulo == "") {
        Errores = Errores + 'No se ingreso ningun id de modulo.';
    }

    if (Errores == "") {
        await permisoDao.Post(Request.BD, Request.body)
            .then(function(Resultado) {
                    Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se inserto correctamente el permiso.' }));
                },
                function(Excepcion) {
                    let Error = (Excepcion.errorNum == 1) ? 'No se puede insertar el permiso porque ya existe uno igual.' : 'Ocurrio un error al insertar el permiso.';
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Post al controlador Permiso", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: Error }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};

exports.EliminarPermiso = async(Request, Response) => {
    let Errores = "";

    if (Request.body.ID_Cargo == null || Request.body.ID_Cargo == "") {
        Errores = Errores + 'No se ingreso ningun id de cargo.';
    }

    if (Request.body.ID_Modulo == null || Request.body.ID_Modulo == "") {
        Errores = Errores + 'No se ingreso ningun id de modulo.';
    }

    if (Errores == "") {
        await permisoDao.Delete(Request.BD, Request.body)
            .then(function(Resultado) {
                    console.log(Resultado);
                    Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se elimino correctamente el permiso.' }));
                },
                function(Excepcion) {
                    let Error = (Excepcion.errorNum == 2292) ? 'No se puede eliminar el permiso porque existe algun registro relacionado con el.' : 'Ocurrio un error al eliminar el permiso';
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Delete al controlador Permiso", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: Error }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};