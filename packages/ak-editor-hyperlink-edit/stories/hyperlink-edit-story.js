import { storiesOf } from '@kadira/storybook';
import ContentComponent from 'ak-editor-content';
import { vdom } from 'skatejs'; // eslint-disable-line no-unused-vars
import React from 'react';
import reactify from 'akutil-react';
import { ProseMirror, DOMFromPos, schema } from 'ak-editor-prosemirror';

import HyperlinkEdit from '../src';
import styles from './styles.less';

const Content = reactify(ContentComponent);

/* eslint-disable react/prop-types */
class PoppedDemo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { unlinked: false };
  }

  componentDidMount() {
    this.hyperlinkEdit = new HyperlinkEdit();
    this.hyperlinkEdit.href = this.props.href;
    this.hyperlinkEdit.attachTo = this.span;
    this.hyperlinkEdit.canUnlink = this.props.canUnlink;
    this.hyperlinkEdit.addEventListener('unlink', () => {
      this.hyperlinkEdit.parentNode.removeChild(this.hyperlinkEdit);
      this.setState({ unlinked: true });
    });
    this.container.appendChild(this.hyperlinkEdit);
  }

  componentWillUnmount() {
    if (this.hyperlinkEdit.parentNode) {
      this.hyperlinkEdit.parentNode.removeChild(this.hyperlinkEdit);
    }
  }

  render() {
    return (
      <div ref={n => (this.container = n)}>
        <style>{styles.toString()}</style>
        <p contentEditable>Lorem ipsum ipsum ipsum ipsum ipsum ipsum <span
          className={this.state.unlinked ? null : styles.locals.hyperlink}
          ref={(span) => { this.span = span; }}
        >epsum</span> lopsom gibson gibson gibson gibson gibson.</p>
      </div>
    );
  }
}
/* eslint-enable react/prop-types */

PoppedDemo.defaultProps = {
  href: 'https://example.com',
  canUnlink: true,
  canOpen: true,
};

storiesOf('ak-editor-hyperlink-edit', module)
  .add('Default', () => {
    class Demo extends React.PureComponent { // eslint-disable-line react/no-multi-comp
      editLink(target) {
        this.hyperlinkEdit = new HyperlinkEdit();
        this.hyperlinkEdit.href = 'https://example.com';
        this.hyperlinkEdit.attachTo = target;
        this.container.appendChild(this.hyperlinkEdit);
      }

      render() {
        return (
          <div ref={n => (this.container = n)}>
            <style>{styles.toString()}</style>
            <p contentEditable>Lorem ipsum <span // eslint-disable-line jsx-a11y/no-static-element-interactions, max-len
              className={styles.locals.hyperlink}
              onClick={e => this.editLink(e.target)}
            >epsum</span> lopsom gibson.</p>
          </div>
        );
      }
    }

    return <Demo />;
  })
  .add('Popped', () => <PoppedDemo />)
  .add('Popped (no open)', () => <PoppedDemo href={null} />)
  .add('Popped (no unlink)', () => <PoppedDemo canUnlink={false} />)
  .add('ProseMirror', () => {
    const getDomElement = (pm, pos) => {
      const { nodeFactory, offset } = DOMFromPos(pm, pos); // eslint-disable-line new-cap
      if (nodeFactory.childNodes.length === 0) {
        return nodeFactory.parentNode;
      }
      return nodeFactory.childNodes[offset];
    };

    class Demo extends React.PureComponent { // eslint-disable-line react/no-multi-comp

      componentDidMount() {
        const doc = schema.node('doc', null,
          schema.node('paragraph', null, [
            schema.text('Lorem ipsum solem golum '),
            schema.text('molum', [
              schema.mark('link', { href: 'http://example.com' }),
            ]),
            schema.text('molum', [
              schema.mark('link', { href: 'http://example.net' }),
            ]),
            schema.text(' gibson tepsum lopsom wundsom.'),
          ])
        );

        const pm = this.pm = new ProseMirror({
          place: this.editorElement,
          doc,
          plugins: [],
        });

        let selectedLink = null;

        pm.updateScheduler([pm.on.selectionChange], () => {
          const { head, anchor } = pm.selection;
          const isCollapsed = head === anchor;
          const pos = anchor - 1;
          const node = pm.doc.nodeAt(pos);
          const element = getDomElement(pm, pos);
          const isLink = schema.marks.link.isInSet(node.marks);
          const nextSelectedLink = (isCollapsed && isLink) ? element : null;

          if (nextSelectedLink !== selectedLink) {
            selectedLink = nextSelectedLink;
            if (this.popup) {
              this.popup.dismiss();
            }

            if (nextSelectedLink) {
              this.popup = this.hyperlinkEditor(element, () => {
                const p = pm.doc.resolve(anchor);
                const from = p.pos - p.nodeBefore.nodeSize;
                const to = p.pos + p.nodeAfter.nodeSize;
                pm.tr.removeMark(from, to, schema.marks.link).apply();
              });
              this.container.appendChild(this.popup.element);
            }
          }
        });
      }

      componentWillUpdate(nextProps, nextState) {
        if (this.state.selectedLink !== nextState.selectedLink) {
          if (this.popup) {
            this.popup.parentNode.removeChild(this.popup);
            delete this.popup;
          }

          if (nextState.selectedLink) {
            this.popup = this.hyperlinkEditor();
            this.popup = new HyperlinkEdit();
            this.popup.href = nextState.selectedLink.getAttribute('href');
            this.popup.textInputPlaceholder = 'Give link a title';
            this.popup.textInputValue = nextState.selectedLink.getAttribute('href');
            this.popup.attachTo = nextState.selectedLink;
            this.popup.addEventListener('unlink', () => {

            });
            this.container.appendChild(this.popup);
          }
        }
      }

      componentWillUnmount() {
        if (this.popup) {
          this.popup.dismiss();
        }
      }

      // eslint-disable-next-line class-methods-use-this
      hyperlinkEditor(elem, onUnlink) {
        const href = elem.getAttribute('href');
        const popup = new HyperlinkEdit();
        popup.href = href;
        popup.textInputPlaceholder = 'Give link a title';
        popup.textInputValue = href;
        popup.attachTo = elem;
        popup.addEventListener('unlink', onUnlink);
        return {
          element: popup,
          dismiss: () => {
            popup.removeEventListener(onUnlink);
            if (popup.parentNode) {
              popup.parentNode.removeChild(popup);
            }
          },
        };
      }

      render() {
        return (
          <div
            ref={(div) => {
              if (div) {
                this.container = div;
                this.editorElement = div.firstChild;
              }
            }}
          >
            <Content />
          </div>
        );
      }
    }

    return <Demo />;
  });
