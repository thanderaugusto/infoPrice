'use strict'

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=> {
    res.status(200).send({
        title: "Node Api InfoPrice",
        version: "2.1.0"
    });
});


module.exports = router;