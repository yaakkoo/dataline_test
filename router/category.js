const express = require('express');
const { getCategories, getCategoryProducts, deleteCategoryProduct } = require('../controller/category');
const router = express.Router();
const { Auth } = require('../middleware/auth');

router.get('/', getCategories)
router.get('/:id/products', getCategoryProducts)
router.delete('/:id', Auth, deleteCategoryProduct)

module.exports = router