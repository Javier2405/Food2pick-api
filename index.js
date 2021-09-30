const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

var connection = mysql.createConnection({
    host     : 'db-food2pick.c6xlskshvatd.us-east-1.rds.amazonaws.com',
    user     : 'admin',
    password : 'food2pick',
    database : 'db-food2pick'
});

connection.connect();

//Testing
app.get('/test', function (req, res){
    res.status(200).json({"testing": "working"});
});

//All donations
app.get('/donations', function (req, res){
    var query='SELECT * FROM donacion;';
    connection.query(query, function (error, response, fields) {
        if (error) throw error;
        res.status(200).json({result: response});
    });
});

//Donation by user id
app.get('/users/:uid/donation', function (req, res){
    var query='SELECT donacion_id, nombre, cantidad, descripcion, entregado, fecha, transportista_id, receptor_id FROM donacion INNER JOIN donacion_has_Producto ON donacion.id = donacion_has_Producto.donacion_id INNER JOIN Producto ON Producto.id = donacion_has_Producto.Producto_id WHERE donacion.donante_id = '+req.params.uid+';';
    connection.query(query, function (error, response, fields) {
        if (error) throw error;
        res.status(200).json({result: response});
    });
});

//Donation by id
app.get('/donation/:id', function (req, res){
    var query='SELECT * FROM donacion WHERE donacion.id = '+req.params.id+';';
    connection.query(query, function (error, response, fields) {
        if (error) throw error;
        res.status(200).json({result: response});
    });
});

//Add new donation
app.post('/donation/new', function (req, res){
    //NOT WORKING
    var query='INSERT INTO donacion (id, fecha, entregado, transportista_id, receptor_id, donante_id) VALUES ('+req.body.donation.id+','+req.body.donation.fecha+','+req.body.donation.entregado+','+req.body.donation.transportista_id+','+req.body.donation.receptor_id+','+req.body.donation.donante_id+');'+
    'INSERT INTO donacion_has_Producto (donacion_id, Producto_id, cantidad) VALUES ('+req.body.donation.id+','+req.body.donation.producto_id+','+req.body.donation.cantidad+');';
    connection.query(query, function (error, response, fields) {
        if (error) throw error;
        res.status(200).json({msg: "Donation registered!"});
    });
});

//Donations by receiver id
app.get('/receiver/:id', function (req, res){
    var query='SELECT * FROM donacion WHERE donacion.receptor_id = '+req.params.id+';';
    connection.query(query, function (error, response, fields) {
        if (error) throw error;
        res.status(200).json({result: response});
    });
});

//All donators
app.get('/donators', function (req, res){
    var query='SELECT * FROM donante;';
    connection.query(query, function (error, response, fields) {
        if (error) throw error;
        res.status(200).json({result: response});
    });
});

//All receivers
app.get('/receivers', function (req, res){
    var query='SELECT * FROM receptor;';
    connection.query(query, function (error, response, fields) {
        if (error) throw error;
        res.status(200).json({result: response});
    });
});

//All transportists
app.get('/transports', function (req, res){
    var query='SELECT * FROM transportista;';
    connection.query(query, function (error, response, fields) {
        if (error) throw error;
        res.status(200).json({result: response});
    });
});

app.post('')

app.use(cors( {origin: '*' } ));
app.use(bodyParser.json());

module.exports = app;