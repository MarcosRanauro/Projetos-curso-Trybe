"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_service_1 = __importDefault(require("../services/order.service"));
const mapStatusHTTP_1 = __importDefault(require("../utils/mapStatusHTTP"));
async function findAll(_req, res) {
    const ServiceResponse = await order_service_1.default.findAll();
    const status = (0, mapStatusHTTP_1.default)(ServiceResponse.status);
    res.status(status).json(ServiceResponse.data);
}
exports.default = {
    findAll,
};
