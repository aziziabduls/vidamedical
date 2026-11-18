const { BadRequestError } = require('../utils/errors');

function validateBody(schema) {
  return (req, _res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return next(
        new BadRequestError('Validation failed', parsed.error.flatten().fieldErrors)
      );
    }
    req.body = parsed.data;
    return next();
  };
}

module.exports = { validateBody };
