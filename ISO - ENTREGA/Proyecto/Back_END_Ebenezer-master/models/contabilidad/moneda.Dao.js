module.exports = {

    /* Obtiene todos los elementos de la colección */
    GetAll: (async function(BD) {
        return new Promise(function(OK, Error) {
            BD.execute("SELECT * FROM CONF_MONEDA", [], {
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
            BD.execute("SELECT * FROM CONF_MONEDA WHERE ID_MONEDA = :ID ", [ID], {
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
    Post: (async function(BD, Moneda) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN CO_MONEDA_CREATE(:P_EQUIVALENCIA_DOLAR,:P_NOMBRE_MONEDA,:P_CODIGO_INTERNACIONAL); END;", [Moneda.Equivalencia_Dolar, Moneda.Nombre_Moneda, Moneda.ID_Moneda, Moneda.Codigo_Internacional],
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
    Put: (async function(BD, Moneda) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN CO_MONEDA_UPDATE(:P_EQUIVALENCIA_DOLAR,:P_NOMBRE_MONEDA,:P_ID_MONEDA,:P_CODIGO_INTERNACIONAL); END;", [Moneda.Equivalencia_Dolar, Moneda.Nombre_Moneda, Moneda.ID_Moneda, Moneda.Codigo_Internacional],
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
    Delete: (async function(BD, Moneda) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN CO_MONEDA_DELETE(:ID_Empleado); END;", [Moneda.ID_Moneda],
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