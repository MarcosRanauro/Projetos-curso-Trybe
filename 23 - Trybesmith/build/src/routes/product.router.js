"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const authProduct_1 = __importDefault(require("../middlewares/authProduct"));
const productRouter = (0, express_1.Router)();
productRouter.post('/products', authProduct_1.default, product_controller_1.default.create);
productRouter.get('/products', product_controller_1.default.findAll);
exports.default = productRouter;
