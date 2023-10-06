const express = require('express');
const generateToken = require('../utils/token');
const userVAlidate = require('../middlewares/userValidate');

const login = express.Router();

login.post('/', userVAlidate, (_req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = login;