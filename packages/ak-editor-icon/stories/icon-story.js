import { storiesOf } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';
import IconComponent from '../src';

const Icon = reactify(IconComponent);

storiesOf('ak-editor-icon', module)
  .add('All icons', () => (
    <div>
      <Icon glyph="bold" />
      <Icon glyph="italic" />
      <Icon glyph="underline" />
      <Icon glyph="bullet-list" />
      <Icon glyph="number-list" />
      <Icon glyph="image" />
      <Icon glyph="link" />
      <Icon glyph="unlink" />
      <Icon glyph="mention" />
      <Icon glyph="code" />
    </div>
  ))
  .add('Animated', () => {
    class Demo extends React.Component {
      constructor(props) {
        super(props);
        this.toggleAnimation = this.toggleAnimation.bind(this);
      }

      componentDidMount() {
        this.startAnimating();
        this.checkbox.checked = true;
      }

      componentWillUnmount() {
        this.stopAnimating();
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

      // eslint-disable-next-line class-methods-use-this
      randomIcon() {
        const icons = [
          'bold',
          'italic',
          'underline',
          'bullet-list',
          'number-list',
          'image',
          'link',
          'unlink',
          'mention',
          'code',
        ];
        return icons[Math.floor(Math.random() * icons.length)];
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
