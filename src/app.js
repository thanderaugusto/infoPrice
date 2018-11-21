'use strict' //força javascript ser criterioso

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const firebase = require('firebase-admin');

const app = express();
const router = express.Router();

//Conecta com o banco
mongoose.connect(config.connectionString);

//Carreganento dos Modelos
const Produto = require("./models/produto");
const Customer = require("./models/cliente");
const Order = require('./models/order');

//Carregamento das Rotas
const indexRoute = require('./routes/index-route');
const produtoRoute = require('./routes/produto-route');
const clienteRoute = require('./routes/cliente-route');
const ordersRoute = require('./routes/order-route');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({ extended : false}));


// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


app.use('/', indexRoute);
app.use('/produtos', produtoRoute);
app.use('/clientes', clienteRoute);
app.use('/orders', ordersRoute);


// Initialize Firebase
var configFirebase = {
    apiKey: "AIzaSyA1uvuPKEx9_OY4Jgq7BLoGVDF1lnfDPJo",
    authDomain: "infoprice-e1fd4.firebaseapp.com",
    databaseURL: "https://infoprice-e1fd4.firebaseio.com",
    projectId: "infoprice-e1fd4",
    storageBucket: "infoprice-e1fd4.appspot.com",
    messagingSenderId: "36366613211"
  };
  firebase.initializeApp(configFirebase);



module.exports = app;


