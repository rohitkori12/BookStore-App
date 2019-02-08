"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const bookroutes_1 = __importDefault(require("./routes/bookroutes"));
const database_1 = __importDefault(require("./util/database"));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});
app.use('/bookApi', bookroutes_1.default);
database_1.default.mongoConnect(() => {
    app.listen(8080, function () {
        console.log('server running in port 8080');
    });
});
//# sourceMappingURL=app.js.map