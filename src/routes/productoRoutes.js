'use stric'

var express = require("express")
var ProductoController = require("../controllers/productoController")
var md_auth = require('../middlewares/authenticated')


//RUTAS
var api = express.Router();
api.post('/crearProducto', md_auth.ensureAuth, ProductoController.crearProducto)
api.put('/editarProducto/:id', md_auth.ensureAuth, ProductoController.editarProducto)
api.delete('/eliminarProducto/:id', md_auth.ensureAuth, ProductoController.eliminarProduco)
api.get('/listarProductos', ProductoController.listarProductos)
api.get('/buscarProductosNombre', ProductoController.buscarProductoNombre)
api.get('/productosAgotados', md_auth.ensureAuth, ProductoController.productosAgotados)
api.get('/productosMasVendidos', md_auth.ensureAuth, ProductoController.productosMasVendidos)

module.exports = api;