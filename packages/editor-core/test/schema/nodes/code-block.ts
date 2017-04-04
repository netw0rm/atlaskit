import { expect } from 'chai';
import { CodeBlockNode, CodeBlockNodeType, DocNodeType, Schema, Text } from '../../../src';
import { SUPPORTED_LANGUAGES } from '../../../src/ui/LanguagePicker/languageList';
import { fromHTML, toHTML } from '../../../src/test-helper';

describe('@atlaskit/editor-core/schema code_block node', () => {
  it('throws an error if it is not named "code_block"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          foo: { type: CodeBlockNodeType, content: 'text*' },
          text: { type: Text }
        }
      });
    }).to.throw(Error);
  });

  it('does not throw an error if it is named "code_block"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          code_block: { type: CodeBlockNodeType, content: 'text*' },
          text: { type: Text }
        }
      });
    }).to.not.throw(Error);
  });

  describe('parse from html', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: DocNodeType, content: 'block+' },
        code_block: { type: CodeBlockNodeType, content: 'text*', group: 'block' },
        text: { type: Text, group: 'inline' }
      }
    });

    context('parse from editor encoded HTML', () => {
      context('when language is not set', () => {
        it('converts to block code node', () => {
          const doc = fromHTML('<pre><span>window.alert("hello");<span></pre>', schema);

          expect(doc.firstChild!.type).to.be.an.instanceOf(CodeBlockNodeType);
        });

        it('has language attribute as null', () => {
          const doc = fromHTML('<pre><span>window.alert("hello");<span></pre>', schema);

          expect(doc.firstChild!.attrs['language']).to.eq(null);
        });
      });

      context('when language is set', () => {
        it('converts to block code node', () => {
          const doc = fromHTML('<pre data-language="javascript"><span>window.alert("hello");<span></pre>', schema);

          expect(doc.firstChild!.type).to.be.an.instanceOf(CodeBlockNodeType);
        });
        SUPPORTED_LANGUAGES.forEach((language) => {
          it(`extracts language "${language.name}" from data-language attribute`, () => {
            const doc = fromHTML(`<pre data-language='${language.name}'><span>window.alert("hello");<span></pre>`, schema);

            expect(doc.firstChild!.attrs['language']).to.eq(language.name);
          });
        });
      });

      it('preserves all newlines and whitespace', () => {
        const doc = fromHTML('<pre><span></span>    bar\n       baz\n</pre>', schema);

        expect(doc.firstChild!.textContent).to.eq('    bar\n       baz\n');
      });
    });

    context('parse from Bitbucket', () => {
      context('when language is not set', () => {
        it('converts to block code node', () => {
          const doc = fromHTML('<div class="codehilite"><pre><span>window.alert("hello");<span></pre></div>', schema);

          expect(doc.firstChild!.type).to.be.an.instanceOf(CodeBlockNodeType);
        });

        it('has language attribute as null', () => {
          const doc = fromHTML('<div class="codehilite"><pre><span>window.alert("hello");<span></pre></div>', schema);
          const codeBlock = doc.firstChild! as CodeBlockNode;

          expect(codeBlock.attrs.language).to.eq(null);
        });
      });

      context('when other class similar to language is set', () => {
        it('has language attribute as null', () => {
          const doc = fromHTML('<div class="codehilite nolanguage-javascript"><pre><span>window.alert("hello");<span></pre></div>', schema);
          const codeBlock = doc.firstChild! as CodeBlockNode;

          expect(codeBlock.attrs.language).to.eq(null);
        });
      });
    });

    context('when language is set', () => {
      it('converts to block code node', () => {
        const doc = fromHTML('<div class="codehilite language-javascript"><pre><span>window.alert("hello");<span></pre></div>', schema);

        expect(doc.firstChild!.type).to.be.an.instanceOf(CodeBlockNodeType);
      });

      SUPPORTED_LANGUAGES.forEach((language) => {
        it(`extracts language attribute from class "language-${language.name}"`, () => {
          const doc = fromHTML(`<div class="codehilite language-${language.name}"><pre><span>window.alert("hello");<span></pre></div>`, schema);
          const codeBlock = doc.firstChild! as CodeBlockNode;

          expect(codeBlock.attrs.language).to.eq(language.name);
        });
      });

      it('removes last new line', () => {
        const doc = fromHTML('<div class="codehilite"><pre><span>hello world;<span><span>\n<\span></pre></div>', schema);

        expect(doc.firstChild!.textContent).to.eq('hello world;');
      });

      it('preserves newlines in the middle and whitespace', () => {
        const doc = fromHTML('<div class="codehilite"><pre><span></span>    bar\n       baz</pre></div>', schema);

        expect(doc.firstChild!.textContent).to.eq('    bar\n       baz');
      });
    });
  });

  describe('convert to HTML', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: DocNodeType, content: 'block+' },
        code_block: { type: CodeBlockNodeType, content: 'text*', group: 'block' },
        text: { type: Text, group: 'inline' }
      }
    });

    context('when language is not set', () => {
      it('converts to pre tag', () => {
        const codeBlock = schema.nodes.code_block.create();
        expect(toHTML(codeBlock)).to.have.string('<pre');
      });

      it('does not set data-language attributes', () => {
        const codeBlock = schema.nodes.code_block.create();
        expect(toHTML(codeBlock)).to.not.have.string('data-language');
      });
    });

    context('when language is set to null', () => {
      it('does not set data-language attributes', () => {
        const codeBlock = schema.nodes.code_block.create({ language: null });
        expect(toHTML(codeBlock)).to.not.have.string('data-language');
      });
    });

    context('when language is set to undefined', () => {
      it('does not set data-language attributes', () => {
        const codeBlock = schema.nodes.code_block.create({ language: undefined });
        expect(toHTML(codeBlock)).to.not.have.string('data-language');
      });
    });

    context('when language is set to a value', () => {
      it('converts to pre tag', () => {
        const codeBlock = schema.nodes.code_block.create({ language: 'javascript' });
        expect(toHTML(codeBlock)).to.have.string('<pre');
      });

      it('sets data-language attributes', () => {
        const codeBlock = schema.nodes.code_block.create({ language: 'javascript' });
        expect(toHTML(codeBlock)).to.have.string('data-language="javascript"');
      });
    });
  });
});
