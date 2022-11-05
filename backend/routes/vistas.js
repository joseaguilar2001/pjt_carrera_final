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