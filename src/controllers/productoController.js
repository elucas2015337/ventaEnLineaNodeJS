'use strict'

var Producto = require('../models/producto')
var Categoria = require('../models/categoria')

function crearProducto(req, res){
    var producto = new Producto();
    var params = req.body;

    if(req.user.rol != 'ROLE_ADMIN') return res.send({ message: 'no tienes permisos para registrar un producto' })

    if(params.nombreProducto && params.stock && params.precio && params.idCategoria){
        producto.nombreProducto = params.nombreProducto
        producto.descripcion = params.descripcion
        producto.stock = params.stock
        producto.precio = params.precio
        producto.categoria = params.idCategoria

        Producto.find({ $or: [
            {descripcion: producto.descripcion}
        ]}).exec((err, products) => {
            if(err) return res.status(500).send({message}).send({message: 'Error en la peticion de productos'})
            if(products && products.length >= 1){
                return res.status(500).send({message: 'el producto ya existe'})
            }else{

                Categoria.findById(producto.categoria, (err, categoriaEncontrada)=>{
                    if(err) return res.status(500).send({ message: 'error en la petición de categorias' })
                    if(!categoriaEncontrada) return res.status(404).send({ message: 'no se ha encontrado la categoria' })
                    producto.save((err, productoGuardado) => {
                        if(err) return res.status(500).send({message: 'error al guardar el producto'})
                        if(productoGuardado){
                            res.status(200).send({producto: productoGuardado})
                        }else{
                            res.status(404).send({message: 'no se ha podido guardar el producto'})
                        }
                        
                    })
                })
                
            }
        })
        
    }else{
        res.status(200).send({
            message: 'Rellene todos los datos necesarios'
        })
    }
}

function editarProducto(req, res) {
    var idProducto = req.params.id;
    var datos = req.body;
    var categoria = req.body.idCategoria
    
    if(req.user.rol != 'ROLE_ADMIN') return res.send({ message: 'no tienes permiso para editar productos' })
    
        if(categoria){
            Categoria.findById(datos.idCategoria, (err, categoriaEncontrada)=>{
                if(err) return res.status(500).send({ message: 'error en la peticion de categorias' })
                if(!categoriaEncontrada) return res.status(404).send({ message: 'no se ha encontrado la categoria' })
            })
        }else{
            Producto.findByIdAndUpdate(idProducto, {nombreProducto: datos.nombreProducto, descripcion: datos.descripcion, $inc:{stock: datos.stock}, precio: datos.precio, categoria: datos.idCategoria}, {new: true}, (err, productoActualizado)=>{
                if(err) //{
                   // console.log(err)
                   // return err
              //  } 
              return  res.status(500).send({ message: 'error en la petición de productos' })
                if(!productoActualizado) return res.status(404).send({ message: 'error al editar el producto' })
                return res.status(200).send({ productoActualizado })
            })
        }
        
}

function eliminarProduco(req, res) {
    var idProducto = req.params.id;

    if(req.user.rol != 'ROLE_ADMIN') return res.send({ message: 'NO tienes permiso para eliminar productos' })
    Producto.findByIdAndDelete(idProducto, (err, productoEliminado)=>{
        if(err) return res.status(500).send({ message: 'error en la petición de productos' })
        if(!productoEliminado) return res.status(404).send({message: 'error al eliminar el producto' })
        return res.status(200).send({ message: 'Producto Eliminado' })
    })
}

function listarProductos(req, res) {
    var idProducto = req.body.idProducto;
    var idCategoria = req.body.idCategoria;

    if(idProducto && idCategoria){
        return res.send({ message: 'Busca de una sola manera' })
    }else if(idProducto){
        Producto.findById(idProducto, (err, productoEncontrado)=>{
            if(err) return res.status(500).send({ message: 'error en la petición de productos' })
            if(!productoEncontrado) return res.status(404).send({ message: 'error al listar el producto' })
            return res.status(200).send(productoEncontrado)
        })
    }else if(idCategoria){
        Producto.find({categoria: idCategoria}, (err, productosEncontrados)=>{
            if(err) return res.status(500).send({ message: 'Error en la petición de productos' })
            if(!productosEncontrados) return res.status(404).send({ message: 'Error al listar los productos' })
            return res.status(200).send({ productosEncontrados })
        })
    }else{
        Producto.find({}, (err, productosEncontrados)=>{
            if(err) return res.status(500).send({ message: 'error en la petición de productos' })
            if(!productosEncontrados) return res.status(404).send({ message: 'error al listar los productos' })
            return res.status(200).send({ productosEncontrados })
        })
    }
}


function buscarProductoNombre(req, res) {
    var parametro = req.body.parametro;

    Producto.find(
        {nombreProducto: {$regex: parametro, $options: "i"}} , (err, productosEncontrados)=>{
        if(err) return res.status(500).send({ message: 'error en la peticion de Productos' })
       // if(!productosEncontrados) return res.status(404).send({ message: 'no se han podido listar los productos' })
          
                
                return res.status(200).send({productos: productosEncontrados})
            

    })
}

///////////////////////////////////Busqueda Productos/////////////////////


function productosAgotados(req, res) {
    if(req.user.rol != 'ROLE_ADMIN') return res.send({ message: 'No puedes realizar esta acción' })

    Producto.find({stock: 0}, (err, productoAgotados)=>{
        if(err) return res.status(500).send({ message: 'error en la petición de productos' })
        if(!productoAgotados) return res.status(404).send({ message: 'Error al listar los productos' })
        if(productoAgotados.length == 0) return res.send({ message: 'No hay producto Agotados' })

        return res.status(200).send({ productos: productoAgotados })
    })
}

function productosMasVendidos(req, res) {
    if(req.user.rol != 'ROLE_ADMIN') return res.send({ message: 'No puedes realizar esta acción' })

    Producto.find({}).sort({unidadesVendidas: -1}).exec((err, productosMasVendidos)=>{
        if(err) return res.status(500).send({ message: 'error en la petición de productos' })
        if(!productosMasVendidos) return res.status(404).send({ message: 'error al listar los productos' })
        return res.status(200).send({ productos: productosMasVendidos })
    })
}

module.exports={
    crearProducto,
    editarProducto,
    eliminarProduco,
    listarProductos,
    buscarProductoNombre,
    productosAgotados,
    productosMasVendidos
}