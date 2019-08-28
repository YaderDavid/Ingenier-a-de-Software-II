/* Importando libreria para escribir en el log */
let FS = require('fs');
var Datetime = require('node-datetime');

module.exports = {

    /* Funcion para imprimir los logs de errores */
    ImprimirLogError: function(TipoError, Excepcion, Parametros) {
        var DT = Datetime.create();
        var Formateador = DT.format('Y-m-d H:M:S');
        FS.appendFile('log/Errores.txt', `[${Formateador}] : \n -> Mensaje : ${TipoError} \n -> Parametros : ${Parametros}\n -> Excepcion : ${Excepcion}\n\n`, function(Error) {
            if (Error) throw Error;
        });
    }

};