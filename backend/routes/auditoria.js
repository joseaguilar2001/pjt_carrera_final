const express = require('express');
const router = express.Router();
const mysqlconexion = require('../db');


router.get('/', (req, res) => {
    mysqlconexion.query(' Select count(*) as no, producto.nombre, presentacion.presentacion, producto.unidadMedida, lotes.fechaCad, lotes.correlativo as lote, kardex.correlativo as kardex, lotes.cantidad, lotes.precioUnitario, SUM(lotes.cantidad * lotes.precioUnitario) as total from producto inner join presentacion on producto.id = presentacion.id inner join lotes on lotes.idProducto = producto.id inner join kardex on kardex.id = producto.id;',
        (error, rows, fields) => {
            if (!error) {
                res.json(rows);

            } else {

                console.log(error);
            }
        });
});



module.exports = router;