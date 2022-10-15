const express = require('express');
const router = express.Router();
const mysqlconexion = require('../db');

//get
router.get('/',(req,res)=>{
    mysqlconexion.query('SELECT * FROM ingreso',
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
    mysqlconexion.query('SELECT * FROM ingreso WHERE id=?', [id],(error,rows,fields)=>{
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
    const ingreso = {
        lote: req.body.idLote,
        usuarioReceptor: req.body.idUReceptor,
        fechaIng: req.body.fechaIngreso,
        descripcion: req.body.descripcion,
        cantidad: req.body.cantidad,
        total:req.body.total,
        equivalencia: req.body.EquivalenciaU 
    };
    mysqlconexion.query(`INSERT INTO ingreso(idLote, idUReceptor, fechaIngreso, descripcion, cantidad, total, EquivalenciaU) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [ingreso.lote, ingreso.usuarioReceptor,  ingreso.fechaIng, ingreso.descripcion, ingreso.cantidad, ingreso.total, ingreso.equivalencia], 
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
    const ingreso = {
        lote: req.body.idLote,
        usuarioReceptor: req.body.idUReceptor,
        fechaIng: req.body.fechaIngreso,
        descripcion: req.body.descripcion,
        cantidad: req.body.cantidad,
        total:req.body.total,
        equivalencia: req.body.EquivalenciaU 
    };
    mysqlconexion.query(`UPDATE ingreso SET idLote=?, idUReceptor=?, fechaIngreso=?, descripcion=?, cantidad=?, total=?, EquivalenciaU=? WHERE id=?`,
        [ingreso.lote, ingreso.usuarioReceptor,  ingreso.fechaIng, ingreso.descripcion, ingreso.cantidad, ingreso.total, ingreso.equivalencia, id], 
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
    mysqlconexion.query('DELETE FROM ingreso WHERE id=?',[id], (error,rows,fields)=>{
        if(!error){
            res.json(rows);
        }
        else{
            console.log(error);
        }
    })
});

module.exports = router;