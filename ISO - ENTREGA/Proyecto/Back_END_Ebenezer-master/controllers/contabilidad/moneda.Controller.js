/* Se carga la capa de acceso a datos de esta entidad */
const monedaDao = require('../../models/contabilidad/moneda.Dao.js');



exports.ObtenerListaMonedas = async(Request, Response) => {
    await monedaDao.GetAll(Request.BD)
        .then(function(Monedas) {
                Response.status(200).send(Monedas);
            },
            function(Excepcion) {
                Request.Log.ImprimirLogError("Ocurrio un error al hacer un Get al controlador Moneda", Excepcion, JSON.stringify(Request.body));
                Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al ejecutar la solicitud.' }));
            });
};

exports.InsertarMoneda = async(Request, Response) => {
    let Errores = "";

    if (Request.body.Equivalencia_Dolar == null || Request.body.Equivalencia_Dolar == "") {
        Errores = Errores + 'No se ingreso ninguna equivalencia con el dolar';
    }

    if (Request.body.Nombre_Moneda == null || Request.body.Nombre_Moneda == "") {
        Errores = Errores + 'No se ingreso ningun nombre de la moneda';
    }

    if (Request.body.Codigo_Internacional == null || Request.body.Codigo_Internacional == "") {
        Errores = Errores + 'No se ingreso el codigo internacional de la moneda';
    }

    if (Errores == "") {
        await monedaDao.Post(Request.BD, Request.body)
            .then(function(Resultado) {
                    Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se inserto correctamente la moneda.' }));
                },
                function(Excepcion) {
                    let Error = (Excepcion.errorNum == 1) ? 'No se puede insertar la moneda porque ya existe un ID con esa moneda.' : 'Ocurrio un error al insertar la moneda';
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Post al controlador Moneda", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: Error }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};

exports.ActualizarMoneda = async(Request, Response) => {

    let Errores = "";

    if (Request.body.Equivalencia_Dolar == null || Request.body.Equivalencia_Dolar == "") {
        Errores = Errores + 'No se ingreso ninguna equivalencia con el dolar';
    }

    if (Request.body.Nombre_Moneda == null || Request.body.Nombre_Moneda == "") {
        Errores = Errores + 'No se ingreso ningun nombre de la moneda';
    }

    if (Request.body.Codigo_Internacional == null || Request.body.Codigo_Internacional == "") {
        Errores = Errores + 'No se ingreso el codigo internacional de la moneda';
    }

    if (Request.body.ID_Moneda == null || Request.body.ID_Moneda == "") {
        Errores = Errores + 'No se ingreso el id de la moneda a actualizar';
    }


    if (Errores == "") {
        await monedaDao.Put(Request.BD, Request.body)
            .then(function(Resultado) {
                    Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se actualizo correctamente el cargo.' }));
                },
                function(Excepcion) {
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Put al controlador Moneda", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al actualizar el cargo.' }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};

exports.EliminarMoneda = async(Request, Response) => {
    let Errores = "";
    if (Request.body.ID_Moneda == null || Request.body.ID_Moneda == "") {
        Errores = Errores + 'No se ingreso el ID de la moneda';
    }
    if (Errores == "") {
        await monedaDao.Delete(Request.BD, Request.body)
            .then(function(Resultado) {
                    console.log(Resultado);
                    Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se elimino correctamente la moneda.' }));
                },
                function(Excepcion) {
                    let Error = (Excepcion.errorNum == 2292) ? 'No se puede eliminar la moneda porque existe algun registro relacionado con ella.' : 'Ocurrio un error al eliminar la moneda';
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Delete al controlador Moneda", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: Error }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};