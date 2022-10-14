const express = require('express')
const app = express();

var presentacionRoute = require('./routes/presentacion');
var servicioRoute = require('./routes/servicio');
var solicitanteRoute = require('./routes/solicitante');
var ejecutorRoute = require('./routes/ejecutores');
var kardexRoute = require('./routes/kardex');
var productoRoute = require('./routes/producto');
var loteRoute = require('./routes/lotes');
var dKardexRoute = require('./routes/detalleKardex');

app.set('port', process.env.PORT || 3000);
app.use(express.json());

app.use('/presentacion', presentacionRoute);
app.use('/servicio', servicioRoute);
app.use('/solicitante', solicitanteRoute);
app.use('/ejecutores', ejecutorRoute);
app.use('/kardex', kardexRoute);
app.use('/producto', productoRoute);
app.use('/lotes', loteRoute);
app.use('/detalleKardex', dKardexRoute);

app.listen(app.get('port'), () => {
    console.log('Port:', app.get('port'));
});
