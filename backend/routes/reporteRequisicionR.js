const express = require('express');
const router = express.Router();
const mysqlconexion = require('../db');

router.get('/', (req, res) => {

    mysqlconexion.query('SELECT req.fecha, req.codigoAprobacion, req.aprobado , sol.nombre as Solicitante, ser.nombre as Servicio '+
        'from requisicion as req '+
        'inner join solicitante as sol  on sol.id = req.idSolicitante '+
        'inner join servicio as ser on ser.id = req.idServicio; ',(error, rows, fields) => {
            if (!error) {
                res.json(rows);

            } else {

                console.log(error);
            }
        });
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    mysqlconexion.query('SELECT req.fecha, req.codigoAprobacion, req.aprobado , sol.nombre as Solicitante, ser.nombre as Servicio '+
        'from requisicion as req '+
        'inner join solicitante as sol  on sol.id = req.idSolicitante '+
        'inner join servicio as ser on ser.id = req.idServicio '+
        'where req.id = ?;', [id],(error, rows, fields) => {
            if (!error) {
                res.json(rows);

            } else {

                console.log(error);
            }
        });
});


module.exports = router;