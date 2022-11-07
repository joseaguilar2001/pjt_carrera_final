const express = require('express');
const router = express.Router();
const mysqlconexion = require('../db');


router.get('/', (req, res) => {
    mysqlconexion.query('SELECT de.descripcion, de.cantidad, de.cantidaDespachada, de.precioUnitario, de.precioTotal, l.correlativo as Lote, pro.nombre '+
        'FROM requisicionDetalle as de '+
        'INNER JOIN lotes as l on l.id = de.idLote '+
        'INNER JOIN producto as pro on pro.id = l.idProducto; ',(error, rows, fields) => {
            if (!error) {
                res.json(rows);

            } else {

                console.log(error);
            }
        });
});




module.exports = router;