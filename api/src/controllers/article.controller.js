const articleService = require('../services/article.service');

async function listArticles(req, res, next) {
  try {
    const publishedOnly = req.query.published === 'true';
    const category = req.query.category;
    const data = await articleService.listArticles({ category, publishedOnly });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

async function getArticle(req, res, next) {
  try {
    const data = await articleService.getArticleBySlug(req.params.slug);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

async function createArticle(req, res, next) {
  try {
    const data = await articleService.createArticle(req.body);
    return res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

async function updateArticle(req, res, next) {
  try {
    const data = await articleService.updateArticle(req.params.id, req.body);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

async function deleteArticle(req, res, next) {
  try {
    const data = await articleService.deleteArticle(req.params.id);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
};
