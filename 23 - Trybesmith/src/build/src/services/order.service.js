"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = __importDefault(require("../database/models/order.model"));
const product_model_1 = __importDefault(require("../database/models/product.model"));
async function getProducts(orderId) {
    const products = await product_model_1.default.findAll();
    const productIds = products
        .filter((product) => {
        const orderIdProduct = product.getDataValue('orderId');
        return orderIdProduct === orderId;
    })
        .map((product) => product.getDataValue('id'));
    return productIds;
}
async function findAll() {
    const orders = await order_model_1.default.findAll();
    const ordersWithProducts = await Promise.all(orders.map(async (order) => {
        const { id, userId } = order;
        const productIds = await getProducts(id);
        return {
            id,
            userId,
            productIds,
        };
    }));
    const responseService = {
        status: 'SUCCESSFUL',
        data: ordersWithProducts,
    };
    return responseService;
}
exports.default = { findAll };
