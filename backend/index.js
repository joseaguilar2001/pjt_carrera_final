const express = require('express')
const app = express();

var presentacionRoute = require('./routes/presentacion');
var servicioRoute = require('./routes/servicio');
var solicitanteRoute = require('./routes/solicitante');
var ejecutorRoute = require('./routes/ejecutores');
var kardexRoute = require('./routes/kardex');
var productoRoute = require('./routes/producto');
var pedidoRoute = require('./routes/pedido');
var pedidoDetalleRoute = require('./routes/pedidoDetalle');

app.set('port', process.env.PORT || 3000);
app.use(express.json());

app.use('/presentacion', presentacionRoute);
app.use('/servicio', servicioRoute);
app.use('/solicitante', solicitanteRoute);
app.use('/ejecutores', ejecutorRoute);
app.use('/kardex', kardexRoute);
app.use('/producto', productoRoute);
app.use('/pedido', pedidoRoute);
app.use('/pedidoDetalle', pedidoDetalleRoute);

app.listen(app.get('port'), () => {
    console.log('Port:', app.get('port'));
});
