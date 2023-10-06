"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = __importDefault(require("../services/product.service"));
const mapStatusHTTP_1 = __importDefault(require("../utils/mapStatusHTTP"));
async function create(req, res) {
    const newProduct = req.body;
    const ServiceResponse = await product_service_1.default.create(newProduct);
    const status = (0, mapStatusHTTP_1.default)(ServiceResponse.status);
    res.status(status).json(ServiceResponse.data);
}
async function findAll(_req, res) {
    const ServiceResponse = await product_service_1.default.findAll();
    const status = (0, mapStatusHTTP_1.default)(ServiceResponse.status);
    res.status(status).json(ServiceResponse.data);
}
exports.default = { create, findAll };
