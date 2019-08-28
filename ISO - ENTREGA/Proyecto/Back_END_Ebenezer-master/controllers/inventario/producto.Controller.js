/* Se carga la capa de acceso a datos de esta entidad */
const productoDao = require('../../models/inventario/producto.Dao.js');



exports.ObtenerListaProductos = async(Request, Response) => {
    await productoDao.GetAll(Request.BD)
        .then(function(ListaProductos) {
                Response.status(200).send(ListaProductos);
            },
            function(Excepcion) {
                Request.Log.ImprimirLogError("Ocurrio un error al hacer un Get al controlador Producto", Excepcion, JSON.stringify(Request.body));
                Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al ejecutar la solicitud.' }));
            });
};



exports.ObtenerProducto = async(Request, Response) => {
    await productoDao.GetByID(Request.BD, Request.params.id)
        .then(function(Producto) {
                Response.status(200).send(Producto);
            },
            function(Excepcion) {
                Request.Log.ImprimirLogError("Ocurrio un error al hacer un Get al controlador Producto", Excepcion, JSON.stringify(Request.body));
                Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al ejecutar la solicitud.' }));
            });
};


exports.InsertarProducto = async(Request, Response) => {
    let Errores = "";

    if (Request.body.Stock_Maximo == null || Request.body.Stock_Maximo == "") {
        Errores = Errores + 'No se ingreso el stock maximo\n';
    }

    if (Request.body.Descripcion_Producto == null || Request.body.Descripcion_Producto == "") {
        Errores = Errores + 'No se ingreso ninguna descripcion del producto\n';
    }

    if (Request.body.Nombre_Producto == null || Request.body.Nombre_Producto == "") {
        Errores = Errores + 'No se ingreso el nombre de la materia prima\n';
    }

    if (Request.body.ID_Categoria == null || Request.body.ID_Categoria == "") {
        Errores = Errores + 'No se ingreso ningun id de categoria\n';
    }


    if (Request.body.ID_Moneda == null || Request.body.ID_Categoria == "") {
        Errores = Errores + 'No se ingreso ningun id de moneda\n';
    }

    if (Request.body.Precio == null || Request.body.Precio == "") {
        Errores = Errores + 'No se ingreso ningun precio\n';
    }


    if (Request.body.Stock == null || Request.body.Stock == "") {
        Errores = Errores + 'No se ingreso el stock actual \n';
    }

    if (Request.body.Stock_Minimo == null || Request.body.Stock_Minimo == "") {
        Errores = Errores + 'No se ingreso el stock minimo \n';
    }


    if (Request.body.Imagen == null || Request.body.Imagen == "") {
        Errores = Errores + 'No se ingreso ninguna imagen.\n';
    }




    if (Request.body.ID_Envoltorio == null || Request.body.ID_Envoltorio == "") {
        Errores = Errores + 'No se ingreso ninguna id de envoltorio.\n';
    }

    if (Request.body.Estanteria == null || Request.body.Estanteria == "") {
        Errores = Errores + 'No se ingreso ninguna estante.\n';
    }

    if (Request.body.Gaveta == null || Request.body.Gaveta == "") {
        Errores = Errores + 'No se ingreso ninguna gaveta.\n';
    }

    if (Request.body.ID_UnidadMedida == null || Request.body.ID_UnidadMedida == "") {
        Errores = Errores + 'No se ingreso ninguna unidad de medida.\n';
    }

    if (Errores == "") {
        await productoDao.Post(Request.BD, Request.body)
            .then(function(Resultado) {
                    Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se inserto correctamente la categoria.' }));
                },
                function(Excepcion) {
                    let Error = (Excepcion.errorNum == 1) ? 'No se puede insertar el producto porque ya existe un ID igual.' : 'Ocurrio un error al insertar el producto.';
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Post al controlador Producto", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: Error }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};

exports.ActualizarProducto = async(Request, Response) => {

    let Errores = "";

    if (Request.body.Stock_Maximo == null || Request.body.Stock_Maximo == "") {
        Errores = Errores + 'No se ingreso el stock maximo\n';
    }

    if (Request.body.Descripcion_Producto == null || Request.body.Descripcion_Producto == "") {
        Errores = Errores + 'No se ingreso ninguna descripcion del producto\n';
    }

    if (Request.body.Nombre_Producto == null || Request.body.Nombre_Producto == "") {
        Errores = Errores + 'No se ingreso el nombre de la materia prima\n';
    }

    if (Request.body.ID_Categoria == null || Request.body.ID_Categoria == "") {
        Errores = Errores + 'No se ingreso ningun id de categoria\n';
    }


    if (Request.body.ID_Moneda == null || Request.body.ID_Categoria == "") {
        Errores = Errores + 'No se ingreso ningun id de moneda\n';
    }

    if (Request.body.Precio == null || Request.body.Precio == "") {
        Errores = Errores + 'No se ingreso ningun precio\n';
    }


    if (Request.body.Stock == null || Request.body.Stock == "") {
        Errores = Errores + 'No se ingreso el stock actual \n';
    }

    if (Request.body.Stock_Minimo == null || Request.body.Stock_Minimo == "") {
        Errores = Errores + 'No se ingreso el stock minimo \n';
    }


    if (Request.body.Imagen == null || Request.body.Imagen == "") {
        Errores = Errores + 'No se ingreso ninguna imagen.\n';
    }


    if (Request.body.ID_Envoltorio == null || Request.body.ID_Envoltorio == "") {
        Errores = Errores + 'No se ingreso ninguna id de envoltorio.\n';
    }

    if (Request.body.Estanteria == null || Request.body.Estanteria == "") {
        Errores = Errores + 'No se ingreso ninguna estante.\n';
    }

    if (Request.body.Gaveta == null || Request.body.Gaveta == "") {
        Errores = Errores + 'No se ingreso ninguna gaveta.\n';
    }

    if (Request.body.ID_UnidadMedida == null || Request.body.ID_UnidadMedida == "") {
        Errores = Errores + 'No se ingreso ninguna unidad de medida.\n';
    }

    if (Request.body.ID_Producto == null || Request.body.ID_Producto == "") {
        Errores = Errores + 'No se ingreso ninguna id producto.\n';
    }



    if (Errores == "") {
        await productoDao.Put(Request.BD, Request.body)
            .then(function(Resultado) {
                    Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se actualizo correctamente la materia prima.' }));
                },
                function(Excepcion) {
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Put al controlador Producto", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al actualizar el producto.' }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};

exports.EliminarProducto = async(Request, Response) => {
    let Errores = "";
    if (Request.body.ID_Producto == null || Request.body.ID_Producto == "") {
        Errores = Errores + 'No se ingreso el id del producto.';
    }
    if (Errores == "") {
        await productoDao.Delete(Request.BD, Request.body)
            .then(function(Resultado) {
                    Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se elimino correctamente la materia prima.' }));
                },
                function(Excepcion) {
                    let Error = (Excepcion.errorNum == 2292) ? 'No se puede eliminar el producto porque existe algun registro relacionado con ella.' : 'Ocurrio un error al eliminar la categoria.';
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Delete al controlador Producto", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: Error }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};