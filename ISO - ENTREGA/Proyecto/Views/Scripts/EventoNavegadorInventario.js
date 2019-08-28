var Formulario_Activo;
var Operacion;
var Tabla_Instrumento;
var Tabla_Proveedor;
var Tabla_Remision;
var Tabla_Estuche;
var Tabla_Accesorios;
var Tabla_Desglose_Remision;
var Tabla_Aula;
var Tabla_ListaNegra;
var EsTelefono = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
var AnimacionSideBar = false;
var BanderaCerrar = false;

$(document).ready(function() {
    if (EsTelefono == true) {
        $('#content').css('margin-left', '0px');
        $('#sidebar').css('z-index', '2000');
        $('.selectpicker').selectpicker('mobile');
        AnimacionSideBar = true;
    }

    // Construcción de los formularios de la pagina //
    Inicializacion_Eventos();
    Inicializacion_Tablas();
    Inicializacion_Controles();


    // Peticiones Ajax //
    CargarProveedores();
    CargarEmpleado();
    CargarProductos();
    CargarCategorias();


    $('#Actualizar_Proveedor').click(function(event) {
        ActualizarNuevoProveedor();
    });

    $('#Actualizar_Estuche1').click(function(event) {
        ActualizarNuevoEmpleado();
    });

    $('#AñadirProducto').click(function(event) {
        ActualizarNuevoProducto();
    });

    $('#Botoncat').click(function(Event) {
        InsertarCategoria();
    });

    $('#Actualizar').click(function(event) {
        CargarProveedores();
        CargarEmpleado();
        CargarProductos();
        CargarCategorias();
    });

});



function Inicializacion_Controles() {



}

function Actualizar_Todo() {
    Tabla_Instrumento.clear().draw();
    Tabla_Estuche.clear().draw();
    Tabla_Proveedor.clear().draw();
    Tabla_Remision.clear().draw();
    Tabla_Accesorios.clear().draw();
    Tabla_Desglose_Remision.clear().draw();
    Tabla_Aula.clear().draw();

    $('#Filtro_Instrumento').val("Proveedor");
    $('#ID_Filtro_Instrumento').html("");
    $('#Col_Select').css("visibility", "visible");

    $('#Filtro_Remision').val("Instrumento");
    $('#ID_Filtro_Remisiones').html("");
    $('#ContenedorFechaInicio').hide();
    $('#ContenedorFechaFin').hide();
    $('#ID_ContenedorRemision').show();

    Cargar_Instrumentos();
}


function Inicializacion_Tablas() {
    /* Inicialización de las tablas de inventario */

    Tabla_Instrumento = $('#Instrumento_T').DataTable({
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron datos",
            "info": "Mostrando pagina _PAGE_ de _PAGES_",
            "infoEmpty": "La busqueda no devolvio resultados",
            "infoFiltered": "(Se busco en _MAX_ registros )",
            "sSearch": "Buscar",
            "paginate": {
                "next": "Siguiente pagina",
                "previous": "Pagina anterior"
            },
            "columnDefs": [{ "className": "dt-center", "targets": "_all" }],
            "responsive": true,
            "search": {
                "caseInsensitive": false
            }
        }
    });


    Tabla_Proveedor = $('#Proveedor_T').DataTable({
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron datos",
            "info": "Mostrando pagina _PAGE_ de _PAGES_",
            "infoEmpty": "La busqueda no devolvio resultados",
            "infoFiltered": "(Se busco en _MAX_ registros )",
            "sSearch": "Buscar",
            "paginate": {
                "next": "Siguiente pagina",
                "previous": "Pagina anterior"
            },
            "columnDefs": [{ "className": "dt-center", "targets": "_all" }]
        }
    });


    Tabla_Remision = $('#Remision_T').DataTable({
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron datos",
            "info": "Mostrando pagina _PAGE_ de _PAGES_",
            "infoEmpty": "La busqueda no devolvio resultados",
            "infoFiltered": "(Se busco en _MAX_ registros )",
            "sSearch": "Buscar",
            "paginate": {
                "next": "Siguiente pagina",
                "previous": "Pagina anterior"
            },
            "columnDefs": [{ "className": "dt-center", "targets": "_all" }]
        }
    });


    Tabla_Desglose_Remision = $('#Desglose_Remision_T').DataTable({
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron datos",
            "info": "Mostrando pagina _PAGE_ de _PAGES_",
            "infoEmpty": "La busqueda no devolvio resultados",
            "infoFiltered": "(Se busco en _MAX_ registros )",
            "sSearch": "Buscar",
            "paginate": {
                "next": "Siguiente pagina",
                "previous": "Pagina anterior"
            },
            "columnDefs": [{ "className": "dt-center", "targets": "_all" }]
        }
    });

    Tabla_Estuche = $('#Estuche_T').DataTable({
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron datos",
            "info": "Mostrando pagina _PAGE_ de _PAGES_",
            "infoEmpty": "La busqueda no devolvio resultados",
            "infoFiltered": "(Se busco en _MAX_ registros )",
            "sSearch": "Buscar",
            "paginate": {
                "next": "Siguiente pagina",
                "previous": "Pagina anterior"
            },
            "columnDefs": [{ "className": "dt-center", "targets": "_all" }]
        }
    });

    Tabla_Aula = $('#Aula_T').DataTable({
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron datos",
            "info": "Mostrando pagina _PAGE_ de _PAGES_",
            "infoEmpty": "La busqueda no devolvio resultados",
            "infoFiltered": "(Se busco en _MAX_ registros )",
            "sSearch": "Buscar",
            "paginate": {
                "next": "Siguiente pagina",
                "previous": "Pagina anterior"
            },
            "columnDefs": [{ "className": "dt-center", "targets": "_all" }]
        }
    });



    Tabla_Accesorios = $('#Accesorios_T').DataTable({
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron datos",
            "info": "Mostrando pagina _PAGE_ de _PAGES_",
            "infoEmpty": "La busqueda no devolvio resultados",
            "infoFiltered": "(Se busco en _MAX_ registros )",
            "sSearch": "Buscar",
            "paginate": {
                "next": "Siguiente pagina",
                "previous": "Pagina anterior"
            },
            "columnDefs": [{ "className": "dt-center", "targets": "_all" }]
        }
    });

    Tabla_ListaNegra = $('#Lista_T').DataTable({
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron datos",
            "info": "Mostrando pagina _PAGE_ de _PAGES_",
            "infoEmpty": "La busqueda no devolvio resultados",
            "infoFiltered": "(Se busco en _MAX_ registros )",
            "sSearch": "Buscar",
            "paginate": {
                "next": "Siguiente pagina",
                "previous": "Pagina anterior"
            },
            "columnDefs": [{ "className": "dt-center", "targets": "_all" }]
        }
    });
}


function Inicializacion_Eventos() {
    /* Eventos : Zona Menu*/
    $('#menuinicio').click(function() {
        document.getElementById('Instrumentos').style.display = 'none';
        document.getElementById('Proveedores').style.display = 'none';
        document.getElementById('Remisiones').style.display = 'none';
        document.getElementById('Estuches').style.display = 'none';
        document.getElementById('Instrumento_Detalle').style.display = 'none';
        document.getElementById('Estuche_Detalle').style.display = 'none';
        document.getElementById('Proveedor_Detalle').style.display = 'none';
        document.getElementById('Remision_Detalle').style.display = 'none';
        document.getElementById('Aulas').style.display = 'none';
        document.getElementById('ListaNegra').style.display = 'none';
        document.getElementById('Lista_Detalle').style.display = 'none';
        if (EsTelefono) {
            $('#sidebar').css('margin-left', '-110px');
            AnimacionSideBar = true;
        }
        $('#ReporteHistoricoRemision').hide();
        $('#ADD').hide();
        $('#Reporte').hide();
        $('#CodigoBarra').hide();
        $('#FooterCopyright').css('margin-top', '25px');
        $('#Busqueda_Form').hide();
    });


    $('#instrumentossubmenu').click(function() {
        document.getElementById('Instrumentos').style.display = 'block';
        document.getElementById('Proveedores').style.display = 'none';
        document.getElementById('Remisiones').style.display = 'none';
        document.getElementById('Instrumento_Detalle').style.display = 'none';
        document.getElementById('Proveedor_Detalle').style.display = 'none';
        document.getElementById('Remision_Detalle').style.display = 'none';
        document.getElementById('Aulas').style.display = 'none';
        document.getElementById('categoria').style.display = 'none';
        document.getElementById('categoria_Detalle').style.display = 'none';
        if (EsTelefono) {
            $('#sidebar').css('margin-left', '-110px');
            AnimacionSideBar = true;
        }
        Formulario_Activo = 'Instrumento';
        $('#ReporteHistoricoRemision').hide();
        $('#ADD').html('<span class="btn-label"><i class="ion-coffee" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Producto');
        $('#ADD').show("drop", 50);
        $('#Busqueda_Form').hide("drop", 50);
        $('#Reporte').show();
        $('#CodigoBarra').hide();
        $('#FooterCopyright').css('margin-top', '0px');
        $('#Busqueda_Form').hide();
    });

    $('#proveedoressubmenu').click(function() {
        document.getElementById('Instrumentos').style.display = 'none';
        document.getElementById('Proveedores').style.display = 'block';
        document.getElementById('Remisiones').style.display = 'none';
        document.getElementById('Instrumento_Detalle').style.display = 'none';
        document.getElementById('Proveedor_Detalle').style.display = 'none';
        document.getElementById('Remision_Detalle').style.display = 'none';
        document.getElementById('Aulas').style.display = 'none';
        document.getElementById('categoria').style.display = 'none';
        document.getElementById('categoria_Detalle').style.display = 'none';
        if (EsTelefono) {
            $('#sidebar').css('margin-left', '-110px');
            AnimacionSideBar = true;
        }
        Formulario_Activo = 'Proveedor';
        $('#ReporteHistoricoRemision').hide();
        $('#ADD').html('<span class="btn-label"><i class="ion-person" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Proveedor');
        $('#ADD').show("drop", 50);
        $('#Busqueda_Form').hide("drop", 50);
        $('#Reporte').show();
        $('#CodigoBarra').hide();
        $('#FooterCopyright').css('margin-top', '0px');
        $('#Busqueda_Form').hide();
    });

    $('#remisionessubmenu').click(function() {
        document.getElementById('Instrumentos').style.display = 'none';
        document.getElementById('Proveedores').style.display = 'none';
        document.getElementById('Remisiones').style.display = 'block';
        document.getElementById('Proveedor_Detalle').style.display = 'none';
        document.getElementById('Remision_Detalle').style.display = 'none';
        document.getElementById('categoria').style.display = 'none';
        document.getElementById('categoria_Detalle').style.display = 'none';
        if (EsTelefono) {
            $('#sidebar').css('margin-left', '-110px');
            AnimacionSideBar = true;
        }
        Formulario_Activo = 'Remision';
        $('#ReporteHistoricoRemision').hide();
        $('#ADD').html('<span class="btn-label"><i class="ion-briefcase" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Empleado');
        $('#ADD').show("drop", 50);
        $('#Busqueda_Form').hide("drop", 50);
        $('#Reporte').show();
        $('#CodigoBarra').hide();
        $('#FooterCopyright').css('margin-top', '0px');
        $('#Busqueda_Form').hide();
    });

    $('#categoriasubmenu').click(function(Event) {
        document.getElementById('Instrumentos').style.display = 'none';
        document.getElementById('Proveedores').style.display = 'none';
        document.getElementById('Remisiones').style.display = 'none';
        document.getElementById('Proveedor_Detalle').style.display = 'none';
        document.getElementById('Remision_Detalle').style.display = 'none';
        document.getElementById('categoria').style.display = 'block';
        document.getElementById('categoria_Detalle').style.display = 'none';

        if (EsTelefono) {
            $('#sidebar').css('margin-left', '-110px');
            AnimacionSideBar = true;
        }
        Formulario_Activo = 'categoria';
        $('#ReporteHistoricoRemision').hide();
        $('#ADD').html('<span class="btn-label"><i class="ion-bookmark" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Categoria');
        $('#ADD').show("drop", 50);
        $('#Busqueda_Form').hide("drop", 50);
        $('#Reporte').show();
        $('#CodigoBarra').hide();
        $('#FooterCopyright').css('margin-top', '0px');
        $('#Busqueda_Form').hide();
    });

    /* Eventos : uso en formularios de forma global */
    $('#sidebarCollapse').click(function() {
        $('#sidebar').show();
        if (AnimacionSideBar == false) {
            $('#sidebar').css('margin-left', '-110px');
            if (EsTelefono === false) { $('#content').css('margin-left', '0px'); }
            AnimacionSideBar = true;
        } else {
            if (EsTelefono == false) { $('#content').css('margin-left', '110px'); }
            $('#sidebar').css('margin-left', '0px');
            AnimacionSideBar = false;
        }
    });


    /*Boton AÑADIR dependiendo del Formulario que se encuentre ACTIVO*/

    $('#ADD').click(function() {
        $('.FlotarDerecha').hide();

        if (Formulario_Activo == 'Instrumento') {
            Operacion = 'Nuevo';
            $('#Header_Instrumento_Texto').text('Añadir Instrumento');
            $('#Instrumentos').hide();
            $('#Instrumento_Detalle').show();

            $('#Producto_ID').val('Autogenerado');

            $('#ADD').hide();

            BanderaBorrar = false;
        }

        if (Formulario_Activo == 'Proveedor') {
            Operacion = 'Nuevo';
            $('#Proveedor_Detalle').show();
            $('#Header_Proveedor_Texto').text('Añadir Proveedor');
            $('#Proveedores').hide();
            $('#ID_Proveedor').val('Automatico');
            $('#Actualizar_Proveedor').text('Añadir');
        }

        if (Formulario_Activo == 'Remision') {
            Operacion = 'Nuevo';
            $('#Remision_Detalle').show();
            $('#Header_Remision_Texto').text('Añadir Empleado');
            $('#Remisiones').hide();
            $('#Actualizar_Estuche1').text('Añadir');
            $('#ID_Empleado').val('Automatico');
            $('#Usuario_Empleado').show();
            $('#Contraseña_Empleado').show();
            $('#FechaIngreso_Empleado').val('2019-07-16');
            $('#FechaNacimiento_Empleado').val('2019-07-16');

        }

        if (Formulario_Activo == 'Estuche') {
            Operacion = 'Nuevo';
            $('#Estuche_Detalle').show();
            $('#Header_Estuche_Texto').text('Añadir Estuche');
            $('#Estuches').hide();
        }

        if (Formulario_Activo == "categoria") {
            $('#header_categoria').val('Añadir Categoria');
            Operacion = 'Nuevo';
            $('#categoria_Detalle').show();
            $('#categoria').hide();
        }
    });














}


/* CRUD Proveedor */

function CargarProveedores() {
    $.ajax({
        url: 'http://localhost:3000/api/v1/Inventario/Proveedor',
        type: 'GET',
        success: function(Resultado) {
            Tabla_Proveedor.clear()
                .draw();
            for (i = 0; i < Resultado.length; i++) {
                var Imagen = '<img style = "border-radius:3px;" width = "65" height = "65" src= "' + Resultado[i].IMAGEN + '"></img>';

                Tabla_Proveedor.row.add([
                    Resultado[i].ID_PROVEEDOR,
                    Resultado[i].NOMBRE,
                    Resultado[i].DIRECCION,
                    Resultado[i].TELEFONO,
                    Resultado[i].CORREO_ELECTRONICO,
                    '<button type="button" class="btn waves-effect waves-light btn-primary btn-color" onclick ="Detallar_Proveedor(' + Resultado[i].ID_PROVEEDOR + ')"><i class="ion-navicon-round" data-pack="default"></i></button>',
                    '<button type="button" class="btn btn-danger" onclick ="Eliminar_Proveedor(' + Resultado[i].ID_PROVEEDOR + ')"><i class="ion-close-round" data-pack="default" data-tags="delete, trash, kill, x"></li></button>'
                ]).draw(false);
            }
        },
        error: function(Error) {
            Swal.fire({
                type: 'error',
                title: 'Error listando proveedores',
                text: Error.Mensaje
            });
        }
    });
}

function Detallar_Proveedor(ID) {
    $.ajax({
        url: 'http://localhost:3000/api/v1/Inventario/Proveedor/' + ID,
        type: 'GET',
        success: function(Resultado) {
            $('#Proveedor_Detalle').show();
            $('#Header_Proveedor_Texto').text('Actualizar Proveedor');
            $('#Proveedores').hide();

            $('#ID_Proveedor').val(Resultado[0].ID_PROVEEDOR);
            $('#Nombre_Proveedor').val(Resultado[0].NOMBRE);
            $('#Descripcion_Proveedor').val(Resultado[0].DESCRIPCION);
            if (Resultado[0].ES_EMPRESA == 's') {
                $('#TipoContacto_Proveedor').val('Empresa');
            } else {
                $('#TipoContacto_Proveedor').val('Informal');
            }
            $('#Direccion_Proveedor').val(Resultado[0].DIRECCION);
            $('#Telefono_Proveedor').val(Resultado[0].TELEFONO);
            $('#Contacto_Proveedor').val(Resultado[0].CONTACTO_PERSONA);
            $('#Correo_Proveedor').val(Resultado[0].CORREO_ELECTRONICO);
            $("#Imagen_Proveedor").attr("src", Resultado[0].IMAGEN);
            $('#Actualizar_Proveedor').text('Actualizar');
            Operacion = 'Actualizar';
            CargarProveedores();


        },
        error: function(Error) {
            Swal.fire({
                type: 'error',
                title: 'Error listando proveedores',
                text: Error.Mensaje
            });
        }
    });
}

function ActualizarNuevoProveedor() {
    Bandera = ($('#TipoContacto_Proveedor').val() == 'Informal') ? 'n' : 's';
    if (Operacion == "Nuevo") {
        $.ajax({
            url: 'http://localhost:3000/api/v1/Inventario/Proveedor/',
            type: 'POST',
            data: { Nombre: $('#Nombre_Proveedor').val(), Descripcion: $('#Descripcion_Proveedor').val(), Es_Empresa: Bandera, Direccion: $('#Direccion_Proveedor').val(), Telefono: $('#Telefono_Proveedor').val(), Contacto_Persona: $('#Contacto_Proveedor').val(), Correo_Electronico: $('#Correo_Proveedor').val(), Imagen: 'as' },
            success: function(Resultado) {

                Swal.fire({
                    type: 'success',
                    title: 'Exito',
                    text: 'Se inserto correctamente el proveedor.'
                });
                CargarProveedores();

            },
            error: function(Error) {
                Error = JSON.parse(Error.responseText);
                Swal.fire({
                    type: 'error',
                    title: 'Error insertado el proveedor',
                    text: 'Asegurate de ingresar todos los campos'
                });
            }
        });

    } else {

        $.ajax({
            url: 'http://localhost:3000/api/v1/Inventario/Proveedor/',
            type: 'PUT',
            data: { Nombre: $('#Nombre_Proveedor').val(), Descripcion: $('#Descripcion_Proveedor').val(), Es_Empresa: Bandera, Direccion: $('#Direccion_Proveedor').val(), Telefono: $('#Telefono_Proveedor').val(), Contacto_Persona: $('#Contacto_Proveedor').val(), Correo_Electronico: $('#Correo_Proveedor').val(), Imagen: 'as', ID_Proveedor: $('#ID_Proveedor').val() },
            success: function(Resultado) {

                Swal.fire({
                    type: 'success',
                    title: 'Exito',
                    text: 'Se actualizo correctamente el proveedor.'
                });
                CargarProveedores();

            },
            error: function(Error) {
                Swal.fire({
                    type: 'error',
                    title: 'Error actualizando el proveedor',
                    text: 'Asegurate de ingresar todos los campos'
                });
            }
        });
    }

}

function Eliminar_Proveedor(ID) {
    $.ajax({
        url: 'http://localhost:3000/api/v1/Inventario/Proveedor/',
        type: 'DELETE',
        data: { ID_Proveedor: ID },
        success: function(Resultado) {

            Swal.fire({
                type: 'success',
                title: 'Exito',
                text: 'Se elimino correctamente el proveedor.'
            });
            CargarProveedores();
        },
        error: function(Error) {
            Error = JSON.parse(Error.responseText);
            Swal.fire({
                type: 'error',
                title: 'Error eliminando proveedor',
                text: Error.Mensaje
            });
        }
    });
}

/* CRUD Empleado */

function CargarEmpleado() {
    $.ajax({
        url: 'http://localhost:3000/api/v1/Contabilidad/Empleado',
        type: 'GET',
        success: function(Resultado) {
            Tabla_Remision.clear()
                .draw();
            for (i = 0; i < Resultado.length; i++) {

                Tabla_Remision.row.add([
                    Resultado[i].ID_EMPLEADO,
                    Resultado[i].NOMBRE_EMPLEADO,
                    Resultado[i].APELLIDO_EMPLEADO,
                    moment(Resultado[i].FECHA_NACIMIENTO.split('T')[0], 'YY-MM-DD').format('DD-MM-YYYY'),
                    Resultado[i].CEDULA,
                    moment(Resultado[i].FECHA_INGRESO.split('T')[0], 'YY-MM-DD').format('DD-MM-YYYY'),
                    Resultado[i].CORREO,
                    Resultado[i].DESCRIPCIONCARGO,
                    '<button type="button" class="btn waves-effect waves-light btn-primary btn-color" onclick ="Detallar_Empleado(' + Resultado[i].ID_EMPLEADO + ')"><i class="ion-navicon-round" data-pack="default"></i></button>',
                    '<button type="button" class="btn btn-danger" onclick ="Eliminar_Empleado(' + Resultado[i].ID_EMPLEADO + ')"><i class="ion-close-round" data-pack="default" data-tags="delete, trash, kill, x"></li></button>'
                ]).draw(false);
            }
        },
        error: function(Error) {
            Swal.fire({
                type: 'error',
                title: 'Error listando empleados.',
                text: Error.Mensaje
            });
        }
    });
}

function Detallar_Empleado(ID) {
    $.ajax({
        url: 'http://localhost:3000/api/v1/Contabilidad/Empleado/' + ID,
        type: 'GET',
        success: function(Resultado) {
            $('#Remision_Detalle').show();
            $('#header_empleado').text('Actualizar Empleado');
            $('#Remisiones').hide();

            $('#ID_Empleado').val(Resultado[0].ID_EMPLEADO);
            $('#FechaIngreso_Empleado').val(Resultado[0].FECHA_INGRESO.split('T')[0]);
            $('#Nombre_Empleado').val(Resultado[0].NOMBRE_EMPLEADO);
            $('#Salario_Empleado').val(Resultado[0].SALARIO);
            $('#Apellido_Empleado').val(Resultado[0].APELLIDO_EMPLEADO);
            $('#FechaNacimiento_Empleado').val(Resultado[0].FECHA_NACIMIENTO.split('T')[0]);
            $('#Cedula_Empleado').val(Resultado[0].CEDULA);
            $('#Salario_Empleado').val(Resultado[0].SALARIO);
            $('#Correo_Empleado').val(Resultado[0].CORREO);
            $('#picker_cargos').val(Resultado[0].ID_CARGO);
            $('#ocultar1').hide();
            $('#ocultar2').hide();
            Operacion = 'Actualizar';
            $('#Actualizar_Estuche1').text('Actualizar');
        },
        error: function(Error) {
            Swal.fire({
                type: 'error',
                title: 'Error listando empleado',
                text: Error.Mensaje
            });
        }
    });
}


function ActualizarNuevoEmpleado() {
    var FechaIngreso = moment($('#FechaIngreso_Empleado').val(), 'YYYY-MM-DD').format('DD/MM/YYYY');
    var FechaNacimiento = moment($('#FechaNacimiento_Empleado').val(), 'YYYY-MM-DD').format('DD/MM/YYYY');
    if (Operacion == "Nuevo") {
        $.ajax({
            url: 'http://localhost:3000/api/v1/Contabilidad/Empleado/',
            type: 'POST',
            data: { Nombre_Empleado: $('#Nombre_Empleado').val(), Apellido_Empleado: $('#Apellido_Empleado').val(), Fecha_Nacimiento: FechaNacimiento, Cedula: $('#Cedula_Empleado').val(), Fecha_Ingreso: FechaIngreso, Salario: $('#Salario_Empleado').val(), Usuario: $('#Usuario_Empleado').val(), Contra: $('#Contraseña_Empleado').val(), Correo: $('#Correo_Empleado').val(), ID_Cargo: $('#picker_cargos').val(), Imagen: 'dummy' },
            success: function(Resultado) {

                Swal.fire({
                    type: 'success',
                    title: 'Exito',
                    text: 'Se inserto correctamente el empleado.'
                });
                CargarProveedores();

            },
            error: function(Error) {
                Error = JSON.parse(Error.responseText);
                Swal.fire({
                    type: 'error',
                    title: 'Error insertando el empleado',
                    text: 'Asegurate de ingresar todos los campos'
                });
            }
        });

    } else {

        $.ajax({
            url: 'http://localhost:3000/api/v1/Contabilidad/Empleado/',
            type: 'PUT',
            data: { Nombre_Empleado: $('#Nombre_Empleado').val(), Apellido_Empleado: $('#Apellido_Empleado').val(), Fecha_Nacimiento: FechaNacimiento, Cedula: $('#Cedula_Empleado').val(), Fecha_Ingreso: FechaIngreso, Salario: $('#Salario_Empleado').val(), Usuario: $('#Usuario_Empleado').val(), Contra: $('#Contraseña_Empleado').val(), Correo: $('#Correo_Empleado').val(), ID_Cargo: $('#picker_cargos').val(), Imagen: 'dummy', ID_Empleado: $('#ID_Empleado').val() },
            success: function(Resultado) {

                Swal.fire({
                    type: 'success',
                    title: 'Exito',
                    text: 'Se actualizo correctamente el empleado.'
                });
                CargarEmpleado();

            },
            error: function(Error) {
                Error = JSON.parse(Error.responseText);
                Swal.fire({
                    type: 'error',
                    title: 'Error actualizando el empleado',
                    text: Error.Mensaje
                });
            }
        });
    }


}


function Eliminar_Empleado(ID) {
    $.ajax({
        url: 'http://localhost:3000/api/v1/Contabilidad/Empleado/',
        type: 'DELETE',
        data: { ID_Empleado: ID },
        success: function(Resultado) {

            Swal.fire({
                type: 'success',
                title: 'Exito',
                text: 'Se elimino correctamente el empleado.'
            });
            CargarEmpleado();
        },
        error: function(Error) {
            Swal.fire({
                type: 'error',
                title: 'Error eliminado empleado',
                text: Error.Mensaje
            });
        }
    });
}


/* CRUD PRODUCTO */

function CargarProductos() {
    $.ajax({
        url: 'http://localhost:3000/api/v1/Inventario/Producto',
        type: 'GET',
        success: function(Resultado) {
            Tabla_Instrumento.clear()
                .draw();
            for (i = 0; i < Resultado.length; i++) {
                var Imagen = '<img style = "border-radius:3px;" width = "65" height = "65" src= "' + Resultado[i].IMAGEN + '"></img>';

                Tabla_Instrumento.row.add([
                    Resultado[i].CODIGO_BARRA,
                    Resultado[i].NOMBRE_PRODUCTO,
                    Resultado[i].DESCRIPCION_PRODUCTO,
                    Resultado[i].PRECIO,
                    Resultado[i].STOCK,
                    Resultado[i].STOCK_MAXIMO,
                    Resultado[i].STOCK_MINIMO,
                    '<button type="button" class="btn waves-effect waves-light btn-primary btn-color" onclick ="Detallar_Producto(' + Resultado[i].CODIGO_BARRA + ')"><i class="ion-navicon-round" data-pack="default"></i></button>',
                    '<button type="button" class="btn btn-danger" onclick ="Eliminar_Producto(' + Resultado[i].CODIGO_BARRA + ')"><i class="ion-close-round" data-pack="default" data-tags="delete, trash, kill, x"></li></button>'
                ]).draw(false);
            }
        },
        error: function(Error) {
            Swal.fire({
                type: 'error',
                title: 'Error listando productos',
                text: Error.Mensaje
            });
        }
    });
}

function Detallar_Producto(ID) {
    $.ajax({
        url: 'http://localhost:3000/api/v1/Inventario/Producto/' + ID,
        type: 'GET',
        success: function(Resultado) {

            $('#Instrumento_Detalle').show();
            $('#producto_header').text('Añadir Producto');
            $('#Remisiones').hide();
            $('#Instrumentos').hide();

            $('#Producto_ID').val(Resultado[0].CODIGO_BARRA);
            $('#Producto_Nombre').val(Resultado[0].NOMBRE_PRODUCTO);
            $('#Producto_Descripcion').val(Resultado[0].DESCRIPCION_PRODUCTO);
            $('#Producto_Precio').val(Resultado[0].PRECIO);
            $('Producto_UnidadMedida').val(Resultado[0].ID_UNIDADMEDIDA);
            $('#Producto_Stock').val(Resultado[0].STOCK);
            $('#Producto_StockMinimo').val(Resultado[0].STOCK_MINIMO);
            $('#Producto_StockMaximo').val(Resultado[0].STOCK_MAXIMO);
            $('#Producto_Moneda').val(Resultado[0].ID_MONEDA);
            $('#Producto_Categoria').val(Resultado[0].ID_CATEGORIA);

            Operacion = 'Actualizar';
            $('#AñadirProducto').text('Actualizar');
        },
        error: function(Error) {
            Error = JSON.parse(Error.responseText);
            Swal.fire({
                type: 'error',
                title: 'Error listando producto',
                text: Error.Mensaje
            });
        }
    });
}


function ActualizarNuevoProducto() {
    if (Operacion == "Nuevo") {
        $.ajax({
            url: 'http://localhost:3000/api/v1/Inventario/Producto/',
            type: 'POST',
            data: { ID_Envoltorio: 1, Precio: $('#Producto_Precio').val(), Estanteria: 1, Stock: $('#Producto_Stock').val(), Stock_Minimo: $('#Producto_StockMinimo').val(), Stock_Maximo: $('#Producto_StockMaximo').val(), Gaveta: 1, Nombre_Producto: $('#Producto_Nombre').val(), Descripcion_Producto: $('#Producto_Descripcion').val(), ID_Categoria: $('#Producto_Categoria').val(), ID_Moneda: $('#Producto_Moneda').val(), ID_UnidadMedida: $('#Producto_UnidadMedida').val(), Imagen: 'dummy' },
            success: function(Resultado) {

                Swal.fire({
                    type: 'success',
                    title: 'Exito',
                    text: 'Se inserto correctamente el producto.'
                });
                CargarProductos();

            },
            error: function(Error) {
                Error = JSON.parse(Error.responseText);
                Swal.fire({
                    type: 'error',
                    title: 'Error insertando el producto',
                    text: 'Asegurate de ingresar todos los campos'
                });
            }
        });

    } else {

        $.ajax({
            url: 'http://localhost:3000/api/v1/Inventario/Producto/',
            type: 'PUT',
            data: { ID_Envoltorio: 1, Precio: $('#Producto_Precio').val(), Estanteria: 1, Stock: $('#Producto_Stock').val(), Stock_Minimo: $('#Producto_StockMinimo').val(), Stock_Maximo: $('#Producto_StockMaximo').val(), Gaveta: 1, Nombre_Producto: $('#Producto_Nombre').val(), Descripcion_Producto: $('#Producto_Descripcion').val(), ID_Categoria: $('#Producto_Categoria').val(), ID_Moneda: $('#Producto_Moneda').val(), ID_UnidadMedida: $('#Producto_UnidadMedida').val(), Imagen: 'dummy', ID_Producto: $('#Producto_ID').val() },
            success: function(Resultado) {

                Swal.fire({
                    type: 'success',
                    title: 'Exito',
                    text: 'Se actualizo correctamente el producto.'
                });
                CargarProductos();

            },
            error: function(Error) {
                Error = JSON.parse(Error.responseText);
                Swal.fire({
                    type: 'error',
                    title: 'Error actualizando el producto',
                    text: Error.Mensaje
                });
            }
        });
    }


}


function Eliminar_Producto(ID) {
    $.ajax({
        url: 'http://localhost:3000/api/v1/Inventario/Produto/',
        type: 'DELETE',
        data: { CodigoBarra: ID },
        success: function(Resultado) {

            Swal.fire({
                type: 'success',
                title: 'Exito',
                text: 'Se elimino correctamente el producto.'
            });
            CargarEmpleado();
        },
        error: function(Error) {
            Error = JSON.parse(Error);
            Swal.fire({
                type: 'error',
                title: 'Error eliminando producto',
                text: Error.Mensaje
            });
        }
    });
}


/* CRUD CATEGORIA */



function CargarCategorias() {
    $.ajax({
        url: 'http://localhost:3000/api/v1/Inventario/Categoria',
        type: 'GET',
        success: function(Resultado) {
            Tabla_Aula.clear()
                .draw();
            for (i = 0; i < Resultado.length; i++) {

                Tabla_Aula.row.add([
                    Resultado[i].ID_CATEGORIA,
                    Resultado[i].DESCRIPCION_CATEGORIA,
                    Resultado[i].NOMBRE_CATEGORIA,
                    '<button type="button" class="btn btn-danger" onclick ="Eliminar_Categoria(' + Resultado[i].ID_CATEGORIA + ')"><i class="ion-close-round" data-pack="default" data-tags="delete, trash, kill, x"></li></button>'
                ]).draw(false);
            }
        },
        error: function(Error) {
            Swal.fire({
                type: 'error',
                title: 'Error listando categorias',
                text: Error.Mensaje
            });
        }
    });
}

function InsertarCategoria() {
    if (Operacion == "Nuevo") {
        $.ajax({
            url: 'http://localhost:3000/api/v1/Inventario/Categoria/',
            type: 'POST',
            data: { Nombre_Categoria: $('#Nombre_Categoria').val(), Descripcion_Categoria: $('#Descripcion_Categoria').val() },
            success: function(Resultado) {

                Swal.fire({
                    type: 'success',
                    title: 'Exito',
                    text: 'Se inserto correctamente la categoria.'
                });
                CargarCategorias();

            },
            error: function(Error) {
                Error = JSON.parse(Error.responseText);
                Swal.fire({
                    type: 'error',
                    title: 'Error insertando la categoria',
                    text: 'Asegurate de ingresar todos los campos'
                });
            }
        });
    }

}


function Eliminar_Categoria(ID) {
    $.ajax({
        url: 'http://localhost:3000/api/v1/Inventario/Categoria/',
        type: 'DELETE',
        data: { ID_Categoria: ID },
        success: function(Resultado) {

            Swal.fire({
                type: 'success',
                title: 'Exito',
                text: 'Se elimino correctamente la categoria.'
            });
            CargarCategorias();
        },
        error: function(Error) {
            Error = JSON.parse(Error);
            Swal.fire({
                type: 'error',
                title: 'Error eliminando la categoria',
                text: Error.Mensaje
            });
        }
    });
}