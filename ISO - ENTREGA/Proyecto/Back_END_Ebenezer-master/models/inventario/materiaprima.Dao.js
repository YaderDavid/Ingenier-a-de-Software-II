module.exports = {

    /* Obtiene todos los elementos de la colección */
    GetAll: (async function(BD) {
        return new Promise(function(OK, Error) {
            BD.execute("SELECT * FROM IN_MATERIAPRIMA", [], {
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
            BD.execute("SELECT * FROM IN_MATERIAPRIMA WHERE ID_MATERIAPRIMA = :ID", [ID], {
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
    Post: (async function(BD, MateriaPrima) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN IN_MATERIAPRIMA_CREATE(:P_STOCK_MAXIMO ,:P_DESCRIPCION_MATERIA ,:P_NOMBRE_MATERIA ,:P_ID_CATEGORIA ,:P_ID_MONEDA ,:P_COSTE ,:P_STOCK ,:P_STOCK_MINIMO ,:P_IMAGEN ,:P_ID_PROVEEDOR); END;", [MateriaPrima.Stock_Maximo, MateriaPrima.Descripcion_Materia, MateriaPrima.Nombre_Materia, MateriaPrima.ID_Categoria, MateriaPrima.ID_Moneda, MateriaPrima.Coste, MateriaPrima.Stock, MateriaPrima.Stock_Minimo, MateriaPrima.Imagen, MateriaPrima.ID_Proveedor],
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
    Put: (async function(BD, MateriaPrima) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN IN_MATERIAPRIMA_UPDATE(:P_STOCK_MAXIMO ,:P_DESCRIPCION_MATERIA ,:P_NOMBRE_MATERIA ,:P_ID_CATEGORIA ,:P_ID_MONEDA ,:P_COSTE ,:P_STOCK ,:P_STOCK_MINIMO ,:P_IMAGEN ,:P_ID_PROVEEDOR ); END", [MateriaPrima.Stock_Maximo, MateriaPrima.Descripcion_Materia, MateriaPrima.Nombre_Materia, MateriaPrima.ID_Categoria, MateriaPrima.ID_Moneda, MateriaPrima.Coste, MateriaPrima.Stock, MateriaPrima.Stock_Minimo, MateriaPrima.Imagen, MateriaPrima.ID_MateriaPrima, MateriaPrima.ID_Proveedor],
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
    Delete: (async function(BD, ID) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN IN_MATERIAPRIMA_DELETE(:ID_MATERIAPRIMA); END;", [ID],
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