const mysql = require('mysql2')

const mysqlconn = mysql.createConnection(
{
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'dbreu2',
    port: 3306
}
);

mysqlconn.connect(function(error)
{
    if(error){
        console.log(error);
        return;
    }else{
        console.log('Conected!')
    }
});

module.exports = mysqlconn;