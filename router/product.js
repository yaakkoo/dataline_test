const express = require('express');
const { insertProduct, getProducts, getProductId, putProductId, deleteProductId } = require('../controller/product');
const { Auth } = require('../middleware/auth');
const router = express.Router();

router.post('/', Auth, insertProduct)
router.get('/', getProducts)
router.get('/:id', getProductId)
router.put('/:id', Auth, putProductId)
router.delete('/:id', Auth, deleteProductId)

module.exports = router