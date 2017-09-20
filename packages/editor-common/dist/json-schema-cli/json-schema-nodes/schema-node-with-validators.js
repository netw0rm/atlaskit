"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_node_1 = require("./schema-node");
class SchemaNodeWithVadators extends schema_node_1.default {
    constructor(type, validatiors) {
        super(type);
        this.validators = validatiors;
    }
    mergeValidationInfo(keys, obj) {
        keys.forEach(k => {
            if (this.validators.hasOwnProperty(k)) {
                obj[k] = this.validators[k];
            }
        });
        return obj;
    }
}
exports.default = SchemaNodeWithVadators;
