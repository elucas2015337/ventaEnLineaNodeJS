'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var FacturaSchema = Schema({
    NoSerie: Number,
    empresa: String,
    fecha: Date,
    compra: [{
        nombreProducto: String,
        cantidad: Number,
        precio: Number,
        codigoProducto: { type: Schema.ObjectId, ref: 'producto' },
        total: Number
    }],
    user: { type: Schema.ObjectId, ref: 'user' },
    pagina: String
})

module.exports = mongoose.model('factura', FacturaSchema)