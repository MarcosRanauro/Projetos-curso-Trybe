"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../database/models/product.model"));
function handleServiceError(error, defaultErrorMessage) {
    if (error instanceof Error) {
        const errorMessage = error.message || defaultErrorMessage;
        return {
            status: 'INVALID_DATA',
            data: { message: errorMessage },
        };
    }
    return {
        status: 'INVALID_DATA',
        data: { message: defaultErrorMessage },
    };
}
async function create(product) {
    try {
        const newProduct = await product_model_1.default.create(product);
        const responseService = {
            status: 'CREATED',
            data: newProduct.toJSON(),
        };
        return responseService;
    }
    catch (error) {
        return handleServiceError(error, 'Erro ao criar o produto.');
    }
}
async function findAll() {
    try {
        const products = await product_model_1.default.findAll();
        const responseService = {
            status: 'SUCCESSFUL',
            data: products,
        };
        return responseService;
    }
    catch (error) {
        return handleServiceError(error, 'Erro ao buscar os produtos.');
    }
}
exports.default = {
    create,
    findAll,
};
