'use stric'

var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
    nombreProducto: String,
    descripcion : String,
    stock: Number,
    precio: Number,
    categoria: { type: Schema.ObjectId, ref: 'categoria' },
    unidadesVendidas: Number

})

module.exports = mongoose.model('producto', ProductoSchema);