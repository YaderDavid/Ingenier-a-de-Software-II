--------------------------------------------------------
-- Archivo creado  - martes-julio-16-2019   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Procedure CO_CARGO_CREATE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."CO_CARGO_CREATE" (
  P_DESCRIPCION IN VARCHAR2
) AS 
BEGIN

    INSERT INTO CO_CARGO (ID_CARGO,DESCRIPCION) 
    VALUES(CO_CARGO_SEQUENCE.nextval,P_DESCRIPCION);
    COMMIT;
END;

/
--------------------------------------------------------
--  DDL for Procedure CO_CARGO_DELETE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."CO_CARGO_DELETE" (
  P_ID_CARGO IN INT
) AS 
BEGIN

    DELETE FROM CO_CARGO 
    WHERE ID_CARGO = P_ID_CARGO ;
    COMMIT;
END;

/
--------------------------------------------------------
--  DDL for Procedure CO_CARGO_UPDATE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."CO_CARGO_UPDATE" (
  P_ID_CARGO IN INT,
  P_DESCRIPCION IN VARCHAR2
) AS 
BEGIN

    UPDATE CO_CARGO 
    SET DESCRIPCION = P_DESCRIPCION
    WHERE ID_CARGO = P_ID_CARGO ;
    COMMIT;
END;

/
--------------------------------------------------------
--  DDL for Procedure CO_EMPLEADO_CREATE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."CO_EMPLEADO_CREATE" (
     P_ID_CARGO IN CO_EMPLEADO.ID_CARGO%TYPE
    ,P_CORREO IN CO_EMPLEADO.CORREO%TYPE
    ,P_CONTRASEŅA IN CO_EMPLEADO.CONTRASEŅA%TYPE
    ,P_NOMBRE_EMPLEADO IN CO_EMPLEADO.NOMBRE_EMPLEADO%TYPE
    ,P_FECHA_INGRESO IN CO_EMPLEADO.FECHA_INGRESO%TYPE
    ,P_SALARIO IN CO_EMPLEADO.SALARIO%TYPE
    ,P_CEDULA IN CO_EMPLEADO.CEDULA%TYPE
    ,P_APELLIDO_EMPLEADO IN CO_EMPLEADO.APELLIDO_EMPLEADO%TYPE
    ,P_FECHA_NACIMIENTO IN CO_EMPLEADO.FECHA_NACIMIENTO%TYPE
    ,P_USUARIO IN CO_EMPLEADO.USUARIO%TYPE
    ,P_IMAGEN IN CO_EMPLEADO.IMAGEN%TYPE) 
IS
BEGIN
    INSERT INTO CO_EMPLEADO(ID_CARGO,CORREO,CONTRASEŅA,NOMBRE_EMPLEADO,FECHA_INGRESO,SALARIO,CEDULA,ID_EMPLEADO,APELLIDO_EMPLEADO,FECHA_NACIMIENTO,USUARIO,IMAGEN) 
    VALUES (P_ID_CARGO,P_CORREO,P_CONTRASEŅA,P_NOMBRE_EMPLEADO,P_FECHA_INGRESO,P_SALARIO,P_CEDULA,CO_EMPLEADO_SEQUENCE.nextval,P_APELLIDO_EMPLEADO,P_FECHA_NACIMIENTO,P_USUARIO,P_IMAGEN);
    COMMIT;
END;

/
--------------------------------------------------------
--  DDL for Procedure CO_EMPLEADO_DELETE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."CO_EMPLEADO_DELETE" 
(
    P_ID_EMPLEADO IN CO_EMPLEADO.ID_EMPLEADO%TYPE
) 
IS
BEGIN
    DELETE FROM CO_EMPLEADO
    WHERE ID_EMPLEADO = P_ID_EMPLEADO;
    COMMIT;
END;

/
--------------------------------------------------------
--  DDL for Procedure CO_EMPLEADO_RESTABLECERCONTRASEŅA
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."CO_EMPLEADO_RESTABLECERCONTRASEŅA" (
  P_CORREO IN VARCHAR2,
  P_CONTRASEŅA IN VARCHAR2
) AS 
BEGIN

    UPDATE CO_EMPLEADO CE
    SET CE.CONTRASEŅA = P_CONTRASEŅA 
    WHERE CE.CORREO = P_CORREO;
    COMMIT;
END;

/
--------------------------------------------------------
--  DDL for Procedure CO_EMPLEADO_UPDATE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."CO_EMPLEADO_UPDATE" 
(
     P_ID_CARGO IN CO_EMPLEADO.ID_CARGO%TYPE
    ,P_CORREO IN CO_EMPLEADO.CORREO%TYPE
    ,P_NOMBRE_EMPLEADO IN CO_EMPLEADO.NOMBRE_EMPLEADO%TYPE
    ,P_FECHA_INGRESO IN CO_EMPLEADO.FECHA_INGRESO%TYPE
    ,P_SALARIO IN CO_EMPLEADO.SALARIO%TYPE
    ,P_CEDULA IN CO_EMPLEADO.CEDULA%TYPE
    ,P_ID_EMPLEADO IN CO_EMPLEADO.ID_EMPLEADO%TYPE
    ,P_APELLIDO_EMPLEADO IN CO_EMPLEADO.APELLIDO_EMPLEADO%TYPE
    ,P_FECHA_NACIMIENTO IN CO_EMPLEADO.FECHA_NACIMIENTO%TYPE
    ,P_IMAGEN IN CO_EMPLEADO.IMAGEN%TYPE
) 
IS
BEGIN
    UPDATE CO_EMPLEADO 
    SET ID_CARGO = P_ID_CARGO,CORREO = P_CORREO,NOMBRE_EMPLEADO = P_NOMBRE_EMPLEADO,FECHA_INGRESO = P_FECHA_INGRESO,SALARIO = P_SALARIO,CEDULA = P_CEDULA,APELLIDO_EMPLEADO = P_APELLIDO_EMPLEADO,FECHA_NACIMIENTO = P_FECHA_NACIMIENTO,IMAGEN = P_IMAGEN
    WHERE ID_EMPLEADO = P_ID_EMPLEADO;
    COMMIT;
END;

/
--------------------------------------------------------
--  DDL for Procedure CO_MONEDA_CREATE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."CO_MONEDA_CREATE" 
(
    P_EQUIVALENCIA_DOLAR IN CONF_MONEDA.EQUIVALENCIA_DOLAR%TYPE
    ,P_NOMBRE_MONEDA IN CONF_MONEDA.NOMBRE_MONEDA%TYPE
    ,P_CODIGO_INTERNACIONAL IN CONF_MONEDA.CODIGO_INTERNACIONAL%TYPE
) 
IS
BEGIN
    INSERT INTO CONF_MONEDA(EQUIVALENCIA_DOLAR,NOMBRE_MONEDA,ID_MONEDA,CODIGO_INTERNACIONAL) 
    VALUES (P_EQUIVALENCIA_DOLAR,P_NOMBRE_MONEDA,CO_MONEDA_SEQUENCE.nextval,P_CODIGO_INTERNACIONAL);
END;

/
--------------------------------------------------------
--  DDL for Procedure CO_MONEDA_DELETE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."CO_MONEDA_DELETE" 
(
    P_ID_MONEDA IN CONF_MONEDA.ID_MONEDA%TYPE
) 
IS
BEGIN
    DELETE FROM CONF_MONEDA
    WHERE ID_MONEDA = P_ID_MONEDA;
END;

/
--------------------------------------------------------
--  DDL for Procedure CO_MONEDA_UPDATE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."CO_MONEDA_UPDATE" 
(
    P_EQUIVALENCIA_DOLAR IN CONF_MONEDA.EQUIVALENCIA_DOLAR%TYPE
    ,P_NOMBRE_MONEDA IN CONF_MONEDA.NOMBRE_MONEDA%TYPE
    ,P_ID_MONEDA IN CONF_MONEDA.ID_MONEDA%TYPE
    ,P_CODIGO_INTERNACIONAL IN CONF_MONEDA.CODIGO_INTERNACIONAL%TYPE
) 
IS
BEGIN
    UPDATE CONF_MONEDA SET EQUIVALENCIA_DOLAR = P_EQUIVALENCIA_DOLAR,NOMBRE_MONEDA = P_NOMBRE_MONEDA,CODIGO_INTERNACIONAL = P_CODIGO_INTERNACIONAL
    WHERE ID_MONEDA = P_ID_MONEDA;
END;

/
--------------------------------------------------------
--  DDL for Procedure CO_PERMISO_CREATE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."CO_PERMISO_CREATE" (
  P_ID_CARGO IN INT,
  P_ID_MODULO IN INT
) AS 
BEGIN

    INSERT INTO CO_PERMISO (ID_CARGO,ID_MODULO) 
    VALUES(P_ID_CARGO,P_ID_MODULO);
    COMMIT;
END;


/
--------------------------------------------------------
--  DDL for Procedure CO_PERMISO_DELETE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."CO_PERMISO_DELETE" (
  P_ID_CARGO IN INT,
  P_ID_MODULO IN INT
) AS 
BEGIN

    DELETE FROM CO_PERMISO 
    WHERE ID_CARGO = P_ID_CARGO AND ID_MODULO = P_ID_MODULO;
    COMMIT;
END;

/
--------------------------------------------------------
--  DDL for Procedure IN_CATEGORIA_CREATE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."IN_CATEGORIA_CREATE" 
(
    P_NOMBRE_CATEGORIA IN IN_CATEGORIA.NOMBRE_CATEGORIA%TYPE
    ,P_DESCRIPCION_CATEGORIA IN IN_CATEGORIA.DESCRIPCION_CATEGORIA%TYPE
) 
IS
BEGIN
    INSERT INTO IN_CATEGORIA(NOMBRE_CATEGORIA,DESCRIPCION_CATEGORIA,ID_CATEGORIA) 
    VALUES (P_NOMBRE_CATEGORIA,P_DESCRIPCION_CATEGORIA,CO_CATEGORIA_SEQUENCE.nextval);
END;

/
--------------------------------------------------------
--  DDL for Procedure IN_CATEGORIA_DELETE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."IN_CATEGORIA_DELETE" 
(
    P_ID_CATEGORIA IN IN_CATEGORIA.ID_CATEGORIA%TYPE
) 
IS
BEGIN
    DELETE FROM IN_CATEGORIA
    WHERE ID_CATEGORIA = P_ID_CATEGORIA;
END;

/
--------------------------------------------------------
--  DDL for Procedure IN_CATEGORIA_UPDATE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."IN_CATEGORIA_UPDATE" 
(
    P_NOMBRE_CATEGORIA IN IN_CATEGORIA.NOMBRE_CATEGORIA%TYPE
    ,P_DESCRIPCION_CATEGORIA IN IN_CATEGORIA.DESCRIPCION_CATEGORIA%TYPE
    ,P_ID_CATEGORIA IN IN_CATEGORIA.ID_CATEGORIA%TYPE
) 
IS
BEGIN
    UPDATE IN_CATEGORIA SET NOMBRE_CATEGORIA = P_NOMBRE_CATEGORIA,DESCRIPCION_CATEGORIA = P_DESCRIPCION_CATEGORIA
    WHERE ID_CATEGORIA = P_ID_CATEGORIA;
END;

/
--------------------------------------------------------
--  DDL for Procedure IN_MATERIAPRIMA_CREATE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."IN_MATERIAPRIMA_CREATE" 
(
    P_STOCK_MAXIMO IN IN_MATERIAPRIMA.STOCK_MAXIMO%TYPE
    ,P_DESCRIPCION_MATERIA IN IN_MATERIAPRIMA.DESCRIPCION_MATERIA%TYPE
    ,P_NOMBRE_MATERIA IN IN_MATERIAPRIMA.NOMBRE_MATERIA%TYPE
    ,P_ID_CATEGORIA IN IN_MATERIAPRIMA.ID_CATEGORIA%TYPE
    ,P_ID_MONEDA IN IN_MATERIAPRIMA.ID_MONEDA%TYPE
    ,P_COSTE IN IN_MATERIAPRIMA.COSTE%TYPE
    ,P_STOCK IN IN_MATERIAPRIMA.STOCK%TYPE
    ,P_STOCK_MINIMO IN IN_MATERIAPRIMA.STOCK_MINIMO%TYPE
    ,P_IMAGEN IN IN_MATERIAPRIMA.IMAGEN%TYPE
    ,P_ID_PROVEEDOR IN IN_MATERIAPRIMA.ID_PROVEEDOR%TYPE
) 
IS
BEGIN
    INSERT INTO IN_MATERIAPRIMA(STOCK_MAXIMO,DESCRIPCION_MATERIA,NOMBRE_MATERIA,ID_CATEGORIA,ID_MONEDA,COSTE,STOCK,STOCK_MINIMO,IMAGEN,ID_MATERIAPRIMA,ID_PROVEEDOR) 
    VALUES (P_STOCK_MAXIMO,P_DESCRIPCION_MATERIA,P_NOMBRE_MATERIA,P_ID_CATEGORIA,P_ID_MONEDA,P_COSTE,P_STOCK,P_STOCK_MINIMO,P_IMAGEN,IN_MATERIPRIMA_SEQUENCE.nextval,P_ID_PROVEEDOR);
END;

/
--------------------------------------------------------
--  DDL for Procedure IN_MATERIAPRIMA_DELETE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."IN_MATERIAPRIMA_DELETE" 
(
    P_ID_MATERIAPRIMA IN IN_MATERIAPRIMA.ID_MATERIAPRIMA%TYPE
) 
IS
BEGIN
    DELETE FROM IN_MATERIAPRIMA
    WHERE ID_MATERIAPRIMA = P_ID_MATERIAPRIMA;
END;

/
--------------------------------------------------------
--  DDL for Procedure IN_MATERIAPRIMA_UPDATE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."IN_MATERIAPRIMA_UPDATE" 
(
    P_STOCK_MAXIMO IN IN_MATERIAPRIMA.STOCK_MAXIMO%TYPE
    ,P_DESCRIPCION_MATERIA IN IN_MATERIAPRIMA.DESCRIPCION_MATERIA%TYPE
    ,P_NOMBRE_MATERIA IN IN_MATERIAPRIMA.NOMBRE_MATERIA%TYPE
    ,P_ID_CATEGORIA IN IN_MATERIAPRIMA.ID_CATEGORIA%TYPE
    ,P_ID_MONEDA IN IN_MATERIAPRIMA.ID_MONEDA%TYPE
    ,P_COSTE IN IN_MATERIAPRIMA.COSTE%TYPE
    ,P_STOCK IN IN_MATERIAPRIMA.STOCK%TYPE
    ,P_STOCK_MINIMO IN IN_MATERIAPRIMA.STOCK_MINIMO%TYPE
    ,P_IMAGEN IN IN_MATERIAPRIMA.IMAGEN%TYPE
    ,P_ID_MATERIAPRIMA IN IN_MATERIAPRIMA.ID_MATERIAPRIMA%TYPE
    ,P_ID_PROVEEDOR IN IN_MATERIAPRIMA.ID_PROVEEDOR%TYPE
) 
IS
BEGIN
    UPDATE IN_MATERIAPRIMA SET STOCK_MAXIMO = P_STOCK_MAXIMO,DESCRIPCION_MATERIA = P_DESCRIPCION_MATERIA,NOMBRE_MATERIA = P_NOMBRE_MATERIA,ID_CATEGORIA = P_ID_CATEGORIA,ID_MONEDA = P_ID_MONEDA,COSTE = P_COSTE,STOCK = P_STOCK,STOCK_MINIMO = P_STOCK_MINIMO,IMAGEN = P_IMAGEN,ID_PROVEEDOR = P_ID_PROVEEDOR
    WHERE ID_MATERIAPRIMA = P_ID_MATERIAPRIMA;
END;

/
--------------------------------------------------------
--  DDL for Procedure IN_PRODUCTO_CREATE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."IN_PRODUCTO_CREATE" 
(
     P_ID_ENVOLTORIO IN IN_PRODUCTO.ID_ENVOLTORIO%TYPE
    ,P_PRECIO IN IN_PRODUCTO.PRECIO%TYPE
    ,P_ESTANTERIA IN IN_PRODUCTO.ESTANTERIA%TYPE
    ,P_STOCK IN IN_PRODUCTO.STOCK%TYPE
    ,P_STOCK_MINIMO IN IN_PRODUCTO.STOCK_MINIMO%TYPE
    ,P_STOCK_MAXIMO IN IN_PRODUCTO.STOCK_MAXIMO%TYPE
    ,P_GAVETA IN IN_PRODUCTO.GAVETA%TYPE
    ,P_NOMBRE_PRODUCTO IN IN_PRODUCTO.NOMBRE_PRODUCTO%TYPE
    ,P_DESCRIPCION_PRODUCTO IN IN_PRODUCTO.DESCRIPCION_PRODUCTO%TYPE
    ,P_ID_CATEGORIA IN IN_PRODUCTO.ID_CATEGORIA%TYPE
    ,P_ID_MONEDA IN IN_PRODUCTO.ID_MONEDA%TYPE
    ,P_ID_UNIDADMEDIDA IN IN_PRODUCTO.ID_UNIDADMEDIDA%TYPE
    ,P_IMAGEN IN IN_PRODUCTO.IMAGEN%TYPE
) 
IS
BEGIN
    INSERT INTO IN_PRODUCTO(ID_ENVOLTORIO,PRECIO,CODIGO_BARRA,ESTANTERIA,STOCK,STOCK_MINIMO,STOCK_MAXIMO,GAVETA,NOMBRE_PRODUCTO,DESCRIPCION_PRODUCTO,ID_CATEGORIA,ID_MONEDA,ID_UNIDADMEDIDA,IMAGEN) 
    VALUES ( P_ID_ENVOLTORIO,P_PRECIO,IN_PRODUCTO_SEQUENCE.nextval,P_ESTANTERIA,P_STOCK,P_STOCK_MINIMO,P_STOCK_MAXIMO,P_GAVETA,P_NOMBRE_PRODUCTO,P_DESCRIPCION_PRODUCTO,P_ID_CATEGORIA,P_ID_MONEDA,P_ID_UNIDADMEDIDA,P_IMAGEN);
END;

/
--------------------------------------------------------
--  DDL for Procedure IN_PRODUCTO_DELETE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."IN_PRODUCTO_DELETE" 
(
    P_CODIGO_BARRA IN IN_PRODUCTO.CODIGO_BARRA%TYPE
) 
IS
BEGIN
    DELETE FROM IN_PRODUCTO
    WHERE CODIGO_BARRA = P_CODIGO_BARRA;
END;

/
--------------------------------------------------------
--  DDL for Procedure IN_PRODUCTO_UPDATE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."IN_PRODUCTO_UPDATE" 
(
    P_ID_ENVOLTORIO IN IN_PRODUCTO.ID_ENVOLTORIO%TYPE
    ,P_PRECIO IN IN_PRODUCTO.PRECIO%TYPE
    ,P_CODIGO_BARRA IN IN_PRODUCTO.CODIGO_BARRA%TYPE
    ,P_ESTANTERIA IN IN_PRODUCTO.ESTANTERIA%TYPE
    ,P_STOCK IN IN_PRODUCTO.STOCK%TYPE
    ,P_STOCK_MINIMO IN IN_PRODUCTO.STOCK_MINIMO%TYPE
    ,P_STOCK_MAXIMO IN IN_PRODUCTO.STOCK_MAXIMO%TYPE
    ,P_GAVETA IN IN_PRODUCTO.GAVETA%TYPE
    ,P_NOMBRE_PRODUCTO IN IN_PRODUCTO.NOMBRE_PRODUCTO%TYPE
    ,P_DESCRIPCION_PRODUCTO IN IN_PRODUCTO.DESCRIPCION_PRODUCTO%TYPE
    ,P_ID_CATEGORIA IN IN_PRODUCTO.ID_CATEGORIA%TYPE
    ,P_ID_MONEDA IN IN_PRODUCTO.ID_MONEDA%TYPE
    ,P_ID_UNIDADMEDIDA IN IN_PRODUCTO.ID_UNIDADMEDIDA%TYPE
    ,P_IMAGEN IN IN_PRODUCTO.IMAGEN%TYPE
) 
IS
BEGIN
    UPDATE IN_PRODUCTO SET
    ID_ENVOLTORIO = P_ID_ENVOLTORIO,PRECIO = P_PRECIO,ESTANTERIA = P_ESTANTERIA,STOCK = P_STOCK,STOCK_MINIMO = P_STOCK_MINIMO,STOCK_MAXIMO = P_STOCK_MAXIMO,GAVETA = P_GAVETA,NOMBRE_PRODUCTO = P_NOMBRE_PRODUCTO,DESCRIPCION_PRODUCTO = P_DESCRIPCION_PRODUCTO,ID_CATEGORIA = P_ID_CATEGORIA,ID_MONEDA = P_ID_MONEDA,ID_UNIDADMEDIDA = P_ID_UNIDADMEDIDA,IMAGEN = P_IMAGEN
    WHERE CODIGO_BARRA = P_CODIGO_BARRA;
    COMMIT;
END;

/
--------------------------------------------------------
--  DDL for Procedure IN_PROVEEDOR_CREATE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."IN_PROVEEDOR_CREATE" 
(
    P_DIRECCION IN IN_PROVEEDOR.DIRECCION%TYPE
    ,P_CONTACTO_PERSONA IN IN_PROVEEDOR.CONTACTO_PERSONA%TYPE
    ,P_ES_EMPRESA IN IN_PROVEEDOR.ES_EMPRESA%TYPE
    ,P_TELEFONO IN IN_PROVEEDOR.TELEFONO%TYPE
    ,P_DESCRIPCION IN IN_PROVEEDOR.DESCRIPCION%TYPE
    ,P_CORREO_ELECTRONICO IN IN_PROVEEDOR.CORREO_ELECTRONICO%TYPE
    ,P_NOMBRE IN IN_PROVEEDOR.NOMBRE%TYPE
    ,P_IMAGEN IN IN_PROVEEDOR.IMAGEN%TYPE
) 
IS
BEGIN
    INSERT INTO IN_PROVEEDOR(DIRECCION,CONTACTO_PERSONA,ES_EMPRESA,TELEFONO,DESCRIPCION,CORREO_ELECTRONICO,NOMBRE,IMAGEN,ID_PROVEEDOR) 
    VALUES ( P_DIRECCION,P_CONTACTO_PERSONA,P_ES_EMPRESA,P_TELEFONO,P_DESCRIPCION,P_CORREO_ELECTRONICO,P_NOMBRE,P_IMAGEN,IN_PROVEEDOR_SEQUENCE.nextval);
END;

/
--------------------------------------------------------
--  DDL for Procedure IN_PROVEEDOR_DELETE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."IN_PROVEEDOR_DELETE" 
(
    P_ID_PROVEEDOR IN IN_PROVEEDOR.ID_PROVEEDOR%TYPE
) 
IS
BEGIN
    DELETE FROM IN_PROVEEDOR
    WHERE ID_PROVEEDOR = P_ID_PROVEEDOR;
END;

/
--------------------------------------------------------
--  DDL for Procedure IN_PROVEEDOR_UPDATE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."IN_PROVEEDOR_UPDATE" 
(
    P_DIRECCION IN IN_PROVEEDOR.DIRECCION%TYPE
    ,P_CONTACTO_PERSONA IN IN_PROVEEDOR.CONTACTO_PERSONA%TYPE
    ,P_ES_EMPRESA IN IN_PROVEEDOR.ES_EMPRESA%TYPE
    ,P_TELEFONO IN IN_PROVEEDOR.TELEFONO%TYPE
    ,P_DESCRIPCION IN IN_PROVEEDOR.DESCRIPCION%TYPE
    ,P_CORREO_ELECTRONICO IN IN_PROVEEDOR.CORREO_ELECTRONICO%TYPE
    ,P_NOMBRE IN IN_PROVEEDOR.NOMBRE%TYPE
    ,P_IMAGEN IN IN_PROVEEDOR.IMAGEN%TYPE
    ,P_ID_PROVEEDOR IN IN_PROVEEDOR.ID_PROVEEDOR%TYPE
) 
IS
BEGIN
    UPDATE IN_PROVEEDOR 
    SET DIRECCION = P_DIRECCION,CONTACTO_PERSONA = P_CONTACTO_PERSONA,ES_EMPRESA = P_ES_EMPRESA,TELEFONO = P_TELEFONO,DESCRIPCION = P_DESCRIPCION,CORREO_ELECTRONICO = P_CORREO_ELECTRONICO,NOMBRE = P_NOMBRE,IMAGEN = P_IMAGEN
    WHERE ID_PROVEEDOR = P_ID_PROVEEDOR;
END;

/
--------------------------------------------------------
--  DDL for Procedure IN_UBICACION_CREATE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."IN_UBICACION_CREATE" 
(
    P_GAVETA IN IN_UBICACION.GAVETA%TYPE
    ,P_ESTANTERIA IN IN_UBICACION.ESTANTERIA%TYPE
) IS
BEGIN
    INSERT INTO IN_UBICACION(GAVETA,ESTANTERIA) 
    VALUES (P_GAVETA,P_ESTANTERIA);
END;

/
--------------------------------------------------------
--  DDL for Procedure IN_UBICACION_DELETE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."IN_UBICACION_DELETE" 
(
    P_ESTANTERIA IN IN_UBICACION.ESTANTERIA%TYPE
    ,P_GAVETA IN IN_UBICACION.GAVETA%TYPE
) 
IS
BEGIN
    DELETE FROM IN_UBICACION
    WHERE ESTANTERIA = P_ESTANTERIA AND GAVETA = P_GAVETA;
END;

/
