const Product = require('../models/products');
const Category = require('../models/category');
const products = require('../models/products');
const customField = require('../models/customField');
const errHandle = (err) => {
    console.log(err)
}

function available(start, duration) {
    let date = new Date()
    if (date >= start && date <= duration)
        return true
    else return false
}

exports.getProducts = async (req, res) => {
    try {
        let lang = req.body.lang
        let products
        if (lang === 'en')
            products = await Product.findAll({ attributes: { exclude: "arabic_name" } })
        else if (lang === 'ar')
            products = await Product.findAll({ attributes: { exclude: "name" } })
        else
            products = await Product.findAll()
        let prod = []
        for (let i = 0; i < products.length; i++) {
            if (available(products[i].startDate, products[i].duration))
                prod.push(products[i])
        }
        return res.status(200).json({
            number: prod.length,
            products: prod
        })
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            msg: error.message
        })
    }
}

exports.insertProduct = async (req, res) => {
    try {
        let category = await Category.findOne({ where: { category: req.body.category } })
        category = await Category.findOne({ where: { category: req.body.category } }).then(
            async result => {
                if (result !== null) {
                    console.log({
                        r : result
                    });
                    req.body.customField = JSON.stringify(req.body.customField)
                    let custF = await customField.create({
                        title: req.body.title,
                        description: req.body.customField
                    })
                    let desc = JSON.parse(custF.description)
                    let product = await products.create(
                        {
                            name: req.body.name,
                            arabic_name: req.body.arabic_name,
                            price: req.body.price,
                            createDate: req.body.createDate,
                            startDate: req.body.startDate,
                            duration: req.body.duration,
                            customField_id: custF.id,
                            category_id: result.id
                        }
                    )
                    return res.status(200).json({
                        msg: "A new product is created",
                        product: product,
                        title: custF.title,
                        desc: desc
                    })
                } else {
                    return res.status(400).json({
                        msg: "Invalide Category"
                    })
                }
            }
        )
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            msg: error.message
        })
    }
}

exports.getProductId = async (req, res) => {
    try {
        let product = await Product.findByPk(req.params.id)
        if (!product) {
            return res.status(404).json({
                msg: "No such product"
            })
        }
        category = await Category.findByPk(product.category_id, { attributes: ['category'] }).catch(errHandle)
        let customfield = await customField.findByPk(product.customField_id, { attributes: ['title', 'description'] }).catch(errHandle)
        return res.status(200).json({
            product: product,
            category: category,
            customfield: customfield
        })
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            msg: error.message
        })
    }
}

exports.putProductId = async (req, res) => {
    try {
        await Product.update({
            name: req.body.name,
            arabic_name: req.body.arabic_name,
            price: req.body.price,
            startDate: req.body.startDate,
            duration: req.body.duration
        }, {
            where: {
                id: req.params.id
            }
        })
        return res.status(200).json({
            msg: "Product updated"
        })
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            msg: error.message
        })
    }
}

exports.deleteProductId = async (req, res) => {
    try {
        let product = await Product.findByPk(req.params.id)
        if (!product) {
            return res.status(404).json({
                msg: "No such product"
            })
        }
        await Product.destroy({ where: { id: product.id } })
        await customField.destroy({ where: { id: product.customField_id } })
        return res.status(200).json({
            msg: "product deleted"
        })
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            msg: error.message
        })
    }
}