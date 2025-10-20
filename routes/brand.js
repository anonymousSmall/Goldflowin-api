const express = require('express')
const { create, list, remove, listby, update, read } = require('../controllers/brand')
const { authCheck, adminCheck } = require('../middlewares/authCheck')
const router = express.Router()

//Controller

// @ENDPOINT http://localhost:5001/api/brand
router.post('/brand', authCheck, adminCheck, create);
router.get('/brand', list)
// router.get('/brand/:id', read)
// router.put('/brand/:id', update)
router.delete('/brand/:id', authCheck, adminCheck, remove)
// router.post('/brandby', listby)

module.exports = router
