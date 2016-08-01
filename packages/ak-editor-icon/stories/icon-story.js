import { storiesOf } from '@kadira/storybook';
import { vdom } from 'skatejs';
const { React, ReactDOM } = window;
import reactify from 'akutil-react';
import IconComponent from '../src';

const Icon = reactify(IconComponent, { React, ReactDOM });

storiesOf('ak-editor-icon', module)
  .add('All icons', () => (
    <div>
      <Icon glyph="add" />
      <Icon glyph="align-center" />
      <Icon glyph="align-left" />
      <Icon glyph="align-right" />
      <Icon glyph="attachment" />
      <Icon glyph="bold" />
      <Icon glyph="bullet-list" />
      <Icon glyph="code" />
      <Icon glyph="date" />
      <Icon glyph="decision" />
      <Icon glyph="emoji" />
      <Icon glyph="expand" />
      <Icon glyph="help" />
      <Icon glyph="image" />
      <Icon glyph="indent" />
      <Icon glyph="italic" />
      <Icon glyph="link" />
      <Icon glyph="mention" />
      <Icon glyph="more" />
      <Icon glyph="number-list" />
      <Icon glyph="open" />
      <Icon glyph="outdent" />
      <Icon glyph="redo" />
      <Icon glyph="table" />
      <Icon glyph="task" />
      <Icon glyph="text-color" />
      <Icon glyph="underline" />
      <Icon glyph="undo" />
      <Icon glyph="unlink" />
    </div>
  ))
  .add('Animated', () => {
    class Demo extends React.Component {
      constructor(props) {
        super(props);
        this.toggleAnimation = this.toggleAnimation.bind(this);
      }

      randomIcon() {
        const icons = [
          'add', 'align-center', 'align-left', 'align-right',
          'attachment', 'bold', 'bullet-list', 'code', 'date', 'decision',
          'emoji', 'expand', 'help', 'image', 'indent', 'italic', 'link',
          'mention', 'more', 'number-list', 'open', 'outdent', 'redo', 'table',
          'task', 'text-color', 'underline', 'undo', 'unlink',
        ];
        return icons[Math.floor(Math.random() * icons.length)];
      }

      startAnimating() {
        this.timer = setInterval(() => this.forceUpdate(), 300);
      }

      stopAnimating() {
        clearInterval(this.timer);
      }

      toggleAnimation(e) {
        if (e.target.checked) {
          this.startAnimating();
        } else {
          this.stopAnimating();
        }
      }

      componentDidMount() {
        this.startAnimating();
        this.checkbox.checked = true;
      }

      componentWillUnmount() {
        this.stopAnimating();
      }

      render() {
        return (
          <div>
            <Icon glyph={this.randomIcon()} />
            <Icon glyph={this.randomIcon()} />
            <Icon glyph={this.randomIcon()} />
            <Icon glyph={this.randomIcon()} />
            <Icon glyph={this.randomIcon()} />
            <Icon glyph={this.randomIcon()} />
            <Icon glyph={this.randomIcon()} />
            <Icon glyph={this.randomIcon()} />
            <div>
              <input
                type="checkbox"
                onChange={this.toggleAnimation}
                ref={(elem) => { this.checkbox = elem; }}
              /> Animate
            </div>
          </div>
        );
      }
    }

    return <Demo />;
  });

