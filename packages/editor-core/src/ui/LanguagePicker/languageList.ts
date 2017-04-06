// This is the option when no language specified
export const NO_LANGUAGE = 'Language';

export const SUPPORTED_LANGUAGES = [
  { name: 'PHP', alias: ['php', 'php3', 'php4', 'php5'] },
  { name: 'Java', alias: ['java'] },
  { name: 'CSharp', alias: ['csharp', 'c#'] },
  { name: 'Python', alias: ['python'] },
  { name: 'JavaScript', alias: ['javascript', 'js'] },
  { name: 'Html', alias: ['html'] },
  { name: 'C++', alias: ['c++', 'cpp'] },
  { name: 'Ruby', alias: ['ruby', 'rb', 'duby'] },
  { name: 'Objective-C', alias: ['objective-c', 'objectivec', 'obj-c', 'objc'] },
  { name: 'C', alias: ['c'] },
  { name: 'Swift', alias: ['swift'] },
  { name: 'TeX', alias: ['tex', 'latex'] },
  { name: 'Shell', alias: ['shell', 'bash', 'sh', 'ksh', 'zsh'] },
  { name: 'Scala', alias: ['scala'] },
  { name: 'Go', alias: ['go'] },
  { name: 'ActionScript', alias: ['actionscript', 'actionscript3', 'as'] },
  { name: 'AppleScript', alias: ['applescript', 'ap'] },
  { name: 'ColdFusion', alias: ['coldfusion'] },
  { name: 'Diff', alias: ['diff'] },
  { name: 'Java FX', alias: ['java fx', 'jfx'] },
  { name: 'Visual Basic', alias: ['visual basic', 'vb'] },
  { name: 'Plain Text', alias: ['plain text', 'text'] },
  { name: 'VbNet', alias: ['vbnet', 'vb.net'] },
  { name: 'MATLAB', alias: ['matlab'] },
  { name: 'Groovy', alias: ['groovy'] },
  { name: 'SQL', alias: ['sql', 'postgresql', 'postgres', 'plpgsql', 'psql', 'postgresql-console', 'postgres-console', 'tsql', 't-sql', 'mysql', 'sqlite'] },
  { name: 'R', alias: ['r'] },
  { name: 'Perl', alias: ['perl', 'pl'] },
  { name: 'Lua', alias: ['lua'] },
  { name: 'Delphi', alias: ['delphi', 'pas', 'pascal', 'objectpascal'] },
  { name: 'XML', alias: ['xml'] },
  { name: 'TypeScript', alias: ['typescript', 'ts'] },
  { name: 'CoffeeScript', alias: ['coffeescript', 'coffee-script', 'coffee'] },
  { name: 'Clojure', alias: ['clojure', 'clj'] },
  { name: 'Haskell', alias: ['haskell', 'hs'] },
  { name: 'Puppet', alias: ['puppet'] },
  { name: 'Arduino', alias: ['arduino'] },
  { name: 'Fortran', alias: ['fortran'] },
  { name: 'Erlang', alias: ['erlang', 'erl'] },
  { name: 'PowerShell', alias: ['powershell', 'posh', 'ps1', 'psm1'] },
  { name: 'Haxe', alias: ['haxe', 'hx', 'hxsl'] },
  { name: 'Elixir', alias: ['elixir', 'ex', 'exs'] },
  { name: 'Verilog', alias: ['verilog', 'v'] },
  { name: 'Rust', alias: ['rust'] },
  { name: 'VHDL', alias: ['vhdl'] },
  { name: 'Sass', alias: ['sass'] },
  { name: 'OCaml', alias: ['ocaml'] },
  { name: 'Dart', alias: ['dart'] },
  { name: 'CSS', alias: ['css'] },
  { name: 'reStructuredText', alias: ['restructuredtext', 'rst', 'rest'] },
  { name: 'ObjectPascal', alias: ['objectpascal'] },
  { name: 'Kotlin', alias: ['kotlin'] },
  { name: 'D', alias: ['d'] },
  { name: 'Octave', alias: ['octave'] },
  { name: 'QML', alias: ['qbs'] },
  { name: 'Prolog', alias: ['prolog'] },
  { name: 'FoxPro', alias: ['foxpro', 'vfp', 'clipper', 'xbase'] },
  { name: 'Scheme', alias: ['scheme', 'scm'] },
  { name: 'CUDA', alias: ['cuda', 'cu'] },
  { name: 'Julia', alias: ['julia', 'jl'] },
  { name: 'Racket', alias: ['racket', 'rkt'] },
  { name: 'Ada', alias: ['ada', 'ada95', 'ada2005'] },
  { name: 'Tcl', alias: ['tcl'] },
  { name: 'Mathematica', alias: ['mathematica', 'mma', 'nb'] },
  { name: 'Autoit', alias: ['autoit'] },
  { name: 'StandardML', alias: ['standardmL', 'sml'] },
  { name: 'Objective-J', alias: ['objective-j', 'objectivej', 'obj-j', 'objj'] },
  { name: 'Smalltalk', alias: ['smalltalk', 'squeak', 'st'] },
  { name: 'Vala', alias: ['vala', 'vapi'] },
  { name: 'ABAP', alias: ['abap'] },
  { name: 'LiveScript', alias: ['livescript', 'live-script'] },
  { name: 'XQuery', alias: ['xquery', 'xqy', 'xq', 'xql', 'xqm'] }];

const languageList = [NO_LANGUAGE, ...(SUPPORTED_LANGUAGES.map((language) => language.name).sort())];

export interface Language {
  name: string;
  alias: string[];
}

export function findMatchedLanguage(language?: string): string {
  if (!language) {
    return NO_LANGUAGE;
  }

  const matches = SUPPORTED_LANGUAGES.filter((supportedLanguage) => {
    return supportedLanguage.alias.indexOf(language.toLowerCase()) !== -1;
  });

  if (matches.length > 0) {
    return matches[0].name;
  }

  return NO_LANGUAGE;
}

export default languageList;
