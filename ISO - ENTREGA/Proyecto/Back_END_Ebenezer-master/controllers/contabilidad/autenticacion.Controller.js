/* Se carga la capa de acceso a datos de esta entidad y plugin de correos */
const loginDao = require('../../models/contabilidad/autenticacion.Dao.js');
var Nodemailer = require('nodemailer');
var Handlebars = require('handlebars');
var FS = require('fs');
const Bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

exports.VerificarUsuario = async(Request, Response) => {
    let Errores = "";
    if (Request.body.Usuario == null || Request.body.Usuario == "") {
        Errores = Errores + 'No se ingreso ningun usuario\n';
    }

    if (Request.body.Contra == null || Request.body.Contra == "") {
        Errores = Errores + 'No se ingreso ninguna contraseña\n';
    }

    if (Errores == "") {
        await loginDao.Login(Request.BD, { Usuario: Request.body.Usuario, Contra: Request.body.Contra })
            .then(function(Login) {
                    let LO;
                    if (Login.length == 0) {
                        LO = { Codigo: 5, Estado: 'Exito', Existe: false, Accesos: [] };
                    } else {
                        if (Login.Hash.length > 0) {
                            Bcrypt.compare(Request.body.Contra, Login.Hash[0].CONTRASEÑA, function(ErrEncript, Match) {
                                if (Match) {

                                    let TokenAcceso = JWT.sign({ Usuario: Request.body.Usuario },
                                        process.env.JWT_SECRET, {
                                            expiresIn: '24h'
                                        }
                                    );
                                    LO = { Codigo: 5, Estado: 'Exito', Existe: true, Accesos: Login.Modulos, Token: TokenAcceso, Mensaje: "Acceso correcto." };
                                } else {
                                    LO = { Codigo: 0, Estado: 'Exito', Existe: false, Accesos: [], Token: '', Mensaje: "El usuario existe pero la contraseña es incorrecta." };
                                }
                                Response.status(200).send(LO);
                            });
                        } else {
                            LO = { Codigo: 0, Estado: 'Exito', Existe: false, Accesos: [], Token: '', Mensaje: "No existen ningun usuario que cumpla con los datos ingresados." };
                            Response.status(200).send(LO);
                        }
                    }
                },
                function(Excepcion) {
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Post al controlador Login", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al ejecutar la solicitud.' }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};

exports.RestablecerCredenciales = async(Request, Response) => {

    let Errores = "";
    if (Request.body.Correo == null || Request.body.Correo == "") {
        Errores = Errores + 'No se ingreso ningun correo';
    }

    if (Request.body.Usuario == null || Request.body.Usuario == "") {
        Errores = Errores + 'No se ingreso ninguna contraseña';
    }

    if (Request.body.Contra == null || Request.body.Contra == "") {
        Errores = Errores + 'No se ingreso ninguna contraseña';
    }

    if (Errores == "") {

        await loginDao.VerificarUsuario(Request.BD, Request.body.Correo, Request.body.Usuario)
            .then(async function(Usuario) {
                    if (Usuario[0].EXISTE > 0) {
                        Bcrypt.hash(Request.body.Contra, 5, async function(ErrorCifrado, Hash) {
                            await loginDao.RestablecerContraseña(Request.BD, Request.body.Correo, Hash)
                                .then(function() {

                                    var HtmlFile = function(Ruta, Callback) {
                                        FS.readFile(Ruta, { encoding: 'utf-8' }, function(Err, HTML) {
                                            if (Err) {
                                                throw Err;
                                            } else {
                                                Callback(null, HTML);
                                            }
                                        });
                                    };

                                    HtmlFile(__dirname + '../../../assets/correo.html', function(Err, Html) {

                                        var Template = Handlebars.compile(Html);
                                        var Remplazar = {
                                            Usuario: Request.body.Usuario
                                        };

                                        var HtmlCoreo = Template(Remplazar);

                                        var Mail = {
                                            from: process.env.MAIL_ADDRESS,
                                            to: Request.body.Correo,
                                            subject: 'Ebenezer - Recuperación de credenciales',
                                            html: HtmlCoreo
                                        };
                                        var SMTPTransport = require('nodemailer-smtp-transport');
                                        SMTPTransport = Nodemailer.createTransport(SMTPTransport({
                                            service: 'gmail',
                                            auth: {
                                                user: process.env.MAIL_ADDRESS,
                                                pass: process.env.MAIL_PASSWORD
                                            }
                                        }));

                                        SMTPTransport.sendMail(Mail, function(Erro, Respon) {
                                            if (Erro) {
                                                Request.Log.ImprimirLogError("Ocurrio un error al hacer un Put al controlador Login", Erro, JSON.stringify(Request.body));
                                            } else {
                                                Response.status(200).send(JSON.stringify({ Codigo: 5, Estado: 'Exito', Mensaje: 'Se enviaron las credenciales al correo dado.' }));
                                            }
                                        });
                                    });
                                });
                        });
                    } else {
                        Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'No existe ningun usuario que tenga ese correo electronico asociado o que tenga ese usuario.' }));
                    }
                },
                function(Excepcion) {
                    Request.Log.ImprimirLogError("Ocurrio un error al hacer un Put al controlador Login", Excepcion, JSON.stringify(Request.body));
                    Response.status(500).send(JSON.stringify({ Codigo: -4, Estado: 'Error', Mensaje: 'Ocurrio un error al ejecutar la solicitud.' }));
                });
    } else {
        Response.status(400).send(JSON.stringify({ Codigo: -3, Estado: 'Petición mala', Mensaje: Errores }));
    }
};