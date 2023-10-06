"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateName = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username) {
        return res.status(400).json({ message: '"username" and "password" are required' });
    }
    if (!password) {
        return res.status(400).json({ message: '"username" and "password" are required' });
    }
    return next();
};
exports.default = {
    validateName,
};
