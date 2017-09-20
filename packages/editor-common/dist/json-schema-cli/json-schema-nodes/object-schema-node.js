"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_node_with_validators_1 = require("./schema-node-with-validators");
class ObjectSchemaNode extends schema_node_with_validators_1.default {
    constructor(properties = {}, validators) {
        super('object', validators);
        this.properties = properties;
    }
    addProperty(name, value, required = true) {
        this.properties[name] = { value, required };
    }
    toJSON() {
        const obj = { type: 'object' };
        return Object.keys(this.properties).reduce((obj, key) => {
            const { value, required } = this.properties[key];
            obj['properties'] = obj['properties'] || {};
            obj['properties'][key] = value.toJSON();
            if (required) {
                obj['required'] = obj['required'] || [];
                obj['required'].push(key);
            }
            return this.mergeValidationInfo(['additionalProperties'], obj);
        }, obj);
    }
}
exports.default = ObjectSchemaNode;
