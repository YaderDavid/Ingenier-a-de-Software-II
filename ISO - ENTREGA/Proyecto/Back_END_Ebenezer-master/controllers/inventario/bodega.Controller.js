/* Se carga la capa de acceso a datos de esta entidad */
const bodegaDao = require('../../models/inventario/bodega.Dao.js');



exports.ObtenerListaBodegas = async(Request, Response) => {
    await bodegaDao.GetAll(Request.BD)
        .then(function(Bodega) {
                Response.status(200).send(Bodega);
            },
            function(Excepcion) {
                Request.Log.ImprimirLogError("Ocurrio un error al hacer un Get al controlador Bodega", Excepcion, JSON.stringify(Request.body));
                Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al ejecutar la solicitud.' }));
            });
};


exports.InsertarBodega = async(Request, Response) => {
    let Errores = "";

    if (Request.body.Gaveta == null || Request.body.Gaveta == "") {
        Errores = Errores + 'No se ingreso ninguna gaveta';
    }

    if (Request.body.Estanteria == null || Request.body.Estanteria == "") {
        Errores = Errores + 'No se ingreso ninguna estanteria.';
    }

    if (Errores == "") {
        await bodegaDao.Post(Request.BD, Request.body)
            .then(function(Resultado) {
                    Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se inserto correctamente la ubicación.' }));
                },
                function(Excepcion) {
                    let Error = (Excepcion.errorNum == 1) ? 'No se puede insertar la ubicación porque ya existe.' : 'Ocurrio un error al insertar la ubicación';
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Post al controlador Ubicacion", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: Error }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};


exports.EliminarBodega = async(Request, Response) => {
    let Errores = "";

    if (Request.body.Gaveta == null || Request.body.Gaveta == "") {
        Errores = Errores + 'No se ingreso ninguna gaveta';
    }

    if (Request.body.Estanteria == null || Request.body.Estanteria == "") {
        Errores = Errores + 'No se ingreso ninguna estanteria.';
    }

    if (Errores == "") {
        await bodegaDao.Delete(Request.BD, Request.body)
            .then(function(Resultado) {
                    Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se elimino correctamente la ubicación.' }));
                },
                function(Excepcion) {
                    let Error = (Excepcion.errorNum == 2292) ? 'No se puede eliminar la ubicación porque existe algun registro relacionado con ella.' : 'Ocurrio un error al eliminar la ubicación';
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Delete al controlador Permiso", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: Error }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};