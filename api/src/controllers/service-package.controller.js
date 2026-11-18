const servicePackageService = require('../services/service-package.service');

async function listServices(req, res, next) {
  try {
    const activeOnly = req.query.active === 'true';
    const category = req.query.category;
    const data = await servicePackageService.listServicePackages({ category, activeOnly });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

async function createService(req, res, next) {
  try {
    const data = await servicePackageService.createServicePackage(req.body);
    return res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

async function updateService(req, res, next) {
  try {
    const data = await servicePackageService.updateServicePackage(req.params.id, req.body);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

async function deleteService(req, res, next) {
  try {
    const data = await servicePackageService.deleteServicePackage(req.params.id);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listServices,
  createService,
  updateService,
  deleteService,
};
