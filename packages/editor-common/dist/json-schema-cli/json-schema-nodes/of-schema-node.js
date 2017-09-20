"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_node_1 = require("./schema-node");
class OfSchemaNode extends schema_node_1.default {
    constructor(ofType, values = []) {
        super();
        this.values = values;
        this.ofType = ofType;
    }
    toJSON() {
        return { [this.ofType]: this.values.map(item => item.toJSON()) };
    }
}
exports.default = OfSchemaNode;
