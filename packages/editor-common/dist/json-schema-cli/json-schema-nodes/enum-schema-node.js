"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_node_1 = require("./schema-node");
class EnumSchemaNode extends schema_node_1.default {
    constructor(values) {
        super();
        this.values = new Set(Array.isArray(values) ? values : [values]);
    }
    toJSON() {
        return { enum: Array.from(this.values) };
    }
}
exports.default = EnumSchemaNode;
