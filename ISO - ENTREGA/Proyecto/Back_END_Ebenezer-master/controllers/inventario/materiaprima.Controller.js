/* Se carga la capa de acceso a datos de esta entidad */
const materiaprimaDao = require('../../models/inventario/materiaprima.Dao.js');



exports.ObtenerListaMateriaPrima = async(Request, Response) => {
    await materiaprimaDao.GetAll(Request.BD)
        .then(function(ListaMateriaPrima) {
                Response.status(200).send(ListaMateriaPrima);
            },
            function(Excepcion) {
                Request.Log.ImprimirLogError("Ocurrio un error al hacer un Get al controlador MateriaPrima", Excepcion, JSON.stringify(Request.body));
                Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al ejecutar la solicitud.' }));
            });
};



exports.ObtenerMateriaPrima = async(Request, Response) => {
    await materiaprimaDao.GetByID(Request.BD, Request.params.id)
        .then(function(MateriaPrima) {
                Response.status(200).send(MateriaPrima);
            },
            function(Excepcion) {
                Request.Log.ImprimirLogError("Ocurrio un error al hacer un Get al controlador MateriaPrima", Excepcion, JSON.stringify(Request.body));
                Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al ejecutar la solicitud.' }));
            });
};


exports.InsertarMateriaPrima = async(Request, Response) => {
    let Errores = "";

    if (Request.body.Stock_Maximo == null || Request.body.Stock_Maximo == "") {
        Errores = Errores + 'No se ingreso el stock maximo\n';
    }

    if (Request.body.Descripcion_Materia == null || Request.body.Descripcion_Materia == "") {
        Errores = Errores + 'No se ingreso ninguna descripcion de la materia prima\n';
    }

    if (Request.body.Nombre_MateriaPrima == null || Request.body.Nombre_MateriaPrima == "") {
        Errores = Errores + 'No se ingreso el nombre de la materia prima\n';
    }

    if (Request.body.ID_Categoria == null || Request.body.ID_Categoria == "") {
        Errores = Errores + 'No se ingreso ningun id de categoria\n';
    }


    if (Request.body.ID_Moneda == null || Request.body.ID_Categoria == "") {
        Errores = Errores + 'No se ingreso ningun id de moneda\n';
    }

    if (Request.body.Coste == null || Request.body.Coste == "") {
        Errores = Errores + 'No se ingreso ningun coste\n';
    }


    if (Request.body.Stock == null || Request.body.Stock == "") {
        Errores = Errores + 'No se ingreso el stock actual \n';
    }

    if (Request.body.StockMinimo == null || Request.body.StockMinimo == "") {
        Errores = Errores + 'No se ingreso el stock minimo \n';
    }


    if (Request.body.Imagen == null || Request.body.Imagen == "") {
        Errores = Errores + 'No se ingreso ninguna imagen.\n';
    }


    if (Request.body.ID_Proveedor == null || Request.body.ID_Proveedor == "") {
        Errores = Errores + 'No se ingreso ninguna id de proveedor.\n';
    }

    if (Errores == "") {
        await materiaprimaDao.Post(Request.BD, Request.body)
            .then(function(Resultado) {
                    Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se inserto correctamente la categoria.' }));
                },
                function(Excepcion) {
                    let Error = (Excepcion.errorNum == 1) ? 'No se puede insertar la materiaprima porque ya existe un ID igual.' : 'Ocurrio un error al insertar la materia prima.';
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Post al controlador MateriaPrima", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: Error }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};

exports.ActualizarMateriaPrima = async(Request, Response) => {

    let Errores = "";

    if (Request.body.Stock_Maximo == null || Request.body.Stock_Maximo == "") {
        Errores = Errores + 'No se ingreso el stock maximo\n';
    }

    if (Request.body.Descripcion_Materia == null || Request.body.Descripcion_Materia == "") {
        Errores = Errores + 'No se ingreso ninguna descripcion de la materia prima\n';
    }

    if (Request.body.Nombre_MateriaPrima == null || Request.body.Nombre_MateriaPrima == "") {
        Errores = Errores + 'No se ingreso el nombre de la materia prima\n';
    }

    if (Request.body.ID_Categoria == null || Request.body.ID_Categoria == "") {
        Errores = Errores + 'No se ingreso ningun id de categoria\n';
    }


    if (Request.body.ID_Moneda == null || Request.body.ID_Categoria == "") {
        Errores = Errores + 'No se ingreso ningun id de moneda\n';
    }

    if (Request.body.Coste == null || Request.body.Coste == "") {
        Errores = Errores + 'No se ingreso ningun coste\n';
    }


    if (Request.body.Stock == null || Request.body.Stock == "") {
        Errores = Errores + 'No se ingreso el stock actual \n';
    }

    if (Request.body.StockMinimo == null || Request.body.StockMinimo == "") {
        Errores = Errores + 'No se ingreso el stock minimo \n';
    }


    if (Request.body.Imagen == null || Request.body.Imagen == "") {
        Errores = Errores + 'No se ingreso ninguna imagen.\n';
    }


    if (Request.body.ID_Proveedor == null || Request.body.ID_Proveedor == "") {
        Errores = Errores + 'No se ingreso ninguna id de proveedor.\n';
    }

    if (Request.body.ID_MateriaPrima == null || Request.body.ID_MateriaPrima == "") {
        Errores = Errores + 'No se ingreso ninguna id de la materia prima.\n';
    }



    if (Errores == "") {
        await materiaprimaDao.Put(Request.BD, Request.body)
            .then(function(Resultado) {
                    Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se actualizo correctamente la materia prima.' }));
                },
                function(Excepcion) {
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Put al controlador MateriaPrima", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al actualizar la categoria.' }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};

exports.EliminarMateriaPrima = async(Request, Response) => {
    let Errores = "";
    if (Request.body.ID_MateriaPrima == null || Request.body.ID_MateriaPrima == "") {
        Errores = Errores + 'No se ingreso el id de la materia prima.';
    }
    if (Errores == "") {
        await materiaprimaDao.Delete(Request.BD, Request.body)
            .then(function(Resultado) {
                    Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se elimino correctamente la materia prima.' }));
                },
                function(Excepcion) {
                    let Error = (Excepcion.errorNum == 2292) ? 'No se puede eliminar la materia prima porque existe algun registro relacionado con ella.' : 'Ocurrio un error al eliminar la categoria.';
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Delete al controlador Categoria", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: Error }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};