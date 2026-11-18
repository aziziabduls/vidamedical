const { Router } = require('express');
const articleController = require('../controllers/article.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const { validateBody } = require('../middlewares/validate.middleware');
const { createArticleSchema, updateArticleSchema } = require('../validators/schemas');

const router = Router();

router.get('/', articleController.listArticles);
router.get('/:slug', articleController.getArticle);
router.post('/', requireAuth, validateBody(createArticleSchema), articleController.createArticle);
router.patch('/:id', requireAuth, validateBody(updateArticleSchema), articleController.updateArticle);
router.delete('/:id', requireAuth, articleController.deleteArticle);

module.exports = router;
