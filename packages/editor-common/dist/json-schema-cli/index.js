"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-bitwise */
const ts = require("typescript");
const json_schema_nodes_1 = require("./json-schema-nodes");
// Assuming that the last param will be a file, can be replaced with something like yargs in future
const file = process.argv[process.argv.length - 1];
const files = [file];
const program = ts.createProgram(files, { jsx: ts.JsxEmit.React });
const checker = program.getTypeChecker();
const typeIdToDefName = new Map();
const jsonSchema = new json_schema_nodes_1.default('draft-04', 'Schema for Atlassian Editor documents.', 'doc_node');
let ticks = 0;
program.getSourceFiles().forEach(walk);
waitForTicks().then(() => {
    /* tslint:disable-next-line:no-console */
    console.log(JSON.stringify(jsonSchema));
});
// Functions
function waitForTicks() {
    return new Promise(resolve => {
        const waitForTick = () => {
            process.nextTick(() => {
                ticks--;
                ticks > 0 ? waitForTick() : resolve();
            });
        };
        waitForTick();
    });
}
function walk(node) {
    if (isSourceFile(node)) {
        node.forEachChild(walk);
    }
    else if (isInterfaceDeclaration(node) || isTypeAliasDeclaration(node)) {
        const symbol = node.symbol;
        const _a = getTags(symbol.getJsDocTags()), { name } = _a, rest = __rest(_a, ["name"]);
        if (name) {
            if (jsonSchema.hasDefinition(name)) {
                throw new Error(`Duplicate definition for ${name}`);
            }
            const type = checker.getTypeAtLocation(node);
            jsonSchema.addDefinition(name, getSchemaNodeFromType(type, rest));
            typeIdToDefName.set(type.id, name);
        }
    }
    else {
        // If in future we need support for other nodes, this will help to debug
        // console.log(syntaxKindToName(node.kind));
        // node.forEachChild(walk);
    }
}
function getSchemaNodeFromType(type, validators = {}) {
    // Found a $ref
    if (typeIdToDefName.has(type.id)) {
        return new json_schema_nodes_1.RefSchemaNode(`#/definitions/${typeIdToDefName.get(type.id)}`);
    }
    else if (isStringType(type)) {
        return new json_schema_nodes_1.StringSchemaNode(validators);
    }
    else if (isBooleanType(type)) {
        return new json_schema_nodes_1.PrimitiveSchemaNode('boolean');
    }
    else if (isNumberType(type)) {
        return new json_schema_nodes_1.PrimitiveSchemaNode('number', validators);
    }
    else if (isUnionType(type)) {
        const isEnum = type.types.every(t => isStringLiteralType(t));
        if (isEnum) {
            return new json_schema_nodes_1.EnumSchemaNode(type.types.map(t => t.text));
        }
        else {
            return new json_schema_nodes_1.AnyOfSchemaNode(type.types.map(t => getSchemaNodeFromType(t)));
        }
    }
    else if (isIntersectionType(type)) {
        return new json_schema_nodes_1.AllOfSchemaNode(type.types.map(t => getSchemaNodeFromType(t, getTags(t.getSymbol().getJsDocTags()))));
    }
    else if (isArrayType(type)) {
        const types = type.typeArguments.length === 1 // Array< X | Y >
            ? [type.typeArguments[0]]
            : type.typeArguments;
        return new json_schema_nodes_1.ArraySchemaNode(types.length === 1 && isAnyType(types[0]) // Array<any>
            ? []
            : types.map(t => getSchemaNodeFromType(t)), validators);
    }
    else if (isObjectType(type)) {
        const obj = new json_schema_nodes_1.ObjectSchemaNode({}, Object.assign({ additionalProperties: false }, validators));
        // Use node's queue to prevent circular dependency
        process.nextTick(() => {
            ticks++;
            const props = checker.getPropertiesOfType(type);
            props.forEach(prop => {
                const name = prop.getName();
                // Drop private properties __fileName, __fileType, etc
                if ((name[0] !== '_' || name[1] !== '_') && prop.valueDeclaration) {
                    const propType = checker.getTypeOfSymbolAtLocation(prop, prop.valueDeclaration);
                    const isRequired = (prop.getFlags() & ts.SymbolFlags.Optional) === 0;
                    const validators = getTags(prop.getJsDocTags());
                    obj.addProperty(name, getSchemaNodeFromType(propType, validators), isRequired);
                }
            });
        });
        return obj;
    }
    else if (isLiteralType(type)) {
        // Using ConstSchemaNode doesn't pass validation
        return new json_schema_nodes_1.EnumSchemaNode(extractLiteralValue(type));
    }
    else if (isNonPrimitiveType(type)) {
        // object
        return new json_schema_nodes_1.EmptySchemaNode();
    }
    throw new Error(`TODO: ${checker.typeToString(type)} to be defined`);
}
function getTags(tagInfo) {
    return tagInfo.reduce((obj, { name, text = '' }) => {
        let val = text;
        if (/^\d+$/.test(text)) {
            // Number
            val = +text;
        }
        else if (text[0] === '"') {
            // " wrapped string
            val = JSON.parse(text);
        }
        else if (text === 'true') {
            val = true;
        }
        else if (text === 'false') {
            val = false;
        }
        obj[name] = val;
        return obj;
    }, {});
}
function extractLiteralValue(typ) {
    if (typ.flags & ts.TypeFlags.EnumLiteral) {
        let str = typ.text;
        let num = parseFloat(str);
        return isNaN(num) ? str : num;
    }
    else if (typ.flags & ts.TypeFlags.StringLiteral) {
        return typ.text;
    }
    else if (typ.flags & ts.TypeFlags.NumberLiteral) {
        return parseFloat(typ.text);
    }
    else if (typ.flags & ts.TypeFlags.BooleanLiteral) {
        return typ.intrinsicName === 'true';
    }
    throw new Error(`Couldn't parse in extractLiteralValue`);
}
// Helpers
function isSourceFile(node) {
    return node.kind === ts.SyntaxKind.SourceFile;
}
function isInterfaceDeclaration(node) {
    return node.kind === ts.SyntaxKind.InterfaceDeclaration;
}
function isTypeAliasDeclaration(node) {
    return node.kind === ts.SyntaxKind.TypeAliasDeclaration;
}
function isStringType(type) {
    return (type.flags & ts.TypeFlags.String) > 0;
}
function isBooleanType(type) {
    return (type.flags & ts.TypeFlags.Boolean) > 0;
}
function isNumberType(type) {
    return (type.flags & ts.TypeFlags.Number) > 0;
}
function isUnionType(type) {
    return (type.flags & ts.TypeFlags.Union) > 0;
}
function isIntersectionType(type) {
    return (type.flags & ts.TypeFlags.Intersection) > 0;
}
function isArrayType(type) {
    return ((type.flags & ts.TypeFlags.Object) > 0 &&
        (type.objectFlags & ts.ObjectFlags.Reference) > 0 &&
        type.getSymbol().getName() === 'Array');
}
function isObjectType(type) {
    return (type.flags & ts.TypeFlags.Object) > 0;
}
function isStringLiteralType(type) {
    return (type.flags & ts.TypeFlags.StringLiteral) > 0;
}
function isLiteralType(type) {
    return (type.flags & ts.TypeFlags.Literal) > 0;
}
function isNonPrimitiveType(type) {
    return (type.flags & ts.TypeFlags.NonPrimitive) > 0;
}
function isAnyType(type) {
    return (type.flags & ts.TypeFlags.Any) > 0;
}
/*
function syntaxKindToName(kind: ts.SyntaxKind) {
  return ts.SyntaxKind[kind];
}
*/
