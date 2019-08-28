/* Se carga la capa de acceso a datos de esta entidad */
const categoriaDao = require('../../models/inventario/categoria.Dao.js');



exports.ObtenerListaCategorias = async(Request, Response) => {
    await categoriaDao.GetAll(Request.BD)
        .then(function(Categorias) {
                Response.status(200).send(Categorias);
            },
            function(Excepcion) {
                Request.Log.ImprimirLogError("Ocurrio un error al hacer un Get al controlador Categoria", Excepcion, JSON.stringify(Request.body));
                Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al ejecutar la solicitud.' }));
            });
};

exports.InsertarCategoria = async(Request, Response) => {
    let Errores = "";

    if (Request.body.Nombre_Categoria == null || Request.body.Nombre_Categoria == "") {
        Errores = Errores + 'No se ingreso ningun nombre de categoria';
    }

    if (Request.body.Descripcion_Categoria == null || Request.body.Descripcion_Categoria == "") {
        Errores = Errores + 'No se ingreso ninguna descripción de la categoria';
    }

    if (Errores == "") {
        await categoriaDao.Post(Request.BD, Request.body)
            .then(function(Resultado) {
                    Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se inserto correctamente la categoria.' }));
                },
                function(Excepcion) {
                    let Error = (Excepcion.errorNum == 1) ? 'No se puede insertar la categoria porque ya existe un ID con esa categoria.' : 'Ocurrio un error al insertar la categoria.';
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Post al controlador Categoria", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: Error }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};

exports.ActualizarCategoria = async(Request, Response) => {

    let Errores = "";

    if (Request.body.Nombre_Categoria == null || Request.body.Nombre_Categoria == "") {
        Errores = Errores + 'No se ingreso ningun nombre de categoria';
    }

    if (Request.body.Descripcion_Categoria == null || Request.body.Descripcion_Categoria == "") {
        Errores = Errores + 'No se ingreso ninguna descripción de la categoria';
    }


    if (Request.body.ID_Categoria == null || Request.body.ID_Categoria == "") {
        Errores = Errores + 'No se ingreso ningun id de categoria';
    }

    if (Errores == "") {
        await categoriaDao.Put(Request.BD, Request.body)
            .then(function(Resultado) {
                    Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se actualizo correctamente la categoria.' }));
                },
                function(Excepcion) {
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Put al controlador Categoria", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al actualizar la categoria.' }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};

exports.EliminarCategoria = async(Request, Response) => {
    let Errores = "";
    if (Request.body.ID_Categoria == null || Request.body.ID_Categoria == "") {
        Errores = Errores + 'No se ingreso el id de categoria.';
    }
    if (Errores == "") {
        await categoriaDao.Delete(Request.BD, Request.body)
            .then(function(Resultado) {
                    console.log(Resultado);
                    Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se elimino correctamente la moneda.' }));
                },
                function(Excepcion) {
                    let Error = (Excepcion.errorNum == 2292) ? 'No se puede eliminar la categoria porque existe algun registro relacionado con ella.' : 'Ocurrio un error al eliminar la categoria.';
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Delete al controlador Categoria", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: Error }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};