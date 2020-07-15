'use stric'

var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var CategoriaSchema = Schema({
    nombreCategoria: String,
    descripcionCategoria : String
})

module.exports = mongoose.model('categoria', CategoriaSchema);