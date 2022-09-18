"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.json({ result: "ok" });
});
app.get("/login", (req, res) => {
    res.json(req.query);
});
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
    console.log("Server is running...");
});
