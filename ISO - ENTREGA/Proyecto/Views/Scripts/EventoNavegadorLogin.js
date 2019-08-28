$(document).ready(function() {

    $('#botonautenticar').click(function(Event) {

        if ($('#usuario').val() != "" && $('#contraseña').val() != "") {

            Swal.fire('Espere por favor.');
            Swal.showLoading();
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/api/v1/Contabilidad/Login",
                data: JSON.stringify({ Usuario: $('#usuario').val(), Contra: $('#contraseña').val() }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(Respuesta) {
                    if (Respuesta.Codigo == 5) {
                        for (I = 0; I < Respuesta.Accesos.length; I++) {
                            if (Respuesta.Accesos[I].NOMBRE_MODULO == $('#modulo').val()) {
                                window.location.href = $('#modulo').val() + '.html';
                                break;
                            } else {
                                Swal.fire({
                                    type: 'error',
                                    title: 'Problema de autenticaición.',
                                    text: 'El usuario no tiene acceso al modulo'
                                });
                            }
                        }
                    } else {
                        Swal.fire({
                            type: 'error',
                            title: 'Problema de autenticación.',
                            text: Respuesta.Mensaje
                        });
                    }
                },
                error: function(Error) {
                    Swal.fire({
                        type: 'error',
                        title: 'Error del servidor.',
                        text: Error.responseJSON.Mensaje
                    });
                }
            });

        } else {
            Swal.fire({
                type: 'error',
                title: 'Error de validación',
                text: 'Asegurate de ingresar un usuario y una contraseña.'
            });
        }
    });
});