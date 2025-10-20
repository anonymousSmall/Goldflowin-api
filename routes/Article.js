const express = require('express')
const { create, list, remove } = require('../controllers/Article')
const { authCheck, adminCheck } = require('../middlewares/authCheck')
const router = express.Router()
// Controller


// @ENDPOINT http://localhost:5001/api/article
router.post('/article', create)
router.get('/article', list)
router.delete('/article/:id', authCheck, adminCheck, remove)
// router.post('/images', authCheck, adminCheck, createImages)
// router.post('/removeimages', authCheck, adminCheck, removeImage)


module.exports = router