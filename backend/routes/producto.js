const express = require('express');
const router = express.Router();
const mysqlconexion = require('../db');

router.get('/producto', (req, res) => {
    mysqlconexion.query('Select * from producto',
        (error, rows, fields) => {
            if (!error) {
                res.json(rows);

            } else {

                console.log(error);
            }
        });
});

//GET

router.get('/producto/:id', (req, res) => {

    const { id } = req.params;
    mysqlconexion.query('select * from producto where id= ?', [id], (error, rows, fields) => {
        if (!error) {
            res.json(rows[0]);
        } else {
            console.log(error);
        }
    });
});


//DELETE
router.delete('/producto/:id', (req, res) => {

    const { id } = req.params;

    mysqlconexion.query('DELETE FROM producto where id= ?', [id], (error, rows, fields) => {
        if (!error) {

            res.json(rows[0]);
        }

        else {
            console.log(error);

        }

    });
});

//INSERTAR

router.post('/producto', (req, res) => {
    const { id, nombre, unidadMedida, estado } = req.body;

    mysqlconexion.query("INSERT INTO producto(id, nombre, unidadMedida, estado) VALUES (?,?,?,?)", [id, nombre, unidadMedida, estado], (error, rows, fields) => {
        if (!error) {

            res.json({ status: "Se agrego correctamente" });
        }

        else {
            console.log(error);

        }
    });
});

//ACTUALIZAR

router.put('/producto/:id', (req, res) => {

    const { nombre, unidadMedida, estado} = req.body;
    const { id } = req.params;

    mysqlconexion.query("UPDATE producto SET nombre = ?, unidadMedida = ?, estado = ? WHERE id = ?", [nombre, unidadMedida, estado, id], (error, rows, fields) => {
        if (!error) {
            res.json({ status: "Se actualizo el servicio" });
        } else {
            console.log(error);
        }
    });

});


module.exports = router;