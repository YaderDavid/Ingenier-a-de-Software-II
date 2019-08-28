/* Definiendo controladores del modulo */
const productoController = require('../controllers/inventario/producto.Controller.js');
const proveedorController = require('../controllers/inventario/proveedor.Controller.js');
const categoriaController = require('../controllers/inventario/categoria.Controller.js');

module.exports = function(Router) {

    /* Rutas para el controlador de productos */
    Router.get('/Inventario/Producto/:id', productoController.ObtenerProducto);
    Router.get('/Inventario/Producto', productoController.ObtenerListaProductos);
    Router.post('/Inventario/Producto', productoController.InsertarProducto);
    Router.put('/Inventario/Producto', productoController.ActualizarProducto);
    Router.delete('/Inventario/Producto', productoController.EliminarProducto);

    /* Rutas para el controlador proveedor */
    Router.get('/Inventario/Proveedor/:id', proveedorController.ObtenerProveedor);
    Router.get('/Inventario/Proveedor', proveedorController.ObtenerListaProveedores);
    Router.post('/Inventario/Proveedor', proveedorController.InsertarProveedor);
    Router.put('/Inventario/Proveedor', proveedorController.ActualizarProveedor);
    Router.delete('/Inventario/Proveedor', proveedorController.EliminarProveedor);



    /* Rutas para el controlador categoria */
    Router.get('/Inventario/Categoria', categoriaController.ObtenerListaCategorias);
    Router.post('/Inventario/Categoria', categoriaController.InsertarCategoria);
    Router.put('/Inventario/Categoria', categoriaController.ActualizarCategoria);
    Router.delete('/Inventario/Categoria', categoriaController.EliminarCategoria);





};