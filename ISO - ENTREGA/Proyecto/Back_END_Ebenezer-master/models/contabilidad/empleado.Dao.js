module.exports = {

    /* Obtiene todos los elementos de la colección */
    GetAll: (async function(BD) {
        return new Promise(function(OK, Error) {
            BD.execute("SELECT CE.ID_EMPLEADO,NOMBRE_EMPLEADO,CE.APELLIDO_EMPLEADO,CE.FECHA_NACIMIENTO,CE.CEDULA,CE.FECHA_INGRESO AS FECHA_INGRESO,CE.SALARIO,CE.CORREO,CA.DESCRIPCION AS DESCRIPCIONCARGO,CA.ID_CARGO,CE.IMAGEN FROM CO_EMPLEADO CE , CO_CARGO CA WHERE CE.ID_CARGO = CA.ID_CARGO ORDER BY CE.ID_EMPLEADO", [], {
                    outFormat: BD._oracledb.OBJECT
                },
                function(Err, Resultado) {
                    if (Err) {
                        Error(Err);
                    } else {
                        OK(Resultado.rows);
                    }
                });
        });
    }),

    /* Obtiene un elemento de la colección */
    GetByID: (async function(BD, ID) {
        return new Promise(function(OK, Error) {
            BD.execute("SELECT CE.ID_EMPLEADO,NOMBRE_EMPLEADO,CE.APELLIDO_EMPLEADO,CE.FECHA_NACIMIENTO,CE.CEDULA,CE.FECHA_INGRESO,CE.SALARIO,CE.CORREO,CA.DESCRIPCION AS DESCRIPCIONCARGO,CA.ID_CARGO,CE.IMAGEN FROM CO_EMPLEADO CE , CO_CARGO CA WHERE CE.ID_EMPLEADO = :ID  AND CE.ID_CARGO = CA.ID_CARGO ORDER BY CE.ID_EMPLEADO ", [ID], {
                    outFormat: BD._oracledb.OBJECT
                },
                function(Err, Resultado) {
                    if (Err) {
                        Error(Err);
                    } else {
                        OK(Resultado.rows);
                    }
                });
        });
    }),


    /* Añade un nuevo elemento a la colección */
    Post: (async function(BD, Empleado) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN CO_EMPLEADO_CREATE(:P_ID_CARGO,:P_CORREO,:P_CONTRASEÑA,:P_NOMBRE_EMPLEADO,:P_FECHA_INGRESO," +
                ":P_SALARIO,:P_CEDULA,:P_APELLIDO_EMPLEADO,:P_FECHA_NACIMIENTO,:P_USUARIO,:P_IMAGEN); END;", [Empleado.ID_Cargo, Empleado.Correo, Empleado.Contra, Empleado.Nombre_Empleado, Empleado.Fecha_Ingreso,
                    Empleado.Salario, Empleado.Cedula, Empleado.Apellido_Empleado, Empleado.Fecha_Nacimiento, Empleado.Usuario, Empleado.Imagen
                ],
                function(Err, Resultado) {
                    if (Err) {
                        Error(Err);
                    } else {
                        OK();
                    }
                });
        });
    }),

    /* Actualiza un nuevo elemento a la colección */
    Put: (async function(BD, Empleado) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN CO_EMPLEADO_UPDATE(:P_ID_CARGO,:P_CORREO,:P_NOMBRE_EMPLEADO,:P_FECHA_INGRESO," +
                ":P_SALARIO,:P_CEDULA,:P_EMPLEADOID,:P_APELLIDO_EMPLEADO,:P_FECHA_NACIMIENTO,:P_IMAGEN); END;", [
                    Empleado.ID_Cargo, Empleado.Correo, Empleado.Nombre_Empleado, Empleado.Fecha_Ingreso,
                    Empleado.Salario, Empleado.Cedula, Empleado.ID_Empleado, Empleado.Apellido_Empleado, Empleado.Fecha_Nacimiento, Empleado.Imagen
                ],
                function(Err, Resultado) {
                    if (Err) {
                        Error(Err);
                    } else {
                        OK();
                    }
                });
        });
    }),

    /* Elimina un elemento de la colección */
    Delete: (async function(BD, Empleado) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN CO_EMPLEADO_DELETE(:ID_Empleado); END;", [Empleado.ID_Empleado],
                function(Err, Resultado) {
                    if (Err) {
                        Error(Err);
                    } else {
                        OK();
                    }
                });
        });
    })

};