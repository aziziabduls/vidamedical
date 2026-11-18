const { Router } = require('express');
const doctorController = require('../controllers/doctor.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const { validateBody } = require('../middlewares/validate.middleware');
const { createDoctorSchema, updateDoctorSchema } = require('../validators/schemas');

const router = Router();

router.get('/', doctorController.listDoctors);
router.post('/', requireAuth, validateBody(createDoctorSchema), doctorController.createDoctor);
router.patch('/:id', requireAuth, validateBody(updateDoctorSchema), doctorController.updateDoctor);
router.delete('/:id', requireAuth, doctorController.deleteDoctor);

module.exports = router;
