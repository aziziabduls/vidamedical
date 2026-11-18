const fs = require('fs');
const path = require('path');
const { Router } = require('express');
const multer = require('multer');
const env = require('../config/env');
const uploadController = require('../controllers/upload.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const { BadRequestError } = require('../utils/errors');

fs.mkdirSync(env.uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, env.uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    const safeBase = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, '-')
      .slice(0, 40);
    cb(null, `${Date.now()}-${safeBase || 'image'}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
    if (!allowed.includes(file.mimetype)) {
      return cb(new BadRequestError('Only JPEG, PNG, WebP, or AVIF images are allowed'));
    }
    return cb(null, true);
  },
});

const router = Router();

router.post('/', requireAuth, upload.single('image'), uploadController.uploadImage);

module.exports = router;
