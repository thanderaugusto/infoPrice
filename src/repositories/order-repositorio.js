'use strict'

const mongoose = require('mongoose');
const Order = mongoose.model('Order');


exports.buscar = async(data) => {
    var res = await Order
    .find({}, 'numero status cliente itens')
    .populate('cliente', 'nome')
    .populate('itens.produto', 'titulo');
    return res;
}

exports.criar = async(data) => {
    var order = new Order(data);
    await order.save()
}