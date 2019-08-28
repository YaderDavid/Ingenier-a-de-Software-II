module.exports = {

    /* Obtiene todos los elementos de la colección */
    GetAll: (async function(BD) {
        return new Promise(function(OK, Error) {
            BD.execute("SELECT * FROM IN_PROVEEDOR", [], {
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
            BD.execute("SELECT * FROM IN_PROVEEDOR WHERE ID_PROVEEDOR = :ID", [ID], {
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
    Post: (async function(BD, Proveedor) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN IN_PROVEEDOR_CREATE(:P_DIRECCION ,:P_CONTACTO_PERSONA ,:P_ES_EMPRESA ,:P_TELEFONO ,:P_DESCRIPCION ,:P_CORREO_ELECTRONICO ,:P_NOMBRE ,:P_IMAGEN); END;", [Proveedor.Direccion, Proveedor.Contacto_Persona, Proveedor.Es_Empresa, Proveedor.Telefono, Proveedor.Descripcion, Proveedor.Correo_Electronico, Proveedor.Nombre, Proveedor.Imagen],
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
    Put: (async function(BD, Proveedor) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN IN_PROVEEDOR_UPDATE(:P_DIRECCION ,:P_CONTACTO_PERSONA ,:P_ES_EMPRESA ,:P_TELEFONO ,:P_DESCRIPCION ,:P_CORREO_ELECTRONICO ,:P_NOMBRE ,:P_IMAGEN ,:P_ID_PROVEEDOR ); END;", [Proveedor.Direccion, Proveedor.Contacto_Persona, Proveedor.Es_Empresa, Proveedor.Telefono, Proveedor.Descripcion, Proveedor.Correo_Electronico, Proveedor.Nombre, Proveedor.Imagen, Proveedor.ID_Proveedor],
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
    Delete: (async function(BD, Proveedor) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN IN_PROVEEDOR_DELETE(:ID_Proveedor); END;", [Proveedor.ID_Proveedor],
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