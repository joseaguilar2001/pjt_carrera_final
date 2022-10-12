const express = require('express');
const router = express.Router();
const mysqlconexion = require('../db');


router.get('/presentacion', (req, res) => {
    mysqlconexion.query('Select * from presentacion',
        (error, rows, fields) => {
            if (!error) {
                res.json(rows);

            } else {

                console.log(error);
            }
        });
});

//GET

router.get('/presentacion/:id', (req, res) => {

    const { id } = req.params;
    mysqlconexion.query('select * from presentacion where id= ?', [id], (error, rows, fields) => {
        if (!error) {
            res.json(rows[0]);
        } else {
            console.log(error);
        }
    });
});


//DELETE
router.delete('/presentacion/:id', (req, res) => {

    const { id } = req.params;

    mysqlconexion.query('DELETE FROM presentacion where id= ?', [id], (error, rows, fields) => {
        if (!error) {

            res.json(rows[0]);
        }

        else {
            console.log(error);

        }

    });
});

//INSERTAR

router.post('/presentacion', (req, res) => {
    const { id, presentacion, estado } = req.body;

    mysqlconexion.query("INSERT INTO presentacion(id, presentacion, estado) VALUES (?,?,?)", [id, presentacion, estado], (error, rows, fields) => {
        if (!error) {

            res.json({ status: "Se agrego correctamente" });
        }

        else {
            console.log(error);

        }
    });
});

//ACTUALIZAR

router.put('/presentacion/:id', (req, res) => {

    const { presentacion, estado} = req.body;
    const { id } = req.params;

    mysqlconexion.query("UPDATE presentacion SET presentacion = ?, estado = ? WHERE id = ?", [presentacion, estado, id], (error, rows, fields) => {
        if (!error) {
            res.json({ status: "Se actualizo el servicio" });
        } else {
            console.log(error);
        }
    });

});


module.exports = router;