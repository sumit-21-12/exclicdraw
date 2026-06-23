"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@repo/backend-common/config");
const ws_1 = require("ws");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const wss = new ws_1.WebSocketServer({ port: 8000 });
wss.on('connection', function connection(ws, req) {
    const url = req.url;
    if (!url) {
        return;
    }
    const queryparams = new URLSearchParams(url.split('?')[1]);
    const token = queryparams.get('token');
    const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
    if (!decoded || !decoded.userid) {
        ws.close();
        return;
    }
    ws.on('message', function mess(data) {
        ws.send("pong");
    });
});
