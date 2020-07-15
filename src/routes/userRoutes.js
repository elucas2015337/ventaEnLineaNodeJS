'use stric'

var express = require("express")
var UserController = require("../controllers/userController")
var md_auth = require('../middlewares/authenticated')


//RUTAS
var api = express.Router();
api.post('/registrar', UserController.registrar)
api.post('/login', UserController.login)
api.put('/editarUsuario', md_auth.ensureAuth, UserController.editarUsuario)
api.delete('/eliminarUsuario', md_auth.ensureAuth, UserController.eliminarUsuario)
api.put('/editarClientes/:id', md_auth.ensureAuth, UserController.editarClientes)
api.delete('/eliminarClientes/:id', md_auth.ensureAuth, UserController.eliminarClientes)
api.put('/agregar_a_Carrito', md_auth.ensureAuth, UserController.añadirCarrito)
api.put('/comprar', md_auth.ensureAuth, UserController.comprar)
api.get('/facturasXcliente', md_auth.ensureAuth, UserController.facturasUsuario)
api.get('/productosXfactura', md_auth.ensureAuth, UserController.productoXFactura)
api.post('/crearPDF', UserController.createPDF)

module.exports = api;