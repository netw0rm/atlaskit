"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_node_1 = require("./schema-node");
class EmptySchemaNode extends schema_node_1.default {
    toJSON() {
        return {};
    }
}
exports.default = EmptySchemaNode;
