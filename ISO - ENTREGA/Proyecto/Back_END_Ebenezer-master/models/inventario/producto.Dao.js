module.exports = {

    /* Obtiene todos los elementos de la colección */
    GetAll: (async function(BD) {
        return new Promise(function(OK, Error) {
            BD.execute("SELECT * FROM IN_PRODUCTO", [], {
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
            BD.execute("SELECT * FROM IN_PRODUCTO WHERE CODIGO_BARRA = :ID", [ID], {
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
    Post: (async function(BD, Producto) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN IN_PRODUCTO_CREATE(:P_ID_ENVOLTORIO ,:P_PRECIO ,:P_ESTANTERIA ,:P_STOCK ,:P_STOCK_MINIMO ,:P_STOCK_MAXIMO ,:P_GAVETA ,:P_NOMBRE_PRODUCTO ,:P_DESCRIPCION_PRODUCTO ,:P_ID_CATEGORIA ,:P_ID_MONEDA ,:P_ID_UNIDADMEDIDA ,:P_IMAGEN ); END;", [Producto.ID_Envoltorio, Producto.Precio, Producto.Estanteria, Producto.Stock, Producto.Stock_Minimo, Producto.Stock_Maximo, Producto.Gaveta, Producto.Nombre_Producto, Producto.Descripcion_Producto, Producto.ID_Categoria, Producto.ID_Moneda, Producto.ID_UnidadMedida, Producto.Imagen],
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
    Put: (async function(BD, Producto) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN IN_PRODUCTO_UPDATE(:P_ID_ENVOLTORIO ,:P_PRECIO ,:P_CODIGO_BARRA,:P_ESTANTERIA ,:P_STOCK ,:P_STOCK_MINIMO ,:P_STOCK_MAXIMO ,:P_GAVETA ,:P_NOMBRE_PRODUCTO ,:P_DESCRIPCION_PRODUCTO ,:P_ID_CATEGORIA ,:P_ID_MONEDA ,:P_ID_UNIDADMEDIDA ,:P_IMAGEN ); END;", [Producto.ID_Envoltorio, Producto.Precio, Producto.ID_Producto, Producto.Estanteria, Producto.Stock, Producto.Stock_Minimo, Producto.Stock_Maximo, Producto.Gaveta, Producto.Nombre_Producto, Producto.Descripcion_Producto, Producto.ID_Categoria, Producto.ID_Moneda, Producto.ID_UnidadMedida, Producto.Imagen],
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
            BD.execute("BEGIN IN_PRODUCTO_DELETE(:ID_Producto); END;", [ID],
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