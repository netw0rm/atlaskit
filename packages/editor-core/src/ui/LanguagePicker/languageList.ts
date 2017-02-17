// This is the option when no language specified
export const NO_LANGUAGE = 'Language';

export const SUPPORTED_LANGUAGES = [
  makeLanguage('PHP', ['php', 'php3', 'php4', 'php5']),
  makeLanguage('Java', ['java']),
  makeLanguage('CSharp', ['csharp', 'c#']),
  makeLanguage('Python', ['python']),
  makeLanguage('JavaScript', ['javascript', 'js']),
  makeLanguage('Html', ['html']),
  makeLanguage('C++', ['c++', 'cpp']),
  makeLanguage('Ruby', ['ruby', 'rb', 'duby']),
  makeLanguage('Objective-C', ['objective-c', 'objectivec', 'obj-c', 'objc']),
  makeLanguage('C', ['c']),
  makeLanguage('Swift', ['swift']),
  makeLanguage('TeX', ['tex', 'latex']),
  makeLanguage('Shell', ['shell', 'bash', 'sh', 'ksh', 'zsh']),
  makeLanguage('Scala', ['scala']),
  makeLanguage('Go', ['go']),
  makeLanguage('ActionScript', ['actionscript', 'as']),
  makeLanguage('VbNet', ['vbnet', 'vb.net']),
  makeLanguage('MATLAB', ['matlab']),
  makeLanguage('Groovy', ['groovy']),
  makeLanguage('SQL', ['sql', 'postgresql', 'postgres', 'plpgsql', 'psql', 'postgresql-console', 'postgres-console', 'tsql', 't-sql', 'mysql', 'sqlite']),
  makeLanguage('R', ['r']),
  makeLanguage('Perl', ['perl', 'pl']),
  makeLanguage('Lua', ['lua']),
  makeLanguage('Delphi', ['delphi', 'pas', 'pascal', 'objectpascal']),
  makeLanguage('XML', ['xml']),
  makeLanguage('TypeScript', ['typescript', 'ts']),
  makeLanguage('CoffeeScript', ['coffeescript', 'coffee-script', 'coffee']),
  makeLanguage('Clojure', ['clojure', 'clj']),
  makeLanguage('Haskell', ['haskell', 'hs']),
  makeLanguage('Puppet', ['puppet']),
  makeLanguage('Arduino', ['arduino']),
  makeLanguage('Fortran', ['fortran']),
  makeLanguage('Erlang', ['erlang']),
  makeLanguage('PowerShell', ['powershell', 'posh', 'ps1', 'psm1']),
  makeLanguage('Haxe', ['haxe', 'hx', 'hxsl']),
  makeLanguage('Elixir', ['elixir', 'ex', 'exs']),
  makeLanguage('Verilog', ['verilog', 'v']),
  makeLanguage('Rust', ['rust']),
  makeLanguage('VHDL', ['vhdl']),
  makeLanguage('Sass', ['sass']),
  makeLanguage('OCaml', ['ocaml']),
  makeLanguage('Dart', ['dart']),
  makeLanguage('CSS', ['css']),
  makeLanguage('reStructuredText', ['restructuredtext', 'rst', 'rest']),
  makeLanguage('ObjectPascal', ['objectpascal']),
  makeLanguage('Kotlin', ['kotlin']),
  makeLanguage('D', ['d']),
  makeLanguage('Octave', ['octave']),
  makeLanguage('QML', ['qbs']),
  makeLanguage('Prolog', ['prolog']),
  makeLanguage('FoxPro', ['foxpro', 'vfp', 'clipper', 'xbase']),
  makeLanguage('Scheme', ['scheme', 'scm']),
  makeLanguage('CUDA', ['cuda', 'cu']),
  makeLanguage('Julia', ['julia', 'jl']),
  makeLanguage('Racket', ['racket', 'rkt']),
  makeLanguage('Ada', ['ada', 'ada95', 'ada2005']),
  makeLanguage('Tcl', ['tcl']),
  makeLanguage('Mathematica', ['mathematica', 'mma', 'nb']),
  makeLanguage('Autoit', ['autoit']),
  makeLanguage('StandardML', ['standardmL', 'sml']),
  makeLanguage('Objective-J', ['objective-j', 'objectivej', 'obj-j', 'objj']),
  makeLanguage('Smalltalk', ['smalltalk', 'squeak', 'st']),
  makeLanguage('Vala', ['vala', 'vapi']),
  makeLanguage('ABAP', ['abap']),
  makeLanguage('LiveScript', ['livescript', 'live-script']),
  makeLanguage('XQuery', ['xquery', 'xqy', 'xq', 'xql', 'xqm'])];

const languageList = [NO_LANGUAGE, ...(SUPPORTED_LANGUAGES.map((language) => language.name).sort())];

function makeLanguage(name: string, alias: Array<string>): Language {
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
    return supportedLanguage.alias.indexOf(languge.toLowerCase()) !== -1;
  });

  if (matches.length > 0) {
    return matches[0].name;
  }

  return NO_LANGUAGE;
}

export default languageList;
