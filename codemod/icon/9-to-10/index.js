const iconRenames = require('./iconRenames');

// Check whether an ImportDeclaration contains a certain type of import (i.e. default or named).
const importDeclarationIncludesSpecifier = (type, path) => Boolean(
  path.value.specifiers.map(specifier => (specifier.type === type ? 1 : 0))
    .reduce((totalImportsOfType, isImportOfType) => totalImportsOfType + isImportOfType)
);

// Check whether an ImportDeclaration includes a default import.
const importIncludesDefault = path => importDeclarationIncludesSpecifier('ImportDefaultSpecifier', path);

// Creates an ImportDeclaration AST node.
const buildImportDeclaration = (localName, sourcePath, builders) => {
  const local = builders.identifier(localName);
  const specifiers = [builders.importDefaultSpecifier(local)];
  const source = builders.literal(sourcePath);
  const declaration = builders.importDeclaration(specifiers, source, 'value');

  return declaration;
};

// Creates an ImportDeclaration for importing the generic Icon component.
const buildDefaultIconGlyphImport = ({
  builders,
  localName,
  path,
  glyphName,
}) => {
  const declaration = buildImportDeclaration(localName, `@atlaskit/icon/glyph/${glyphName}`, builders);
  declaration.comments = path.value.comments;
  return declaration;
};

const isImportingIconWithGlyphPath = path => /@atlaskit\/icon\/glyph\//.test(path.value.source.value) && importIncludesDefault(path);

// This function gets called by jscodeshift.
// It gets passed the file info and a reference to the jscodeshift API.
module.exports = (fileInfo, api) => api.jscodeshift(fileInfo.source)
// Find all the ImportDeclaration statements.
.find(api.jscodeshift.ImportDeclaration)
.map((path) => {
  const builders = api.jscodeshift.types.builders;

  // Skip if it is not already a properly formed @atlaskit/icon import
  if (isImportingIconWithGlyphPath(path)) {
    const oldGlyphName = path.value.source.value.replace('@atlaskit/icon/glyph/', '');
    if (iconRenames[oldGlyphName]) {
      const newGlyphName = iconRenames[oldGlyphName];
      const declaration = buildDefaultIconGlyphImport({
        path,
        builders,
        localName: path.value.specifiers[0].local.name,
        glyphName: newGlyphName,
      });
      path.replace(declaration);
    }
  }

  return path;
})
.toSource({ quote: 'single' });
