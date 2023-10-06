"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function requiredVerify(receivedFields) {
    if (!receivedFields.name)
        return '"name" is required';
    if (!receivedFields.price)
        return '"price" is required';
}
function stringVerify(receivedFields) {
    if (typeof receivedFields.name !== 'string')
        return '"name" must be a string';
    if (typeof receivedFields.price !== 'string')
        return '"price" must be a string';
}
function lengthVerify(receivedFields) {
    if (receivedFields.name.length < 3)
        return '"name" length must be at least 3 characters long';
    if (receivedFields.price.length < 3)
        return '"price" length must be at least 3 characters long';
}
async function authProductInputs(req, res, next) {
    const errorRequired = requiredVerify(req.body);
    if (errorRequired)
        return res.status(400).json({ message: errorRequired });
    const errorType = stringVerify(req.body);
    if (errorType)
        return res.status(422).json({ message: errorType });
    const errorLength = lengthVerify(req.body);
    if (errorLength)
        return res.status(422).json({ message: errorLength });
    next();
}
exports.default = authProductInputs;
