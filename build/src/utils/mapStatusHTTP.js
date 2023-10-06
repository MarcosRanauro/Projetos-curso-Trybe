"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapStatusHTTP(status) {
    const statusHTTPMap = {
        SUCCESSFUL: 200,
        CREATED: 201,
        INVALID_DATA: 400,
        UNAUTHORIZED: 401,
        UNPROCESSABLE_CONTENT: 422,
    };
    return statusHTTPMap[status] || 500;
}
exports.default = mapStatusHTTP;
