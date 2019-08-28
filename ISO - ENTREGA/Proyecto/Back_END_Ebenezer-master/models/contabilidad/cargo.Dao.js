module.exports = {

    /* Obtiene todos los elementos de la colección */
    GetAll: (async function(BD) {
        return new Promise(function(OK, Error) {
            BD.execute("SELECT * FROM CO_CARGO ORDER BY ID_CARGO", [], {
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
    Post: (async function(BD, Cargo) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN CO_CARGO_CREATE(:Descripcion); END;", [Cargo.Descripcion],
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
    Put: (async function(BD, Cargo) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN CO_CARGO_UPDATE(:ID_Cargo,:Descripcion); END;", [Cargo.ID_Cargo, Cargo.Descripcion],
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
    Delete: (async function(BD, Cargo) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN CO_CARGO_DELETE(:ID_Cargo); END;", [Cargo.ID_Cargo],
                function(Err, Resultado) {
                    if (Err) {
                        Error(Err);
                    } else {
                        OK(Resultado);
                    }
                });
        });
    })

};