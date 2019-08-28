/* Se carga la capa de acceso a datos de esta entidad */
const empleadoDao = require('../../models/contabilidad/empleado.Dao.js');
const Bcrypt = require('bcrypt');




exports.ObtenerListaEmpleados = async(Request, Response) => {
    await empleadoDao.GetAll(Request.BD)
        .then(function(Empleados) {
                Response.status(200).send(Empleados);
            },
            function(Error) {
                Request.Log.ImprimirLogError("Ocurrio un error al hacer un Get al controlador Empleado", Error, JSON.stringify(Request.body));
                Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al ejecutar la solicitud.' }));
            });
};


exports.ObtenerEmpleado = async(Request, Response) => {
    await empleadoDao.GetByID(Request.BD, Request.params.id)
        .then(function(Empleados) {
                Response.status(200).send(Empleados);
            },
            function(Error) {
                Request.Log.ImprimirLogError("Ocurrio un error al hacer un Get al controlador Empleado", Error, JSON.stringify(Request.body));
                Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al ejecutar la solicitud.' }));
            });
};


exports.InsertarEmpleado = async(Request, Response) => {
    let Errores = "";

    if (Request.body.Nombre_Empleado == null || Request.body.Nombre_Empleado == "") {
        Errores = Errores + 'No se ingreso ningun nombre del empleado\n';
    }
    if (Request.body.Apellido_Empleado == null || Request.body.Apellido_Empleado == "") {
        Errores = Errores + 'No se ingreso ningun apellido del empleado\n';
    }

    if (Request.body.Fecha_Nacimiento == null || Request.body.Fecha_Nacimiento == "") {
        Errores = Errores + 'No se ingreso ninguna fecha de nacimiento\n';
    }

    if (Request.body.Cedula == null || Request.body.Cedula == "") {
        Errores = Errores + 'No se ingreso ninguna cedula\n';
    }

    if (Request.body.Fecha_Ingreso == null || Request.body.Fecha_Ingreso == "") {
        Errores = Errores + 'No se ingreso ninguna fecha de ingreso\n';
    }

    if (Request.body.Salario == null || Request.body.Salario == "") {
        Errores = Errores + 'No se ingreso ningun salario\n';
    }

    if (Request.body.Usuario == null || Request.body.Usuario == "") {
        Errores = Errores + 'No se ingreso ningun usuario\n';
    }

    if (Request.body.Contra == null || Request.body.Contra == "") {
        Errores = Errores + 'No se ingreso ninguna contraseña\n';
    }

    if (Request.body.Correo == null || Request.body.Correo == "") {
        Errores = Errores + 'No se ingreso ningun correo\n';
    }

    if (Request.body.ID_Cargo == null || Request.body.ID_Cargo == "") {
        Errores = Errores + 'No se ingreso ningun ID_Cargo\n';
    }

    if (Request.body.Imagen == null || Request.body.Imagen == "") {
        Errores = Errores + 'No se ingreso ninguna imagen\n';
    }

    if (Errores == "") {
        Bcrypt.hash(Request.body.Contra, 5, async function(ErrorCifrado, Hash) {
            if (ErrorCifrado == null) {
                Request.body.Contra = Hash;
                await empleadoDao.Post(Request.BD, Request.body)
                    .then(function(Resultado) {
                            Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se inserto correctamente el empleado.' }));
                        },
                        function(Excepcion) {
                            let Error = (Excepcion.errorNum == 1) ? 'No se puede insertar el empleado porque ya existe un id,usuario o correo con ese empleado.' : 'Ocurrio un error al insertar el empleado';
                            Request.Log.ImprimirLogError("Ocurrio un error al hacer un Post al controlador Empleado", Excepcion, JSON.stringify(Request.body));
                            Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: Error }));
                        });
            } else {
                Request.Log.ImprimirLogError("Ocurrio un error al hacer un Post al controlador Empleado", ErrorCifrado, JSON.stringify(Request.body));
                Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: ErrorCifrado }));
            }
        });

    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};

exports.ActualizarEmpleado = async(Request, Response) => {
    let Errores = "";

    if (Request.body.ID_Empleado == null || Request.body.Nombre_Empleado == "") {
        Errores = Errores + 'No se ingreso ningun ID de empleado\n';
    }

    if (Request.body.Nombre_Empleado == null || Request.body.Nombre_Empleado == "") {
        Errores = Errores + 'No se ingreso ningun nombre del empleado\n';
    }
    if (Request.body.Apellido_Empleado == null || Request.body.Apellido_Empleado == "") {
        Errores = Errores + 'No se ingreso ningun apellido del empleado\n';
    }

    if (Request.body.Fecha_Nacimiento == null || Request.body.Fecha_Nacimiento == "") {
        Errores = Errores + 'No se ingreso ninguna fecha de nacimiento\n';
    }

    if (Request.body.Cedula == null || Request.body.Cedula == "") {
        Errores = Errores + 'No se ingreso ninguna cedula\n';
    }

    if (Request.body.Fecha_Ingreso == null || Request.body.Fecha_Ingreso == "") {
        Errores = Errores + 'No se ingreso ninguna fecha de ingreso\n';
    }

    if (Request.body.Salario == null || Request.body.Salario == "") {
        Errores = Errores + 'No se ingreso ningun salario\n';
    }


    if (Request.body.Correo == null || Request.body.Correo == "") {
        Errores = Errores + 'No se ingreso ningun correo\n';
    }

    if (Request.body.ID_Cargo == null || Request.body.ID_Cargo == "") {
        Errores = Errores + 'No se ingreso ningun ID_Cargo\n';
    }

    if (Request.body.Imagen == null || Request.body.Imagen == "") {
        Errores = Errores + 'No se ingreso ninguna imagen\n';
    }

    if (Errores == "") {
        await empleadoDao.Put(Request.BD, Request.body)
            .then(function(Resultado) {
                    Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se actualizo correctamente el empleado.' }));
                },
                function(Excepcion) {
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Put al controlador Empleado", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al actualizar el empleado.' }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};

exports.EliminarEmpleado = async(Request, Response) => {
    let Errores = "";
    if (Request.body.ID_Empleado == null || Request.body.ID_Empleado == "") {
        Errores = Errores + 'No se ingreso el ID de empleado';
    }

    if (Errores == "") {
        await empleadoDao.Delete(Request.BD, Request.body)
            .then(function(Resultado) {
                    Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'OK', Mensaje: 'Se elimino correctamente el empleado.' }));
                },
                function(Excepcion) {
                    let Error = (Excepcion.errorNum == 2292) ? 'No se puede eliminar el empleado porque existe algun registro relacionado con este.' : 'Ocurrio un error al eliminar el empleado';
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Delete al controlador Empleado", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al eliminar el empleado.' }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};