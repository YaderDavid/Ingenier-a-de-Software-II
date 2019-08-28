module.exports = {

    /* Obtiene todos los elementos de la colección */
    GetAll: (async function(BD) {
        return new Promise(function(OK, Error) {
            BD.execute("SELECT * FROM IN_UBICACION", [], {
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
    Post: (async function(BD, Ubicacion) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN IN_UBICACION_CREATE(:P_GAVETA,:P_ESTANTERIA)", [Ubicacion.Gaveta, Ubicacion.Estanteria],
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
    Delete: (async function(BD, Ubicacion) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN IN_UBICACION_DELETE(:P_GAVETA,:P_ESTANTERIA); END;", [Ubicacion.Gaveta, Ubicacion.Estanteria],
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