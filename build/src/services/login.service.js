"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../database/models/user.model"));
const jwtUtils_1 = __importDefault(require("../utils/jwtUtils"));
const unauthorizedResponse = {
    status: 'UNAUTHORIZED',
    data: { message: 'Username or password invalid' },
};
const login = async (username, password) => {
    const user = await user_model_1.default.findOne({ where: { username } });
    if (!user) {
        return unauthorizedResponse;
    }
    const isValidPassword = await bcryptjs_1.default.compare(password, user.dataValues.password);
    if (!isValidPassword) {
        return unauthorizedResponse;
    }
    const token = jwtUtils_1.default.signToken({ id: user.dataValues.id, username: user.dataValues.username });
    return { status: 'SUCCESS', data: { token } };
};
exports.default = {
    login,
};
