"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_service_1 = __importDefault(require("../services/login.service"));
const mapStatusHTTP_1 = __importDefault(require("../utils/mapStatusHTTP"));
const login = async (req, res) => {
    const { username, password } = req.body;
    const { status, data } = await login_service_1.default.login(username, password);
    const statusCode = (0, mapStatusHTTP_1.default)(status);
    if (status === 'UNAUTHORIZED') {
        return res.status(statusCode).json(data);
    }
    return res.status(200).json(data);
};
exports.default = {
    login,
};
