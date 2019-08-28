/* Cargando Libreria para valdiar Tokens */
let JWT = require('jsonwebToken');

let TokenValidacion = (Request, Response, Next) => {

    let Token = Request.headers['x-access-Token'] || Request.headers.authorization;
    if (Token) {

        if (Token.startsWith('Bearer ')) {
            Token = Token.slice(7, Token.length);
        }

        JWT.verify(Token, process.env.JWT_SECRET, (Error, Autorizado) => {
            if (Error) {
                return Response.status(401).send(
                    JSON.stringify({
                        Codigo: -3,
                        Estado: 'Error',
                        Mensaje: 'El token suministrado no es valido o ha expirado.'
                    }));

            } else {
                Request.Autorizado = Autorizado;
                Next();
            }
        });
    } else {
        return Response.status(401).send(
            JSON.stringify({
                Codigo: -2,
                Estado: 'Error',
                Mensaje: 'No se añadio ningun token de autorización a la petición.'
            }));
    }
};

module.exports = {
    TokenValidacion: TokenValidacion
};