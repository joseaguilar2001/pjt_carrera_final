const express = require('express');
const router = express.Router();
const mysqlconexion = require('../db');

//get
router.get('/',(req,res)=>{
    mysqlconexion.query('SELECT * FROM solicitante',
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
    mysqlconexion.query('SELECT * FROM solicitante WHERE id=?', [id],(error,rows,fields)=>{
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
    const solicitante = {
        nombre: req.body.nombre,
        cargo: req.body.cargo,        
        estado: req.body.estado
    };
    //console.log(req.body);
    mysqlconexion.query(`INSERT INTO solicitante(nombre, cargo, estado) VALUES (?, ?, ?)`,
        [solicitante.nombre, solicitante.cargo,  solicitante.estado], 
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
    let  solicitante = {
        nombre: req.body.nombre,
        cargo: req.body.cargo,
        estado: req.body.estado
    };
    mysqlconexion.query(`UPDATE solicitante SET nombre=?, cargo=?, estado=? WHERE id=?`,
        [solicitante.nombre, solicitante.cargo, solicitante.estado, id], 
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
    mysqlconexion.query('DELETE FROM solicitante WHERE id=?',[id], (error,rows,fields)=>{
        if(!error){
            res.json(rows);
        }
        else{
            console.log(error);
        }
    })
});

module.exports = router;