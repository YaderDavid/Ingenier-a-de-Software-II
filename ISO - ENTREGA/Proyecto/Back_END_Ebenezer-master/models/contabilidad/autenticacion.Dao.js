module.exports = {


    /* Verifica si el usuario existe */
    Login: (async function(BD, Empleado) {
        return new Promise(function(OK, Error) {
            // Verifica si el usuario existe y los modulos hacia el cual tiene acceso //
            BD.execute("SELECT CP.ID_MODULO AS ID_MODULO ,CM.NOMBRE_MODULO FROM CO_EMPLEADO  CE , CO_PERMISO CP , CONF_MODULO CM WHERE CE.USUARIO = :USUARIO AND CE.ID_CARGO = CP.ID_CARGO AND CM.ID_MODULO = CP.ID_MODULO", [Empleado.Usuario], { outFormat: BD._oracledb.OBJECT },
                function(Err, Modulos) {
                    if (Err) {
                        Error(Err);
                    } else {
                        // Obtiene el Hash del usuario
                        BD.execute("SELECT CE.CONTRASEÑA FROM CO_EMPLEADO CE WHERE CE.USUARIO = :USUARIO", [Empleado.Usuario], { outFormat: BD._oracledb.OBJECT },
                            function(Err, HashBD) {
                                OK({ Modulos: Modulos.rows, Hash: HashBD.rows });
                            });
                    }
                });
        });
    }),

    /* Verificar Usuario Existe */
    VerificarUsuario: (async function(BD, Correo, Usuario) {
        return new Promise(function(OK, Error) {
            BD.execute("SELECT COUNT(*) AS EXISTE FROM CO_EMPLEADO WHERE CORREO = :CORREO AND USUARIO = :USUARIO", [Correo, Usuario], {
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

    /* Restablece la contraseña */

    RestablecerContraseña: (async function(BD, Correo, Contraseña) {
        return new Promise(function(OK, Error) {
            BD.execute("BEGIN CO_EMPLEADO_RESTABLECERCONTRASEÑA(:P_CORREO,:P_CONTRASEÑA); END;", [Correo, Contraseña], {
                    outFormat: BD._oracledb.OBJECT
                },
                function(Err) {
                    if (Err) {
                        Error(Err);
                    } else {
                        OK();
                    }
                });
        });
    })

};