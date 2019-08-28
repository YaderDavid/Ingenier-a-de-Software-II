/* Se carga la capa de acceso a datos de esta entidad */
const cargoDao = require('../../models/contabilidad/cargo.Dao.js');



exports.ObtenerListaCargos = async(Request, Response) => {
    await cargoDao.GetAll(Request.BD)
        .then(function(Cargos) {
                Response.status(200).send(Cargos);
            },
            function(Excepcion) {
                Request.Log.ImprimirLogError("Ocurrio un error al hacer un Get al controlador Cargo", Excepcion, JSON.stringify(Request.body));
                Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al ejecutar la solicitud.' }));
            });
};

exports.InsertarCargo = async(Request, Response) => {
    let Errores = "";
    if (Request.body.Descripcion == null || Request.body.Descripcion == "") {
        Errores = Errores + 'No se ingreso ninguna descripcion';
    }
    if (Errores == "") {
        await cargoDao.Post(Request.BD, Request.body)
            .then(function(Resultado) {
                    Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se inserto correctamente el cargo.' }));
                },
                function(Excepcion) {
                    let Error = (Excepcion.errorNum == 1) ? 'No se puede insertar el cargo porque ya existe un ID con ese cargo.' : 'Ocurrio un error al insertar el cargo';
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Post al controlador Cargo", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: Error }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};

exports.ActualizarCargo = async(Request, Response) => {
    let Errores = "";
    if (Request.body.Descripcion == null || Request.body.Descripcion == "") {
        Errores = Errores + 'No se ingreso ninguna descripcion\n';
    }
    if (Request.body.ID_Cargo == null || Request.body.ID_Cargo == "") {
        Errores = Errores + 'No se ingreso el ID del cargo';
    }
    if (Errores == "") {
        await cargoDao.Put(Request.BD, Request.body)
            .then(function(Resultado) {
                    Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se actualizo correctamente el cargo.' }));
                },
                function(Excepcion) {
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Put al controlador Cargo", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al actualizar el cargo.' }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};

exports.EliminarCargo = async(Request, Response) => {
    let Errores = "";
    if (Request.body.ID_Cargo == null || Request.body.ID_Cargo == "") {
        Errores = Errores + 'No se ingreso el ID del cargo';
    }
    if (Errores == "") {
        await cargoDao.Delete(Request.BD, Request.body)
            .then(function(Resultado) {
                    console.log(Resultado);
                    Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se elimino correctamente el cargo.' }));
                },
                function(Excepcion) {
                    let Error = (Excepcion.errorNum == 2292) ? 'No se puede eliminar el cargo porque existe algun registro relacionado con este.' : 'Ocurrio un error al eliminar el cargo';
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Delete al controlador Cargo", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: Error }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};