// This is the option when no language specified
export const NO_LANGUAGE = 'Language';

export const SUPPORTED_LANGUAGES = [
  makeLanguage('PHP', ['php3', 'php4', 'php5']),
  makeLanguage('Java'),
  makeLanguage('CSharp', ['c#']),
  makeLanguage('Python'),
  makeLanguage('JavaScript', ['js']),
  makeLanguage('Html'),
  makeLanguage('C++', ['cpp']),
  makeLanguage('Ruby', ['rb', 'duby']),
  makeLanguage('Objective-C', ['objectivec', 'obj-c', 'objc']),
  makeLanguage('C'),
  makeLanguage('Swift'),
  makeLanguage('TeX', ['tex', 'latex']),
  makeLanguage('Shell', ['bash', 'sh', 'ksh', 'zsh']),
  makeLanguage('Scala'),
  makeLanguage('Go'),
  makeLanguage('ActionScript', ['as']),
  makeLanguage('VbNet', ['vb.net']),
  makeLanguage('MATLAB'),
  makeLanguage('Groovy'),
  makeLanguage('SQL', ['postgresql', 'postgres', 'plpgsql', 'psql', 'postgresql-console', 'postgres-console', 'tsql', 't-sql', 'mysql', 'sqlite']),
  makeLanguage('R'),
  makeLanguage('Perl', ['pl']),
  makeLanguage('Lua'),
  makeLanguage('Delphi', ['pas', 'pascal', 'objectpascal']),
  makeLanguage('XML'),
  makeLanguage('TypeScript', ['ts']),
  makeLanguage('CoffeeScript', ['coffee-script', 'coffee']),
  makeLanguage('Clojure', ['clj']),
  makeLanguage('Haskell', ['hs']),
  makeLanguage('Puppet'),
  makeLanguage('Arduino'),
  makeLanguage('Fortran'),
  makeLanguage('Erlang'),
  makeLanguage('PowerShell', ['posh', 'ps1', 'psm1']),
  makeLanguage('Haxe', ['hx', 'hxsl']),
  makeLanguage('Elixir', ['ex', 'exs']),
  makeLanguage('Verilog', ['v']),
  makeLanguage('Rust'),
  makeLanguage('VHDL'),
  makeLanguage('Sass'),
  makeLanguage('OCaml'),
  makeLanguage('Dart'),
  makeLanguage('CSS'),
  makeLanguage('reStructuredText', ['rst', 'rest']),
  makeLanguage('ObjectPascal'),
  makeLanguage('Kotlin'),
  makeLanguage('D'),
  makeLanguage('Octave'),
  makeLanguage('QML', ['qbs']),
  makeLanguage('Prolog'),
  makeLanguage('FoxPro', ['vfp', 'clipper', 'xbase']),
  makeLanguage('Scheme', ['scm']),
  makeLanguage('CUDA', ['cu']),
  makeLanguage('Julia', ['jl']),
  makeLanguage('Racket', ['rkt']),
  makeLanguage('Ada', ['ada95', 'ada2005']),
  makeLanguage('Tcl'),
  makeLanguage('Mathematica', ['mathematica', 'mma', 'nb']),
  makeLanguage('Autoit'),
  makeLanguage('StandardML', ['sml']),
  makeLanguage('Objective-J', ['objectivej', 'obj-j', 'objj']),
  makeLanguage('Smalltalk', ['squeak', 'st']),
  makeLanguage('Vala', ['vapi']),
  makeLanguage('ABAP'),
  makeLanguage('LiveScript', ['live-script']),
  makeLanguage('XQuery', ['xqy', 'xq', 'xql', 'xqm'])];

const languageList = [NO_LANGUAGE, ...(SUPPORTED_LANGUAGES.map((language) => language.name).sort())];

function makeLanguage(name: string, alias?: Array<string>): Language {
  alias = alias || [];

  if (alias.length === 0 || alias.indexOf(name.toLowerCase()) === -1) {
    alias.push(name.toLowerCase());
  }

  return {name, alias};
}

export interface Language {
  name: string;
  alias: Array<string>;
}

export function findMatchedLanguage(languge?: string): string {
  if (!languge) {
    return NO_LANGUAGE;
  }

  const matches = SUPPORTED_LANGUAGES.filter((supportedLanguage) => {
    return supportedLanguage.name.toLowerCase() === languge.toLowerCase() || supportedLanguage.alias.indexOf(languge.toLowerCase()) !== -1;
  });

  if (matches.length > 0) {
    return matches[0].name;
  }

  return NO_LANGUAGE;
}

export default languageList;
