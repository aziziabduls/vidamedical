const { Router } = require('express');
const authRoutes = require('./auth.routes');
const promoRoutes = require('./promo.routes');
const articleCategoryRoutes = require('./article-category.routes');
const articleRoutes = require('./article.routes');
const doctorRoutes = require('./doctor.routes');
const serviceRoutes = require('./service-package.routes');
const uploadRoutes = require('./upload.routes');

const router = Router();

router.get('/health', (_req, res) => {
  res.status(200).json({ success: true, status: 'ok' });
});

router.use('/auth', authRoutes);
router.use('/promos', promoRoutes);
router.use('/article-categories', articleCategoryRoutes);
router.use('/articles', articleRoutes);
router.use('/doctors', doctorRoutes);
router.use('/services', serviceRoutes);
router.use('/uploads', uploadRoutes);

module.exports = router;
