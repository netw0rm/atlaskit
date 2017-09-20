"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_node_1 = require("./schema-node");
class RefSchemaNode extends schema_node_1.default {
    constructor(path) {
        super();
        this.path = path;
    }
    toJSON() {
        return { $ref: this.path };
    }
}
exports.default = RefSchemaNode;
