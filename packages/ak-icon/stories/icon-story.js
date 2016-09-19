import { storiesOf } from '@kadira/storybook';
import { vdom } from 'skatejs';
import React from 'react';
import reactify from 'akutil-react';
import IconComponent, { glyphs } from '../src';

const Icon = reactify(IconComponent);

storiesOf('ak-icon', module)
  .add('All icons', () => (
    <div>
      {glyphs.map((glyph) => <Icon key={glyph} glyph={glyph} />)}
    </div>
  ))
  .add('Animated', () => {
    class Demo extends React.Component {
      constructor(props) {
        super(props);
        this.toggleAnimation = this.toggleAnimation.bind(this);
      }

      randomIcon() {
        return glyphs[Math.floor(Math.random() * glyphs.length)];
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
