const express = require('express');
const router = express.Router();
const mysqlconexion = require('../db');

//get
router.get('/',(req,res)=>{
    sql = "SELECT l.id, l.idProducto, pro.nombre as producto, correlativo, DATE(fechaCad) AS fechaCad, DATE(fechaConPref) AS fechaConPref, cantidad, existencia, precioUnitario, idPresentacion, presentacion, l.estado "+
        "FROM lotes as l "+
        "INNER JOIN producto as pro on l.idProducto = pro.id "+
        "INNER JOIN presentacion as pre on l.idPresentacion = pre.id";
    mysqlconexion.query(sql,
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
    mysqlconexion.query('SELECT * FROM lotes WHERE id=?', [id],(error,rows,fields)=>{
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
    const lotes = {
        producto: req.body.idProducto,
        correlativo: req.body.correlativo,        
        fechaCad: req.body.fechaCad,
        fechaPref: req.body.fechaConPref,
        cantidad: req.body.cantidad,
        //CANTIDAD = EXISTENCIA existencia: req.body.existencia,
        precioUnitario :req.body.precioUnitario,
        presentacion: req.body.idPresentacion,
        estado: "Ingreso"
    };
    mysqlconexion.query(`INSERT INTO lotes(idProducto, correlativo, fechaCad, fechaConPref, cantidad, existencia, precioUnitario, idPresentacion, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [lotes.producto, lotes.correlativo,  lotes.fechaCad, lotes.fechaPref, lotes.cantidad, lotes.cantidad, lotes.precioUnitario, lotes.presentacion, lotes.estado], 
        (error,rows,fields)=>{
            if(!error){
                res.json(rows);
                console.log('Enviado');
            }
            else{
                res.json("No pudo se enviado");
                console.log(error);
            }
    })
});

//put
router.put('/:id', (req,res)=>{
    const {id} = req.params;
    const lotes = {
        producto: req.body.idProducto,
        correlativo: req.body.correlativo,
        fechaCad: req.body.fechaCad,
        fechaPref: req.body.fechaConPref,
        cantidad: req.body.cantidad,
        existencia: req.body.existencia,
        precioUnitario :req.body.precioUnitario,
        presentacion: req.body.idPresentacion,
        estado: req.body.estado
    };
    mysqlconexion.query(`UPDATE lotes SET idProducto=?, correlativo=?, fechaCad=?, fechaConPref=?, cantidad=?, existencia=?, precioUnitario=?, idPresentacion=?, estado=? WHERE id=?`,
        [lotes.producto, lotes.correlativo,  lotes.fechaCad, lotes.fechaPref, lotes.cantidad, lotes.existencia, lotes.precioUnitario, lotes.presentacion, lotes.estado, id], 
        (error,rows,fields)=>{
            if(!error){
                res.json(rows);
                console.log('Se ha actualizado');
            }
            else{
                res.json("No pudo se actualizado");
                console.log(error);
            }
    })
});

//Existencia
router.put('/existencia/:id', (req,res)=>{
    const {id} = req.params;
    const existencia = req.body.existencia;
    mysqlconexion.query('UPDATE lotes SET existencia = ? WHERE id=?',
        [existencia, id],
        (error,rows,fields)=>{
            if(!error){
                res.json(rows);
                console.log('Se ha actualizado');
            }
            else{
                res.json("No pudo se actualizado");
                console.log(error);
            }
    })
});

//delete
router.delete('/:id', (req,res)=>{
    const {id} = req.params;
    mysqlconexion.query('DELETE FROM lotes WHERE id=?',[id], (error,rows,fields)=>{
        if(!error){
            res.json(rows);
        }
        else{
            console.log(error);
        }
    })
});

module.exports = router;