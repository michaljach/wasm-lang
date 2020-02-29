"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
exports.getFileName = (url) => {
    return path.basename(url);
};
