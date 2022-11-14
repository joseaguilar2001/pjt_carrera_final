const express = require('express');
const router = express.Router();
const mysqlconexion = require('../db');

//get
router.get('/',(req,res)=>{
    mysqlconexion.query('SELECT d.id, d.idLote, l.correlativo as Lote, d.idProducto, p.nombre as Producto, d.idRequisicion as Requisicion, d.descripcion, d.cantidad, cantidaDespachada, d.precioUnitario, precioTotal '+
	'FROM requisicionDetalle as d '+
    'LEFT JOIN lotes as l ON d.idLote = l.id '+
    'INNER JOIN requisicion as r ON d.idRequisicion = r.id '+
    'LEFT JOIN producto as p on d.idProducto = p.id;',
    (error,rows,fields)=>{
        if(!error){
            res.json(rows);
        }
        else{
            console.log(error);
        }
    }) 
});

//get con ID
router.get('/:id', (req,res)=>{
    const {id} = req.params;
    mysqlconexion.query('SELECT * FROM requisiciondetalle WHERE id=?', [id],(error,rows,fields)=>{
        if (!error){
            res.json(rows[0]);
        }
        else{
            console.log(error);
        }
    });
});

//post
router.post('/', (req,res)=>{
    const requisiciondetalle = {
        producto: req.body.idProducto,
        lote: req.body.idLote,
        requisicion: req.body.idRequisicion,
        descripcion: req.body.descripcion,
        cantidad: req.body.cantidad,
        cantidadDespachada: req.body.cantidaDespachada
    };
    mysqlconexion.query(
        `CALL createRequisicionDes(?, ?, ?, ?, ?, ?)`,
        [requisiciondetalle.lote, requisiciondetalle.producto, requisiciondetalle.requisicion, requisiciondetalle.descripcion, requisiciondetalle.cantidad, requisiciondetalle.cantidadDespachada], 
        (error,rows,fields)=>{
            if(!error){
                res.json(rows);
                console.log('Enviado');
            }
            else{
                console.log(error);
            }
    })
});


router.post('/solicitud/', (req,res)=>{
    const requisiciondetalle = {
        producto: req.body.idProducto,
        requisicion: req.body.idRequisicion,
        descripcion: req.body.descripcion,
        cantidad: req.body.cantidad,
    };
    mysqlconexion.query(
        `INSERT INTO requisiciondetalle(idProducto, idRequisicion, descripcion, cantidad) VALUES (?, ?, ?, ?)`,
        [requisiciondetalle.producto, requisiciondetalle.requisicion, requisiciondetalle.descripcion, requisiciondetalle.cantidad], 
        (error,rows,fields)=>{
            if(!error){
                res.json(rows);
                console.log('Enviado');
            }
            else{
                console.log(error);
            }
    })
});

//put
router.put('/:id', (req,res)=>{
    const {id} = req.params;
    const requisiciondetalle = {
        producto: req.body.idProducto,
        lote: req.body.idLote,
        descripcion: req.body.descripcion,
        cantidad: req.body.cantidad,
        cantidadDespachada: req.body.cantidaDespachada
    };
    mysqlconexion.query(`CALL editRequisicionDes(?, ?, ?, ?, ?, ?);`,
        [requisiciondetalle.lote, requisiciondetalle.producto, requisiciondetalle.descripcion, requisiciondetalle.cantidad, requisiciondetalle.cantidadDespachada, id], 
        (error,rows,fields)=>{
            if(!error){
                res.json(rows);
                console.log('Se ha actualizado despachador');
            }
            else{
                console.log(error);
            }
    })
});

router.put('/solicitud/:id', (req,res)=>{
    const {id} = req.params;
    const requisiciondetalle = {
        producto: req.body.idProducto,
        descripcion: req.body.descripcion,
        cantidad: req.body.cantidad,
    };
    mysqlconexion.query(`UPDATE requisiciondetalle SET idProducto=?, descripcion=?, cantidad=? WHERE id=?`,
        [requisiciondetalle.producto, requisiciondetalle.descripcion, requisiciondetalle.cantidad, id], 
        (error,rows,fields)=>{
            if(!error){
                res.json(rows);
                console.log('Se ha actualizado');
            }
            else{
                console.log(error);
            }
    })
});

//delete
router.delete('/:id', (req,res)=>{
    const {id} = req.params;
    mysqlconexion.query('DELETE FROM requisiciondetalle WHERE id=?',[id], (error,rows,fields)=>{
        if(!error){
            res.json(rows);
        }
        else{
            console.log(error);
        }
    })
});

module.exports = router;