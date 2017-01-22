// This is the option when no language specified
export const NO_LANGUAGE = 'Language';

export const SUPPORTED_LANGUAGES = [
  'PHP',
  'Java',
  'C#',
  'Python',
  'JavaScript',
  'Html',
  'C++',
  'Ruby',
  'Objective-C',
  'C',
  'Swift',
  'LaTex',
  'Shell',
  'Scala',
  'Go',
  'ActionScript',
  'VB.NET',
  'MATLAB',
  'Groovy',
  'SQL',
  'R',
  'Perl',
  'Lua',
  'Delphi',
  'XML',
  'TypeScript',
  'CoffeeScript',
  'Clojure',
  'Haskell',
  'Puppet',
  'Arduino',
  'Fortran',
  'Erlang',
  'TeX',
  'PowerShell',
  'Haxe',
  'Elixir',
  'Verilog',
  'Rust',
  'VHDL',
  'Sass',
  'OCaml',
  'Dart',
  'CSS',
  'reStructuredText',
  'ObjectPascal',
  'Kotlin',
  'D',
  'Octave',
  'QML',
  'Prolog',
  'FoxPro',
  'Scheme',
  'CUDA',
  'Julia',
  'Racket',
  'Ada',
  'Tcl',
  'Mathematica',
  'Autoit',
  'StandardML',
  'Objective-J',
  'Smalltalk',
  'Vala',
  'ABAP',
  'LiveScript',
  'XQuery'];

const languageList = [NO_LANGUAGE, ...(SUPPORTED_LANGUAGES.sort())];

export function findMatchedLanguage(languge: string | null): string {
  if (!languge) {
    return NO_LANGUAGE;
  }

  const matches = SUPPORTED_LANGUAGES.filter((supportedLanguage) => {
    return supportedLanguage.toLowerCase() === languge.toLowerCase();
  });

  if (matches.length > 0) {
    return matches[0];
  }

  return NO_LANGUAGE;
}

export default languageList;
