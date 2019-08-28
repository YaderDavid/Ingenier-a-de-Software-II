module.exports = {

    /* Obtiene todos los elementos de la colección */
    GetAll: (async function(BD) {
        return new Promise(function(OK, Error) {
            BD.execute("SELECT * FROM IN_CATEGORIA", [], {
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
            BD.execute("SELECT * FROM IN_CATEGORIA WHERE ID_CATEGORIA = :ID ", [ID], {
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
    Post: (async function(BD, Categoria) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN IN_CATEGORIA_CREATE(:P_NOMBRE_CATEGORIA,:P_DESCRIPCION_CATEGORIA); END;", [Categoria.Nombre_Categoria, Categoria.Descripcion_Categoria],
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
    Put: (async function(BD, Categoria) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN IN_CATEGORIA_UPDATE(:P_NOMBRE_CATEGORIA,:P_DESCRIPCION_CATEGORIA,:P_ID_CATEGORIA); END;", [Categoria.Nombre_Categoria, Categoria.Descripcion_Categoria, Categoria.ID_Categoria],
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
    Delete: (async function(BD, Categoria) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN IN_CATEGORIA_DELETE(:ID_Categoria); END;", [Categoria.ID_Categoria],
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