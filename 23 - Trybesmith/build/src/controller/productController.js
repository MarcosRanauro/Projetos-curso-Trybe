"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../"); // Certifique-se de ajustar o caminho correto
const createProduct = async (req, res) => {
    try {
        const { name, price, orderId } = req.body;
        // Verifique se todos os campos necessários estão presentes
        if (!name || !price || !orderId) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }
        // Crie o produto no banco de dados usando o modelo Sequelize
        const product = await __1.Product.create({ name, price, orderId });
        return res.status(201).json(product);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao criar o produto.' });
    }
};
exports.default = createProduct;
