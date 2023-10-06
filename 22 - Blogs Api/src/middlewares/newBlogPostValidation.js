const { newBlogPostSchema } = require('../schemas');

const newBlogPostValidation = (req, res, next) => {
  const { error } = newBlogPostSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = newBlogPostValidation;