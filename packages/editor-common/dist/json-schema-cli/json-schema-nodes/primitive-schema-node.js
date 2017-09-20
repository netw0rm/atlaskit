"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_node_with_validators_1 = require("./schema-node-with-validators");
class PrimitiveSchemaNode extends schema_node_with_validators_1.default {
    constructor(type, validators = {}) {
        super(type, validators);
    }
    toJSON() {
        const keys = Object.keys(this.validators);
        const obj = { type: this.type };
        return keys.length ? this.mergeValidationInfo(keys, obj) : obj;
    }
}
exports.default = PrimitiveSchemaNode;
