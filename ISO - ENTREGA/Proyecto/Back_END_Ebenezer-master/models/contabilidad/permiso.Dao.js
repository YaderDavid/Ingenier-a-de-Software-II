module.exports = {

    /* Obtiene todos los elementos de la colección */
    GetAll: (async function(BD) {
        return new Promise(function(OK, Error) {
            BD.execute("SELECT * FROM CO_PERMISO", [], {
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
            BD.execute("SELECT * FROM CO_PERMISO WHERE ID_CARGO = :ID", [ID], {
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
    Post: (async function(BD, Permiso) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN CO_PERMISO_CREATE(:P_ID_CARGO,:P_ID_MODULO); END;", [Permiso.ID_Cargo, Permiso.ID_Modulo],
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
    Delete: (async function(BD, Permiso) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN CO_PERMISO_DELETE(:ID_Empleado); END;", [Permiso.ID_Permiso],
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