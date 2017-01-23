//
// WARNING: DO NOT COMMIT CHANGES TO THIS FILE UNLESS YOU'RE ABSOLUTELY SURE.
//
// This file is used both in development and production, but is overridden during publish.
// It's checked into git and is used in development to point to `src/`, so that when lerna
// linking is in use, you don't need to recompile the package to expose correct types for
// packages that link to it.
//
// However for the published package, we want TypeScript consumers to use declaration files
// generated from the source .ts files, rather than the .ts files themselves. To do this we
// run the TypeScript compiler over `src/` and output declarations to this directory, which
// will overwrite this file.
//
export * from '../../src';
