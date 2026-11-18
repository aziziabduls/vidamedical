const articleCategoryService = require('../services/article-category.service');

async function listCategories(_req, res, next) {
  try {
    const data = await articleCategoryService.listCategories();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

async function createCategory(req, res, next) {
  try {
    const data = await articleCategoryService.createCategory(req.body);
    return res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const data = await articleCategoryService.deleteCategory(req.params.id);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listCategories,
  createCategory,
  deleteCategory,
};
