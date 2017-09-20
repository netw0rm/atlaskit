"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const of_schema_node_1 = require("./of-schema-node");
class AnyOfSchemaNode extends of_schema_node_1.default {
    constructor(values = []) {
        super('anyOf', values);
    }
}
exports.default = AnyOfSchemaNode;
