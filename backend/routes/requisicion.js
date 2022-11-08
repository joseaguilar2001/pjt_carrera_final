const express = require('express');
const router = express.Router();
const mysqlconexion = require('../db');

//get
router.get('/',(req,res)=>{
    mysqlconexion.query('SELECT r.id, r.idUsuarioEncargado, u.nombre as Encargado, r.idServicio, se.nombre as Servicio, r.idSolicitante, so.nombre as Solicitante, aprobado, fecha, categoria '+
	'FROM requisicion as r '+
    'INNER JOIN usuario as u ON r.idUsuarioEncargado = u.id '+
    'INNER JOIN solicitante as so ON r.idSolicitante = so.id '+
    'INNER JOIN servicio as se ON r.idServicio = se.id;',
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
    mysqlconexion.query('SELECT * FROM requisicion WHERE id=?', [id],(error,rows,fields)=>{
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
    const requisicion = {
        uEncargado: req.body.idUsuarioEncargado,
        servicio: req.body.idServicio,
        solicitante: req.body.idSolicitante,
        aprobado: req.body.aprobado,
        categoria: req.body.categoria,
        cAprobacion: req.body.codigoAprobacion
    };
    mysqlconexion.query(
        `INSERT INTO requisicion(idUsuarioEncargado, idServicio, idSolicitante, aprobado, fecha, categoria) VALUES (?, ?, ?, ?, curdate(), ?)`,
        [requisicion.uEncargado, requisicion.servicio, requisicion.solicitante, requisicion.aprobado, requisicion.categoria, requisicion.cAprobacion], 
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
    const requisicion = {
        uEncargado: req.body.idUsuarioEncargado,
        servicio: req.body.idServicio,
        solicitante: req.body.idSolicitante,
        aprobado: req.body.aprobado,
        categoria: req.body.categoria,
        cAprobacion: req.body.codigoAprobacion
    };
    mysqlconexion.query(`UPDATE requisicion SET idUsuarioEncargado=?, idServicio=?,  idSolicitante=?, aprobado=?, categoria=? WHERE id=?`,
        [requisicion.uEncargado, requisicion.servicio, requisicion.solicitante, requisicion.aprobado, requisicion.categoria, id], 
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
    mysqlconexion.query('DELETE FROM requisicion WHERE id=?',[id], (error,rows,fields)=>{
        if(!error){
            res.json(rows);
        }
        else{
            console.log(error);
        }
    })
});

module.exports = router;