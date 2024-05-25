"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("strictQuery", true);
function connectToMongo() {
    mongoose_1.default.connect(process.env.DB_URI)
        .then(() => {
        console.log("Connection to database has been established successfully");
    })
        .catch((err) => {
        console.log("Unable to connect to database");
    });
}
exports.default = connectToMongo;
