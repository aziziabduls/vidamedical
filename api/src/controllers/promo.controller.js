const promoService = require('../services/promo.service');

async function listPromos(req, res, next) {
  try {
    const activeOnly = req.query.active === 'true';
    const data = await promoService.listPromos({ activeOnly });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

async function createPromo(req, res, next) {
  try {
    const data = await promoService.createPromo(req.body);
    return res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

async function updatePromo(req, res, next) {
  try {
    const data = await promoService.updatePromo(req.params.id, req.body);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

async function deletePromo(req, res, next) {
  try {
    const data = await promoService.deletePromo(req.params.id);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listPromos,
  createPromo,
  updatePromo,
  deletePromo,
};
