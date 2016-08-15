import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { ProseMirror } from 'prosemirror/dist/edit/main';
import { schema } from '../src/schema';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;
const body = document.querySelector('body');

let pm;

beforeEach(() => {
  pm = new ProseMirror(
    {
      place: body.appendChild(
        document.createElement('div')
      ),
      plugins: [],
      schema,
    }
  );
});

afterEach(() => {
  pm = null;
  body.innerHTML = '';
});

function insertFragmentIntoCursor(
  fragment
) {
  pm.tr.insert(
    pm.selection.$from.pos,
    fragment
  ).apply();
}

function assertTransformedSchema(
  expectedOutput
) {
  expect(
    pm.doc.toString()
  ).to.equal(
    expectedOutput
  );
}

function moveNodeSelection(
  pos
) {
  const cursorPos = pm.selection.$from.pos;

  // place the cursor before the paragraph
  pm.setNodeSelection(
    cursorPos + pos
  );
}

function moveTextSelection(
  pos
) {
  const cursorPos = pm.selection.$from.pos;

  // place the cursor before the paragraph
  pm.setTextSelection(
    cursorPos + pos
  );
}

describe('ak-editor-bitbucket - schema', () => {
  it('should not be possible to create an image inside a code block', () => {
    const nodes = pm.schema.nodes;

    // place the cursor before the paragraph
    moveNodeSelection(-1);

    insertFragmentIntoCursor(
     nodes.code_block.create({},
       nodes.text.create({}, 'text inside a code block')
     )
    );

    assertTransformedSchema(
      'doc(code_block("text inside a code block"), paragraph)'
    );

    // move the cursor inside some part of the text on the pre block
    moveTextSelection(-5);

    insertFragmentIntoCursor(
     nodes.image.create({
       src: 'http://atlassian.com/favicon.png',
     })
    );

    assertTransformedSchema(
      'doc(code_block("text inside a code b"), paragraph(image, "lock"), paragraph)'
    );
  });
});
