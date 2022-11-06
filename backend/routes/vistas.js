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

router.get('/pedido/:id', expressAsyncHandler(async(req, res) => {
    const { id } = req.params
    mysql.query(`SELECT e.codigoUE as CodigoUE, p.correlativoUE as Correlativo, e.nombreUE as NombreUE, 
    e.solicitanteDepto as Solicitante, p.fechaSolicitud as Fecha, 
    p.telefonoExt as Telefono, p.justificacion_Observacion as JO  
    FROM pedido p INNER JOIN solicitante s
    s.nombre as NombreS, s.cargo as Cargo 
    ON p.idSolicitante = s.id 
    INNER JOIN ejecutores e 
    ON p.idUE = e.id 
    WHERE p.id  = ?`, [id],
    async function(error, rows, field){
        if(!error){
            res.send({
                status: 200,
                CodigoUE: rows[0].CodigoUE,
                Correlativo: rows[0].Correlativo,
                NombreUE: rows[0].NombreUE,
                Solicitante: rows[0].Solicitante,
                Fecha: rows[0].Fecha,
                Telefono: rows[0].Telefono,
                JO: rows[0].JO,
                NombreS: rows[0].NombreS,
                Cargo: rows[0].Cargo,
            })
        }else{
            res.send(error.message);
        }
    })
}));

router.get('/pedidoDetalle/:id', expressAsyncHandler(async(req, res) => {
    const { id } = req.params
    mysql.query(`SELECT  pd.id as ID, p.unidadMedida as UM, pd.codInsumo as COI, 
    pd.cantidad as Cant, pd.cantidadAutorizada as CantA, pd.descripcion as Descripcion, 
    pd.renglonAfectado as RA, pd.valorEstimado as VA, pd.IncluidoPAAC as PAAC, 
    pd.contratoAbierto as CAB 
    FROM pedidoDetalle pd 
    INNER JOIN producto p 
    ON pd.idProducto = p.id 
    WHERE pd.idPedido = ?;`, [id],
    async function(error, rows, field){
        if(!error){
            res.json(rows);
        }else{
            res.send(error.message);
        }
    })    
}));

module.exports = router;