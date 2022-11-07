const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const router = express.Router();
const mysqlconexion = require('../db');

router.get('/',expressAsyncHandler(async(req, res) =>{
    mysqlconexion.query('SELECT p.id, p.idRol, r.nombre as rol, p.estado ' +
    ' FROM permisos AS p ' +
    ' INNER JOIN rol AS r on p.idRol = r.id ', 
    async function (error, rows, fields){
        if(!error){
            res.json(rows);
        }
        else{
            console.log(error);
        }
    });
    return;
}));

router.get('/:id', expressAsyncHandler(async(req, res) => {
    const { id } = req.params;
    mysqlconexion.query('SELECT * FROM permisos WHERE id = ?', [id], async function(error, rows, failed){
        if(!error){
            res.json(rows[0]);
        }
        else{
            console.log(error);
        }
    });
    return;
}));

router.post('/', expressAsyncHandler(async(req, res) => {
    const permiso = {
        nombre: req.body.nombre,
        estado: req.body.estado, 
        idRol: req.body.idRol,
    };
    mysqlconexion.query('INSERT INTO permisos(nombre, estado, idRol) VALUES (?, ?, ?)', 
    [permiso.nombre, permiso.estado, permiso.idRol],
    async function(error, rows, fields){
        if(!error){
            res.json(rows);
        }
        else{
            console.log(error);
        }
    });
    return;
}));

router.put('/:id', expressAsyncHandler(async(req, res) => {
    const {id} = req.params;
    const permiso = {
        nombre: req.body.nombre,
        estado: req.body.estado, 
        idRol: req.body.idRol,
    };
    mysqlconexion.query('UPDATE permisos SET nombre = ?, estado = ?, idRol = ? WHERE id = ?', 
    [permiso.nombre, permiso.estado, permiso.idRol,id],
    async function(error, rows, fields){
        if(!error){
            res.json(rows);
        }
        else{
            console.log(error);
        }
    });
    return;
}));

router.delete('/:id', expressAsyncHandler(async(req, res) => {
    const {id} = req.params;
    mysqlconexion.query('UPDATE permisos SET estado = 0 WHERE id = ?', 
    [id],
    async function(error, rows, fields){
        if(!error){
            res.json(rows);
        }
        else{
            console.log(error);
        }
    });
    return;
}));

module.exports = router;