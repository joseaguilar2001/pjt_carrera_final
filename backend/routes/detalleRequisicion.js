const express = require('express');
const router = express.Router();
const mysqlconexion = require('../db');

//get
router.get('/',(req,res)=>{
    mysqlconexion.query('SELECT * FROM requisiciondetalle',
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
        lote: req.body.idLote,
        requisicion: req.body.idRequisicion,
        descripcion: req.body.descripcion,
        cantidad: req.body.cantidad,
        cantidadDespachada: req.body.cantidaDespachada,
        precioUnitario: req.body.precioUnitario,
        precioTotal: req.body.precioTotal
    };
    mysqlconexion.query(
        `INSERT INTO requisiciondetalle(idLote, idRequisicion, descripcion, cantidad, cantidaDespachada, precioUnitario, precioTotal) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [requisiciondetalle.lote, requisiciondetalle.requisicion, requisiciondetalle.descripcion, requisiciondetalle.cantidad, requisiciondetalle.cantidadDespachada, requisiciondetalle.precioUnitario, requisiciondetalle.precioTotal], 
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
        lote: req.body.idLote,
        requisicion: req.body.idRequisicion,
        descripcion: req.body.descripcion,
        cantidad: req.body.cantidad,
        cantidadDespachada: req.body.cantidaDespachada,
        precioUnitario: req.body.precioUnitario,
        precioTotal: req.body.precioTotal
    };
    mysqlconexion.query(`UPDATE requisiciondetalle SET idLote=?, idRequisicion=?,  descripcion=?, cantidad=?, cantidaDespachada=?, precioUnitario=?, precioTotal=? WHERE id=?`,
        [requisiciondetalle.lote, requisiciondetalle.requisicion, requisiciondetalle.descripcion, requisiciondetalle.cantidad, requisiciondetalle.cantidadDespachada, requisiciondetalle.precioUnitario, requisiciondetalle.precioTotal, id], 
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