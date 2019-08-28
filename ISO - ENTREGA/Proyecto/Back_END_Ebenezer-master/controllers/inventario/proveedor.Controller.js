/* Se carga la capa de acceso a datos de esta entidad */
const proveedorDao = require('../../models/inventario/proveedor.Dao.js');




exports.ObtenerListaProveedores = async(Request, Response) => {
    await proveedorDao.GetAll(Request.BD)
        .then(function(Proveedor) {
                Response.status(200).send(Proveedor);
            },
            function(Error) {
                Request.Log.ImprimirLogError("Ocurrio un error al hacer un Get al controlador Proveedor", Error, JSON.stringify(Request.body));
                Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al ejecutar la solicitud.' }));
            });
};


exports.ObtenerProveedor = async(Request, Response) => {
    await proveedorDao.GetByID(Request.BD, Request.params.id)
        .then(function(Proveedor) {
                Response.status(200).send(Proveedor);
            },
            function(Error) {
                Request.Log.ImprimirLogError("Ocurrio un error al hacer un Get al controlador Proveedor", Error, JSON.stringify(Request.body));
                Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al ejecutar la solicitud.' }));
            });
};


exports.InsertarProveedor = async(Request, Response) => {
    let Errores = "";

    if (Request.body.Direccion == null || Request.body.Direccion == "") {
        Errores = Errores + 'No se ingreso ninguna dirección del proveedor\n';
    }

    if (Request.body.Contacto_Persona == null || Request.body.Contacto_Persona == "") {
        Errores = Errores + 'No se ingreso ningun contacto del proveedor\n';
    }

    if (Request.body.Es_Empresa == null || Request.body.Es_Empresa == "") {
        Errores = Errores + 'No se ingreso la bandera es empresa\n';
    }

    if (Request.body.Telefono == null || Request.body.Telefono == "") {
        Errores = Errores + 'No se ingreso ningun telefono\n';
    }

    if (Request.body.Descripcion == null || Request.body.Descripcion == "") {
        Errores = Errores + 'No se ingreso ninguna descripción\n';
    }

    if (Request.body.Correo_Electronico == null || Request.body.Correo_Electronico == "") {
        Errores = Errores + 'No se ingreso ningun correo electronico\n';
    }

    if (Request.body.Nombre == null || Request.body.Nombre == "") {
        Errores = Errores + 'No se ingreso ningun nombre para el proveedor\n';
    }

    if (Request.body.Imagen == null || Request.body.Imagen == "") {
        Errores = Errores + 'No se ingreso ninguna imagen\n';
    }

    if (Errores == "") {
        await proveedorDao.Post(Request.BD, Request.body)
            .then(function(Resultado) {
                    Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se inserto correctamente el proveedor.' }));
                },
                function(Excepcion) {
                    let Error = (Excepcion.errorNum == 1) ? 'No se puede insertar el proveedor porque ya existe un id con ese proveedor.' : 'Ocurrio un error al insertar el proveedor';
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Post al controlador Proveedor", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: Error }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};

exports.ActualizarProveedor = async(Request, Response) => {
    let Errores = "";

    if (Request.body.Direccion == null || Request.body.Direccion == "") {
        Errores = Errores + 'No se ingreso ninguna dirección del proveedor\n';
    }

    if (Request.body.Contacto_Persona == null || Request.body.Contacto_Persona == "") {
        Errores = Errores + 'No se ingreso ningun contacto del proveedor\n';
    }

    if (Request.body.Es_Empresa == null || Request.body.Es_Empresa == "") {
        Errores = Errores + 'No se ingreso la bandera es empresa\n';
    }

    if (Request.body.Telefono == null || Request.body.Telefono == "") {
        Errores = Errores + 'No se ingreso ningun telefono\n';
    }

    if (Request.body.Descripcion == null || Request.body.Descripcion == "") {
        Errores = Errores + 'No se ingreso ninguna descripción\n';
    }

    if (Request.body.Correo_Electronico == null || Request.body.Correo_Electronico == "") {
        Errores = Errores + 'No se ingreso ningun correo electronico\n';
    }

    if (Request.body.Nombre == null || Request.body.Nombre == "") {
        Errores = Errores + 'No se ingreso ningun nombre para el proveedor\n';
    }

    if (Request.body.Imagen == null || Request.body.Imagen == "") {
        Errores = Errores + 'No se ingreso ninguna imagen\n';
    }

    if (Request.body.ID_Proveedor == null || Request.body.ID_Proveedor == "") {
        Errores = Errores + 'No se ingreso ningun ID de proveedor\n';
    }


    if (Errores == "") {
        await proveedorDao.Put(Request.BD, Request.body)
            .then(function(Resultado) {
                    Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se actualizo correctamente el proveedor.' }));
                },
                function(Excepcion) {
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Put al controlador Proveedor", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al actualizar el proveedor.' }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};

exports.EliminarProveedor = async(Request, Response) => {
    let Errores = "";
    if (Request.body.ID_Proveedor == null || Request.body.ID_Proveedor == "") {
        Errores = Errores + 'No se ingreso el ID del proveedor';
    }

    if (Errores == "") {
        await proveedorDao.Delete(Request.BD, Request.body)
            .then(function(Resultado) {
                    Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se elimino correctamente el proveedor.' }));
                },
                function(Excepcion) {
                    let Error = (Excepcion.errorNum == 2292) ? 'No se puede eliminar el proveedor porque existe algun registro relacionado con este.' : 'Ocurrio un error al eliminar el proveedor';
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Delete al controlador Proveedor", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al eliminar el proveedor.' }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};