"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const primitive_schema_node_1 = require("./primitive-schema-node");
class StringSchemaNode extends primitive_schema_node_1.default {
    constructor(validators = {}) {
        super('string', validators);
    }
}
exports.default = StringSchemaNode;
