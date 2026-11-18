const { BadRequestError } = require('../utils/errors');

function buildUploadedImageResult(file) {
  if (!file) {
    throw new BadRequestError('Image file is required');
  }

  return {
    filename: file.filename,
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    url: `/uploads/${file.filename}`,
  };
}

module.exports = {
  buildUploadedImageResult,
};
