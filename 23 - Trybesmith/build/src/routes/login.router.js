"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = __importDefault(require("../controllers/login.controller"));
const user_middleware_1 = __importDefault(require("../middlewares/user.middleware"));
const login_middleware_1 = __importDefault(require("../middlewares/login.middleware"));
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const loginRouter = (0, express_1.Router)();
loginRouter.post('/products', user_middleware_1.default.validateName, user_middleware_1.default.validatePrice, product_controller_1.default.create);
loginRouter.post('/login', login_middleware_1.default.validateName, login_controller_1.default.login);
exports.default = loginRouter;
