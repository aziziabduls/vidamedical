const { Router } = require('express');
const articleCategoryController = require('../controllers/article-category.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const { validateBody } = require('../middlewares/validate.middleware');
const { createArticleCategorySchema } = require('../validators/schemas');

const router = Router();

router.get('/', articleCategoryController.listCategories);
router.post(
  '/',
  requireAuth,
  validateBody(createArticleCategorySchema),
  articleCategoryController.createCategory
);
router.delete('/:id', requireAuth, articleCategoryController.deleteCategory);

module.exports = router;
