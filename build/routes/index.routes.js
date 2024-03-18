"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("./user.routes"));
const event_routes_1 = __importDefault(require("./event.routes"));
const doc_routes_1 = __importDefault(require("./doc.routes"));
const basePath = "/api/v1";
exports.default = (app) => {
    app.use(`${basePath}/users`, user_routes_1.default);
    app.use(`${basePath}/events`, event_routes_1.default);
    app.use(`${basePath}/docs`, doc_routes_1.default);
};
