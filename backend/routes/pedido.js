const express = require('express');
const router = express.Router();
const mysqlconexion = require('../db');


router.get('/', (req, res) => {
    mysqlconexion.query('Select * from pedido',
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
    mysqlconexion.query('select * from pedido where id= ?', [id], (error, rows, fields) => {
        if (!error) {
            res.json(rows[0]);
        } else {
            console.log(error);
        }
    });
});


//DELETE
router.delete('/:id', (req, res) => {

    const { id } = req.params;

    mysqlconexion.query('DELETE FROM pedido where id= ?', [id], (error, rows, fields) => {
        if (!error) {

            res.json({ status: "Borrado" });
        }

        else {
            console.log(error);

        }

    });
});

//INSERTAR

router.post('/', (req, res) => {
    const { idUE, idSolicitante, correlativoUE, fechaSolicitud, telefonoExt, montoTotal, justificacion_Observacion, estado } = req.body;

    mysqlconexion.query("INSERT INTO pedido(idUE, idSolicitante, correlativoUE, fechaSolicitud, telefonoExt, montoTotal, justificacion_Observacion, estado) VALUES (?,?,?,?,?,?,?,?)", [idUE, idSolicitante, correlativoUE, fechaSolicitud, telefonoExt, montoTotal, justificacion_Observacion, estado], (error, rows, fields) => {
        if (!error) {

            res.json({ status: "Se agrego correctamente" });
        }

        else {
            console.log(error);

        }
    });
});

//ACTUALIZAR

router.put('/:id', (req, res) => {

    const { idUE, idSolicitante, correlativoUE, fechaSolicitud, telefonoExt, montoTotal, justificacion_Observacion, estado} = req.body;
    const { id } = req.params;

    mysqlconexion.query("UPDATE pedido SET idUE = ?, idSolicitante = ?, correlativoUE = ?, fechaSolicitud = ?, telefonoExt = ?, montoTotal = ?, justificacion_Observacion = ?, estado = ? WHERE id = ?", [idUE, idSolicitante, correlativoUE, fechaSolicitud, telefonoExt, montoTotal, justificacion_Observacion, estado, id], (error, rows, fields) => {
        if (!error) {
            res.json({ status: "Se actualizo el servicio" });
        } else {
            console.log(error);
        }
    });

});


module.exports = router;