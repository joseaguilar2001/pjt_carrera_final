const express = require('express');
const router = express.Router();
const mysql = require('../db');
const expressAsyncHandler = require('express-async-handler');

router.get('/', expressAsyncHandler(async(req, res) => {
    mysql.query('SELECT * FROM bingresoSistema', async function(error, rows, fields){
        if(!error){
            res.send(rows);
        }else{
            res.send(error.message);
        }
    });
    return;
}));

router.get('/:id', expressAsyncHandler(async(req, res) => {
    const {id} = req.params;
    mysql.query('SELECT * FROM bingresoSistema WHERE idBitacora = ?', [id], async function(error, rows, fields){
        if(!error){
            res.send(rows[0]);
        }else{
            res.send(error.message);
        }
    });
    return;
}));

router.post('/', expressAsyncHandler(async(req, res) => {
    const nuevo = {
        idUsuario: req.body.idUsuario,
        FechaIngreso: req.body.FechaIngreso,
        FechaSalida: req.body.FechaSalida,
        Operacion: req.body.Operacion
    };
    mysql.query('INSERT INTO bingresoSistema(idUsuario, FechaIngreso, FechaSalida, Operacion) VALUES (?, ?, ?, ?)',
    [nuevo.idUsuario, nuevo.FechaIngreso, nuevo.FechaSalida, nuevo.Operacion], async function(error, rows, fields){
        if(!error){
            res.send(rows);
        }else{
            res.send(error.message);
        }
    });
    return;
}));

router.put('/:id', expressAsyncHandler(async(req, res) => {
    const { id } = req.params;
    const nuevo = {
        idUsuario: req.body.idUsuario,
        FechaIngreso: req.body.FechaIngreso,
        FechaSalida: req.body.FechaSalida,
        Operacion: req.body.Operacion
    };
    mysql.query('UPDATE bingresoSistema SET idUsuario = ?, FechaIngreso = ?, FechaSalida = ?, Operacion = ? WHERE idBitacora = ?',
    [nuevo.idUsuario, nuevo.FechaIngreso, nuevo.FechaSalida, nuevo.Operacion, id], async function(error, rows, fields){
        if(!error){
            res.send(rows);
        }else{
            res.send(error.message);
        }
    });
    return;
}));

router.delete('/:id', expressAsyncHandler(async(req, res) => {
    const { id } = req.params;
    mysql.query('DELETE FROM bingresoSistema WHERE idBitacora = ?',
    [id], async function(error, rows, fields){
        if(!error){
            res.send(rows);
        }else{
            res.send(error.message);
        }
    });
    return;
}));

module.exports = router;