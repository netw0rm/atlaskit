"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_node_1 = require("./schema-node");
class ConstSchemaNode extends schema_node_1.default {
    constructor(value) {
        super();
        this.value = value;
    }
    toJSON() {
        return { const: this.value };
    }
}
exports.default = ConstSchemaNode;
