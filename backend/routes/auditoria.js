const express = require('express');
const router = express.Router();
const mysqlconexion = require('../db');


router.get('/', (req, res) => {
    mysqlconexion.query('Select producto.nombre, presentacion.presentacion, producto.unidadMedida, lotes.fechaCad, lotes.correlativo, kardex.correlativo, lotes.cantidad, lotes.precioUnitario, SUM(lotes.cantidad * lotes.precioUnitario) from producto inner join presentacion on producto.id = presentacion.id inner join lotes on lotes.idProducto = producto.id inner join kardex on kardex.id = producto.id;',
        (error, rows, fields) => {
            if (!error) {
                res.json(rows);

            } else {

                console.log(error);
            }
        });
});

//GET

router.get('/:id', (req, res) => {

    const { id } = req.params;
    mysqlconexion.query('Select producto.nombre, presentacion.presentacion, producto.unidadMedida, lotes.fechaCad, lotes.correlativo, kardex.correlativo, lotes.cantidad, lotes.precioUnitario, SUM(lotes.cantidad * lotes.precioUnitario) from producto inner join presentacion on producto.id = presentacion.id inner join lotes on lotes.idProducto = producto.id inner join kardex on kardex.id = producto.id;', [id], (error, rows, fields) => {
        if (!error) {
            res.json(rows[0]);
        } else {
            console.log(error);
        }
    });
});


module.exports = router;