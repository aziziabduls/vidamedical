const { Router } = require('express');
const serviceController = require('../controllers/service-package.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const { validateBody } = require('../middlewares/validate.middleware');
const { createServiceSchema, updateServiceSchema } = require('../validators/schemas');

const router = Router();

router.get('/', serviceController.listServices);
router.post('/', requireAuth, validateBody(createServiceSchema), serviceController.createService);
router.patch('/:id', requireAuth, validateBody(updateServiceSchema), serviceController.updateService);
router.delete('/:id', requireAuth, serviceController.deleteService);

module.exports = router;
