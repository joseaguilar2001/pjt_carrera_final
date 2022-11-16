const express = require('express');
const router = express.Router();
const mysqlconexion = require('../db');


router.get('/', (req, res) => {
    mysqlconexion.query('SELECT ROW_NUMBER() OVER(ORDER BY l.id) AS no, l.fechaIngreso, '+
    'pro.nombre, pre.presentacion, pro.unidadMedida, l.fechaCad, l.correlativo as lote, '+
    'k.correlativo as kardex, l.cantidad, l.precioUnitario, (l.cantidad * l.precioUnitario) as total '+
        'FROM lotes as l '+
        'INNER JOIN producto as pro on l.idProducto = pro.id '+
        'INNER JOIN presentacion as pre on l.idPresentacion = pre.id '+
        'INNER JOIN detalleKardex as de on l.id = de.idLote '+
        'INNER JOIN kardex as k on k.id = de.idKardex;',
        (error, rows, fields) => {
            if (!error) {
                res.json(rows);

            } else {

                console.log(error);
            }
        });
});



module.exports = router;