"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_node_1 = require("./schema-node");
exports.SchemaNode = schema_node_1.default;
var string_schema_node_1 = require("./string-schema-node");
exports.StringSchemaNode = string_schema_node_1.default;
var array_schema_node_1 = require("./array-schema-node");
exports.ArraySchemaNode = array_schema_node_1.default;
var object_schema_node_1 = require("./object-schema-node");
exports.ObjectSchemaNode = object_schema_node_1.default;
var enum_schema_node_1 = require("./enum-schema-node");
exports.EnumSchemaNode = enum_schema_node_1.default;
var const_schema_node_1 = require("./const-schema-node");
exports.ConstSchemaNode = const_schema_node_1.default;
var primitive_schema_node_1 = require("./primitive-schema-node");
exports.PrimitiveSchemaNode = primitive_schema_node_1.default;
var ref_schema_node_1 = require("./ref-schema-node");
exports.RefSchemaNode = ref_schema_node_1.default;
var empty_schema_node_1 = require("./empty-schema-node");
exports.EmptySchemaNode = empty_schema_node_1.default;
var any_of_schema_node_1 = require("./any-of-schema-node");
exports.AnyOfSchemaNode = any_of_schema_node_1.default;
var all_of_schema_node_1 = require("./all-of-schema-node");
exports.AllOfSchemaNode = all_of_schema_node_1.default;
class JSONSchemaNode {
    constructor(version, description, root) {
        this.definitions = new Map();
        this.version = version;
        this.description = description;
        this.root = root;
    }
    addDefinition(name, definition) {
        this.definitions.set(name, definition);
    }
    hasDefinition(name) {
        return this.definitions.has(name);
    }
    toJSON() {
        if (!this.definitions.has(this.root)) {
            throw new Error(`${this.root} not found in the added definitions`);
        }
        const definitions = {};
        for (const [k, v] of this.definitions) {
            definitions[k] = v;
        }
        return {
            $schema: `http://json-schema.org/${this.version}/schema#`,
            description: this.description,
            $ref: `#/definitions/${this.root}`,
            definitions,
        };
    }
}
exports.default = JSONSchemaNode;
