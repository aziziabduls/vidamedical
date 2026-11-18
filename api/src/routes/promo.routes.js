const { Router } = require('express');
const promoController = require('../controllers/promo.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const { validateBody } = require('../middlewares/validate.middleware');
const { createPromoSchema, updatePromoSchema } = require('../validators/schemas');

const router = Router();

router.get('/', promoController.listPromos);
router.post('/', requireAuth, validateBody(createPromoSchema), promoController.createPromo);
router.patch('/:id', requireAuth, validateBody(updatePromoSchema), promoController.updatePromo);
router.delete('/:id', requireAuth, promoController.deletePromo);

module.exports = router;
