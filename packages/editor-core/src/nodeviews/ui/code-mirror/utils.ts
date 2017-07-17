const lexRegex = /[a-zA-Z][a-zA-Z0-9_]*/g;

const languages: any[] = [{
    name: 'javascript',
    categories: [{
      words:
        ' NaN Infinity await typeof isNaN decodeURI decodeURIComponent encodeURI encodeURIComponent escape ' +
        'arguments GeneratorFunction window document innerHTML getElementById render React ReactDOM console eval ',
      weightage: 3
    }, {
      words:
        ' undefined let debugger unescape isFinite EvalError InternalError RangeError ReferenceError StopIteration SyntaxError delete ' +
        'AsyncFunction TypeError URIError RegExp Float32Array Float64Array Int16Array Int32Array Int8Array Promise Generator WebAssembly ' +
        'const',
      weightage: 2
    }, {
      words:
        ' true false null do if in for new try var case else enum this void with break catch class super throw while yield Iterator ' +
        'export import public return static switch default extends finally package private continue function interface protected ' +
        'implements parseFloat parseInt Object Function Boolean Error Number Math Date String Array Uint16Array Uint32Array' +
        'Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl require Set Map WeakSet WeakMap module Symbol Proxy Reflect ' +
        'instanceof',
      weightage: 1
    }, {
      words:
        ' final system print println IOException BufferedWriter jdbc throws ',
      weightage: -2,
    }]
  }, {
    name: 'java',
    categories: [{
      words:
        ' synchronized strictfp transient throws finalize notify notifyAll system BigInteger ClassNotFoundException SQLException jdbc ' +
        'println IOException BufferedWriter FileNotFoundException IOException main abstract ',
      weightage: 3
    }, {
      words:
        'int float private char boolean static null if const for true while long finally protected import native final void wait',
      weightage: 2
    }, {
      words:
        ' true false Integer Long Double Float Char Math Arrays enum else break catch instanceof byte super volatile case assert ' +
        'short package default double public try this switch continue throw goto new module requires exports do String class ' +
        'interface extends return implements clone equals getClass hashCode toString ',
      weightage: 1
    }, {
      words:
        ' isNaN getElementById typeof isNaN render React ReactDOM ',
      weightage: -2,
    }]
  }, {
    name: 'ruby',
    regex: /[__]{0,1}[a-zA-Z][a-zA-Z0-9_]*[__]{0,1}/g,
    categories: [{
      words:
        ' elsif BEGIN END puts putc nil printf __ENCODING__ __END__ __FILE__ __LINE__ begin end undef HEREDOC INDENTED_HEREDOC ' +
        'INDENTED_HEREDOC EXPECTED __callee__ block_given __dir__ __method__ at_exit attr_accessor callcc gsub ' +
        'NIL gets readline sprintf ',
      weightage: 3
    }, {
      words:
        ' def lambda retry alias module next self ensure defined Rational TRUE FALSE caller caller_locations abort autoload ' +
        'local_variables fork global_variables chomp chop sleep spawn srand sub syscall warn ',
      weightage: 2
    }, {
      words:
        ' and break case class do print else false for if in not or redo rescue return super then unless until when while yield ' +
        'require include attr_reader attr_writer true nil Array Complex Float Hash Integer String binding catch  eval exec exit ' +
        'exit fail format iterator load loop open p proc raise rand readlines require require_relative select set_trace_func system ' +
        'test throw trace_var trap untrace_var ',
      weightage: 1
    }, {
      words:
        ' None del elif ',
      weightage: -2
    }]
  }, {
    name: 'python',
    categories: [{
      words:
        ' None del elif pass except isinstance startswith endswith len divmod tuple ',
      weightage: 3,
    }, {
      words:
        ' yield global print def not as from with assert exec raise lambda staticmethod isinstance classmethod enumerate execfile ' +
        'unichr callable xrange getattr hasattr frozenset delattr __import__ NotImplemented setattr dict memoryview repr bytearray ',
      weightage: 2,
    }, {
      words:
        ' is in float and while or else if continue finally try return import break class for abs input open all int ord str any eval ' +
        'pow sum basestring issubclass print super bin file iter property bool filter len range type list raw_input format locals reduce ' +
        'unicode chr long reload vars map cmp globals max reversed zip compile round complex hash min set help next hex object slice dir ' +
        'id oct sorted False True Ellipsis Exception',
      weightage: 1,
    }, {
      words:
        ' elsif puts nil begin defined self undef printf extends React react ',
      weightage: -2,
    }]
  }, {
    name: 'html',
    regex: /[<]{0,1}[!a-zA-Z][a-zA-Z0-9_]*/g,
    caseSensitive: false,
    // ensure that all words are written in lower case
    categories: [{
      words:
        ' <!doctype <html <title <body <h1 <h2 <h3 <h4 <h5 <h6 <p <br <hr <abbr <b <blockquote <center <code ' +
        '<del <em <ins <pre <string <sub <sup <form <input <textarea <button <select <option <label <fieldset ' +
        '<frame <iframe <img <canvas <figure <audio <video <a <link <nav <ul <ol <li <table <thead <tbody <tr ' +
        '<td <head <meta <script <style <div <span <header <footer <main <section <article <aside ',
      weightage: 3,
    }, {
      // this will ensure that jsx is not determined as html
      words:
        ' react reactdom render classname key component return class extends export ',
      weightage: -10,
    }]
  }
];

export const detectLanguage = (text): string | undefined => {
  if (!text || text.length === 0) {
    return;
  }
  let maxScore = 0;
  let selectedLang;
  languages.forEach(lang => {
    let match;
    let score = 0;
    let matchScore = 0;
    const { name, contentRegex, categories, regex, caseSensitive } = lang;
    if(categories) {
      while(match = (regex || lexRegex).exec(text)) {
        let m = ` ${match[0]} `;
        // console.log('match is:', m)
        if (!caseSensitive) {
          m = m.toLowerCase();
        }
        categories.forEach(cat => {
          if (cat.words.indexOf(m) >= 0) {
            matchScore += cat.weightage;
          }
        });
      }
      score += matchScore;
    }
    if (contentRegex && contentRegex.test(text)) {
      score += 2;
    }
    // console.log('score:', name, score)
    if (score > maxScore) {
      maxScore = score;
      selectedLang = name;
    }
  });
  return maxScore > 4 ? selectedLang : undefined;
};
