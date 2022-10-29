const express = require('express');
const router = express.Router();
const mysql = require('../db');
const expressAsyncHandler = require('express-async-handler');

router.get('/', expressAsyncHandler(async(req, res) => {
    mysql.query('SELECT * FROM rol', async function (error, rows, fields){
        if(!error){
            res.json(rows);
        }
        else{
            console.log(error);
        }
    });
    return;
}));

router.get('/:id',expressAsyncHandler(async (req, res) => {
    const {id} = req.params;
    mysql.query('SELECT * FROM rol WHERE id = ?', [id], (error, rows, fields) => {
        if(!error){
            res.json(rows[0]);
        }else {
            console.log(error);
        }
    });
    return;
}));

router.post('/',expressAsyncHandler(async(req, res) => {
    const rol = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        estado: req.body.estado
    }
    mysql.query('INSERT INTO rol(nombre, descripcion, estado) VALUES (?, ?, ?)', [rol.nombre, rol.descripcion, rol.estado], async function(error, rows, fields){
        if(!error){
            res.json(rows);
        }else{
            console.log(error);
        }
    });
    return;
}));

router.put('/:id', expressAsyncHandler(async(req, res) => {
    const {id} = req.params;
    const rol = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        estado: req.body.estado
    };
    mysql.query('UPDATE rol SET nombre = ?, descripcion = ?, estado = ? WHERE id = ?',[rol.nombre, rol.descripcion, rol.estado, id],
    async function(error, rows, fields){
        if(!error){
            res.json(rows);
        }else{
            console.log(error);
        }
    });
    return;
}));

router.delete('/:id', expressAsyncHandler(async(req, res) => {
    const {id} = req.params;
    mysql.query('UPDATE rol SET estado = 0 WHERE id = ?',[id],
    async function(error, rows, fields){
        if(!error){
            res.json(rows);
        }else{
            console.log(error);
        }
    });
    return;
}));

module.exports = router;