$(document).ready(function() {

    $('#botonarecuperar').click(function(Event) {

        if ($('#correo').val() != "" && $('#usuario').val() != "") {

            Swal.fire('Espere por favor.');
            Swal.showLoading();
            $.ajax({
                type: "PUT",
                url: "http://localhost:3000/api/v1/Contabilidad/Login",
                data: JSON.stringify({ Usuario: $('#usuario').val(), Correo: $('#correo').val(), Contra: $('#contraseña').val() }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(Respuesta) {
                    if (Respuesta.Codigo == 5) {
                        Swal.fire({
                            type: 'success',
                            title: 'Exito',
                            text: 'Se restablecio con exito la contraseña del usuario y se notifico por correo tambien.'
                        });
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