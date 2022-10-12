const express = require('express')
const app = express();

var productoRoute = require('./routes/producto');
var solicitanteRoute = require('./routes/solicitante');
var ejecutoresRoute = require('./routes/ejecutores');

app.set('port', process.env.PORT || 3000);
app.use(express.json());

//Una por ruta OJO

app.use('/producto', productoRoute);
app.use('/solicitante',solicitanteRoute);
app.use('/ejecutores',ejecutoresRoute);

app.listen(app.get('port'), () => {
    console.log('Port:', app.get('port'));
});