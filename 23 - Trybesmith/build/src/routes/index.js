"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_router_1 = __importDefault(require("./order.router"));
const product_router_1 = __importDefault(require("./product.router"));
const login_router_1 = __importDefault(require("./login.router"));
const routes = (0, express_1.Router)();
routes.use(order_router_1.default);
routes.use(product_router_1.default);
routes.use(login_router_1.default);
exports.default = routes;
