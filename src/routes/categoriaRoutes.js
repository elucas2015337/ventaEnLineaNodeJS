'use stric'

var express = require("express")
var CategoriaController = require("../controllers/categoriaController")
var md_auth = require('../middlewares/authenticated')


//RUTAS
var api = express.Router();
api.post('/crearCategoria', md_auth.ensureAuth, CategoriaController.crearCategoria)
api.put('/editarCategoria/:id', md_auth.ensureAuth, CategoriaController.editarCategoria)
api.delete('/eliminarCategoria/:id', md_auth.ensureAuth, CategoriaController.eliminarCategoria)
api.get('/listarCategorias', CategoriaController.listarCategorias)
module.exports = api;