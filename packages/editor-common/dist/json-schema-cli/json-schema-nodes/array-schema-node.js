"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_node_with_validators_1 = require("./schema-node-with-validators");
class ArraySchemaNode extends schema_node_with_validators_1.default {
    constructor(items = [], validators = {}) {
        super('array', validators);
        this.items = Array.isArray(items) ? items : [items];
    }
    push(items) {
        this.items = this.items.concat(items);
    }
    toJSON() {
        const items = this.items.map(item => item.toJSON());
        const obj = { type: 'array' };
        if (items.length) {
            obj.items = items.length === 1 ? items[0] : items;
        }
        return this.mergeValidationInfo(['minItems', 'maxItems'], obj);
    }
}
exports.default = ArraySchemaNode;
