'use strict'

var express = require('express')
var multipart = require('connect-multiparty')
var controlers = require('../Controllers/Yachts')

var router = express.Router()

var multipartMiddleware = multipart({uploadDir: '../uploads'})

router.get('/',controlers.List)
router.post('/save',multipartMiddleware,controlers.save)
router.get('/find/:Id',controlers.Find)
router.post('/update/:Id',controlers.Update)
router.delete('/:Id',controlers.Delete)

module.exports = router;