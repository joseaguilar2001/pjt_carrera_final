const express = require('express');
const router = express.Router();
const mysqlconexion = require('../db');

//get

router.get('/',(req,res)=>{
    mysqlconexion.query('SELECT d.id, d.idKardex, k.correlativo as KardexCorrelativo, d.idLote, l.correlativo as LoteCorrelativo, d.fecha, d.nroReferencia, re.nombre as remitente, entradaCantidad, entradaPrecio, salidadPrecio, salidaCantidad, reajusteCantidad, reajustePrecio, saldoCantidad, saldoPrecio, fechaRequisicion'+
        ' FROM detalleKardex as d'+ 
        ' INNER JOIN kardex as k ON d.idKardex = k.id'+
        ' INNER JOIN lotes as l on d.idLote = l.id'+
        ' INNER JOIN remitente as re on l.idRemitente = re.id',
    (error,rows,fields)=>{
        if(!error){
            res.json(rows);
        }
        else{
            console.log(error);
        }
    }) 
});

//post
router.post('/', (req,res)=>{
    const detalleKardex = {
        kardex: req.body.idKardex,
        lote: req.body.idLote,
        fecha: req.body.fecha,
        noRef: req.body.nroReferencia,
        remitente: req.body.remitente,
        eCantidad: req.body.entradaCantidad,
        ePrecio: req.body.entradaPrecio,
        sCantidad: req.body.salidadPrecio,
        sPrecio: req.body.salidaCantidad,
        rCantidad: req.body.reajusteCantidad,
        rPrecio: req.body.reajustePrecio,
        saldoCantidad : req.body.saldoCantidad,
        saldoPrecio: req.body.saldoPrecio,
        fechaRequisicion :req.body.fechaRequisicion
    };
    mysqlconexion.query(
        `INSERT INTO detalleKardex(idKardex, idLote, fecha, nroReferencia, remitente, entradaCantidad, entradaPrecio, salidadPrecio, salidaCantidad, reajusteCantidad, reajustePrecio, saldoCantidad, saldoPrecio, fechaRequisicion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [detalleKardex.kardex, detalleKardex.lote, detalleKardex.fecha, detalleKardex.noRef, detalleKardex.remitente, detalleKardex.eCantidad, detalleKardex.ePrecio, detalleKardex.sCantidad, detalleKardex.sPrecio, detalleKardex.rCantidad, detalleKardex.rPrecio, detalleKardex.saldoCantidad, detalleKardex.saldoPrecio, detalleKardex.fechaRequisicion], 
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
    const detalleKardex = {
        kardex: req.body.idKardex,
        lote: req.body.idLote,
        fecha: req.body.fecha,
        noRef: req.body.nroReferencia,
        remitente: req.body.remitente,
        eCantidad: req.body.entradaCantidad,
        ePrecio: req.body.entradaPrecio,
        sCantidad: req.body.salidadPrecio,
        sPrecio: req.body.salidaCantidad,
        rCantidad: req.body.reajusteCantidad,
        rPrecio: req.body.reajustePrecio,
        saldoCantidad : req.body.saldoCantidad,
        saldoPrecio: req.body.saldoPrecio,
        fechaRequisicion :req.body.fechaRequisicion
    };
    mysqlconexion.query(`UPDATE detalleKardex SET idKardex=?, idLote=?, fecha=?, nroReferencia=?, remitente=?, entradaCantidad=?, entradaPrecio=?, salidadPrecio=?, salidaCantidad=?, reajusteCantidad=?, reajustePrecio=?, saldoCantidad=?, saldoPrecio=?, fechaRequisicion=? WHERE id=?`,
        [detalleKardex.kardex, detalleKardex.lote, detalleKardex.fecha, detalleKardex.noRef, detalleKardex.remitente, detalleKardex.eCantidad, detalleKardex.ePrecio, detalleKardex.sCantidad, detalleKardex.sPrecio, detalleKardex.rCantidad, detalleKardex.rPrecio, detalleKardex.saldoCantidad, detalleKardex.saldoPrecio, detalleKardex.fechaRequisicion, id], 
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
    mysqlconexion.query('DELETE FROM detalleKardex WHERE id=?',[id], (error,rows,fields)=>{
        if(!error){
            res.json(rows);
        }
        else{
            console.log(error);
        }
    })
});

module.exports = router;