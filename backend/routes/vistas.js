const express = require('express');
const router = express.Router();
const mysql = require('../db');
const expressAsyncHandler = require('express-async-handler');

router.get('/pedido/:id', expressAsyncHandler(async(req, res) => {
    const { id } = req.params
    mysql.query(`SELECT e.codigoUE as CodigoUE, p.correlativoUE as Correlativo, e.nombreUE as NombreUE, 
    e.solicitanteDepto as Solicitante, p.fechaSolicitud as Fecha, 
    p.telefonoExt as Telefono, p.justificacion_Observacion as JO,
    s.nombre as NombreS, s.cargo as Cargo  
    FROM pedido p INNER JOIN solicitante s 
    ON p.idSolicitante = s.id 
    INNER JOIN ejecutores e 
    ON p.idUE = e.id 
    WHERE p.id  = ?`, [id],
    async function(error, rows, field){
        if(!error){
            res.json(rows)
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

router.get("/controlSuministros/:id", expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    mysql.query(`SELECT d.id as ID, d.idKardex as IDK, k.correlativo as KardexCorrelativo, d.idLote as IDL, 
    l.correlativo as LoteCorrelativo, d.fecha as FDK, d.nroReferencia as Ref, remitente as Remitente, 
    entradaCantidad as EntradaC, entradaPrecio as EntradaP, salidadPrecio as SalidaP, salidaCantidad as SalidaC, 
    reajusteCantidad as ReajusC, reajustePrecio as ReajusP, saldoCantidad as SaldoC, saldoPrecio as SaldoP, fechaRequisicion as FechaReq 
    FROM detalleKardex as d 
    INNER JOIN kardex as k ON d.idKardex = k.id
    INNER JOIN lotes as l on d.idLote = l.id;
    WHERE k.id = ?`,[id], 
    async function(error, rows, fields){
        if(!error){
            res.json(rows);
        }else{
            console.log(error.message);
        }
    })
}));

router.get("/controlKardex/:id", expressAsyncHandler(async(req, res) => {
    const { id } = req.params;
    mysql.query(`SELECT id, correlativo, descripcion, codigo, areaDSalud, dependencia
    FROM kardex 
    WHERE id = ?;
    `,[id], async function(error, rows, fields){
        if(!error){
            res.json(rows);
        }else{
            console.log(error.message);
        }
    })
}))
module.exports = router;