const express = require('express');
const router = express.Router();
const mysqlconexion = require('../db');

//get
router.get('/',(req,res)=>{
    mysqlconexion.query('SELECT * FROM kardex',
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
    mysqlconexion.query('SELECT * FROM kardex WHERE id=?', [id],(error,rows,fields)=>{
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
    const kardex = {
        correlativo: req.body.correlativo,
        descripcion: req.body.descripcion,
        codigo: req.body.codigo,
        area: req.body.areaDSalud,
        dependencia: req.body.dependencia
    };
    //console.log(req.body);
    mysqlconexion.query(`INSERT INTO kardex(correlativo, descripcion, codigo, areaDSalud, dependencia) VALUE (?, ?, ?, ?, ?)`,
        [kardex.correlativo, kardex.descripcion,  kardex.codigo, kardex.area, kardex.dependencia], 
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
    const kardex = {
        correlativo: req.body.correlativo,
        descripcion: req.body.descripcion,
        codigo: req.body.codigo,
        area: req.body.areaDSalud,
        dependencia: req.body.dependencia
    };
    mysqlconexion.query(`UPDATE kardex SET correlativo=?, descripcion=?, codigo=?, areaDSalud=?, dependencia=? WHERE id=?`,
        [kardex.correlativo, kardex.descripcion,  kardex.codigo, kardex.area, kardex.dependencia, id], 
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
    mysqlconexion.query('DELETE FROM kardex WHERE id=?',[id], (error,rows,fields)=>{
        if(!error){
            res.json(rows);
        }
        else{
            console.log(error);
        }
    })
});

module.exports = router;