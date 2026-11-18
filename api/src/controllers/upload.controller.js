const uploadService = require('../services/upload.service');

function uploadImage(req, res, next) {
  try {
    const data = uploadService.buildUploadedImageResult(req.file);
    return res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  uploadImage,
};
