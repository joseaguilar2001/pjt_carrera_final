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
        eCantidad: req.body.entradaCantidad,
        sCantidad: req.body.salidaCantidad,
        rCantidad: req.body.reajusteCantidad,
        saldoCantidad : req.body.saldoCantidad,
        fechaRequisicion :req.body.fechaRequisicion
    };
    mysqlconexion.query(`CALL crearActualizarDKardex(?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 'create');`,
        [detalleKardex.kardex, detalleKardex.lote, detalleKardex.fecha, detalleKardex.noRef,  detalleKardex.eCantidad, detalleKardex.sCantidad, detalleKardex.rCantidad, detalleKardex.saldoCantidad, detalleKardex.fechaRequisicion], 
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
        eCantidad: req.body.entradaCantidad,
        sCantidad: req.body.salidaCantidad,
        rCantidad: req.body.reajusteCantidad,
        saldoCantidad : req.body.saldoCantidad,
        fechaRequisicion :req.body.fechaRequisicion
    };
    mysqlconexion.query(`CALL crearActualizarDKardex(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'update');`,
        [detalleKardex.kardex, detalleKardex.lote, detalleKardex.fecha, detalleKardex.noRef, detalleKardex.eCantidad, detalleKardex.sCantidad, detalleKardex.rCantidad, detalleKardex.saldoCantidad, detalleKardex.fechaRequisicion, id],
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