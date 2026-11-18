const doctorService = require('../services/doctor.service');

async function listDoctors(req, res, next) {
  try {
    const activeOnly = req.query.active === 'true';
    const poliCode = req.query.poliCode;
    const data = await doctorService.listDoctors({ activeOnly, poliCode });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

async function createDoctor(req, res, next) {
  try {
    const data = await doctorService.createDoctor(req.body);
    return res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

async function updateDoctor(req, res, next) {
  try {
    const data = await doctorService.updateDoctor(req.params.id, req.body);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

async function deleteDoctor(req, res, next) {
  try {
    const data = await doctorService.deleteDoctor(req.params.id);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
