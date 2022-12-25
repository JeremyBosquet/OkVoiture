"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configValidationSchema = void 0;
const Joi = require("joi");
exports.configValidationSchema = Joi.object({
    DB_HOST: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASS: Joi.string().required(),
});
//# sourceMappingURL=config.schema.js.map