const express = require('express');
const router = express.Router();
const mysqlconexion = require('../db');

//get
router.get('/',(req,res)=>{
    mysqlconexion.query('SELECT * FROM ejecutores',
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
    mysqlconexion.query('SELECT * FROM ejecutores WHERE id=?', [id],(error,rows,fields)=>{
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
    const ejecutores = {
        codigo: req.body.codigoUE,
        nombre: req.body.nombreUE,
        dep: req.body.solicitanteDepto,
        estado: req.body.estado
    };
    //console.log(req.body);
    mysqlconexion.query(`INSERT INTO ejecutores(codigoUE, nombreUE, solicitanteDepto, estado) VALUES (?, ?, ?,?)`,
        [ejecutores.codigo, ejecutores.nombre, ejecutores.dep,  ejecutores.estado], 
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
    const ejecutores = {
        codigo: req.body.codigoUE,
        nombre: req.body.nombreUE,
        dep: req.body.solicitanteDepto,
        estado: req.body.estado
    };
    mysqlconexion.query(`UPDATE ejecutores SET codigoUE=?, nombreUE=?, solicitanteDepto=?, estado=? WHERE id=?`,
        [ejecutores.codigo, ejecutores.nombre, ejecutores.dep,  ejecutores.estado, id], 
        (error,rows,fields)=>{
            if(!error){
                res.json(rows);
            }
            else{
                console.log(error);
            }
    })
});

//delete
router.delete('/:id', (req,res)=>{
    const {id} = req.params;
    mysqlconexion.query('DELETE FROM ejecutores WHERE id=?',[id], (error,rows,fields)=>{
        if(!error){
            res.json(rows);
        }
        else{
            console.log(error);
        }
    })
});

module.exports = router;