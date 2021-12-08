const { Op } = require("sequelize/dist")
const Category = require("../models/category")
const customField = require("../models/customField")
const Products = require("../models/products")


exports.getCategories = async (req, res) => {
    try {
        let categories = await Category.findAll({ attributes: ['category', 'id'] })
        return res.status(200).json({
            all_categories: categories
        })
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            msg: error.message
        })
    }
}

exports.getCategoryProducts = async (req, res) => {
    try {
        let category = await Category.findByPk(req.params.id)
        if (!category) {
            return res.status(200).json({
                msg: "no such category"
            })
        }
        let products = await Products.findAll({
            where:
            {
                category_id: category.id
            }
        })
        return res.status(200).json({
            products: products
        })
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            msg: error.message
        })
    }
}

exports.deleteCategoryProduct = async (req, res) => {
    try {
        let category = await Category.findByPk(req.params.id)
        if (!category) {
            return res.status(200).json({
                msg: "no such category"
            })
        }
        let product = await Products.findAll({ where: { category_id: category.id } })
        let custid =[]
        product.forEach(element => {
            custid.push(element.id)
        }); 
        await Products.destroy({ where: { category_id: category.id } })
        await customField.destroy({
            where: {
                id: {
                    [Op.in]: custid
                }
            }
        })
        await Category.destroy({ where: { id: req.params.id } })
        return res.status(200).json({
            msg: "all " + category.category + " products are deleted"
        })
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            msg: error.message
        })
    }
}