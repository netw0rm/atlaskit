import classNames from 'classnames';
import lessCompiler from 'less/lib/less-browser';
import styles from 'style!./animationSandbox.less';
import animations from '!raw!../src/mixins/animations.less';
import animationMixins from '!raw!../src/mixins/animation-mixins.less';
import commonMixins from '!raw!../src/mixins/common-mixins.less';
import colors from '!raw!../src/colors.less';

const { React } = window;
const { Component } = React;

const lessRender = (lessCode, options) => {
  const opts = options || {};

  return new Promise((resolve, reject) => {
    lessCompiler(window, opts).render(lessCode, (err, output) => {
      if (err) {
        reject(err);
      } else {
        resolve(output);
      }
    });
  });
};

function getAnimationPrerequisites() {
  let output = '';
  output += colors.replace(/@import .*/, '');
  output += commonMixins.replace(/@import .*/, '');
  output += animationMixins.replace(/@import .*/, '');
  output += animations.replace(/@import .*/, '');
  return output;
}

/* This is a simple component used to consume an animation from shared-styles */
class AnimationSandbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationCSS: '',
      animating: false,
      error: '',
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleAnimationClick = this.handleAnimationClick.bind(this);
    this.animationDone = this.animationDone.bind(this);
  }
  componentDidMount() {
    const animationTarget = this.refs.animationTarget;
    const lessInput = this.refs.userLessInput;

    animationTarget.addEventListener('animationend', this.animationDone);
    lessInput.addEventListener('blur', this.handleButtonClick);
    // run the buttonClick handler to put the default content into the generatedCSS field
    this.handleButtonClick();
  }
  componentWillUnmount() {
    const animationTarget = this.refs.animationTarget;
    const lessInput = this.refs.userLessInput;

    animationTarget.removeEventListener('animationend', this.animationDone);
    lessInput.addEventListener('blur', this.handleButtonClick);
  }
  handleButtonClick() {
    const userLessCode = this.refs.userLessInput.value;
    const animationPrerequisites = getAnimationPrerequisites();

    lessRender(animationPrerequisites + userLessCode).then(output => {
      this.setState({
        animationCSS: output.css,
        animating: true,
      });
    }).catch(err => {
      console.log(err);
      this.setState({
        error: err.message,
        animationCSS: '',
      });
    });
  }
  handleAnimationClick() {
    this.setState({ animating: true });
  }
  animationDone() {
    this.setState({ animating: false });
  }

  render() {
    const defaultLESS = `@translate: 'transform', 'translateX(XXpx)', 0, 100;
@width: 'width', 'XXpx', 80, 40;

.createBoldAnimation(@translate @width; 'foo');

.animating {
  animation: foo 1s;
}
#animateMe {
  @boxSize: 80px;
  height: @boxSize;
  width: @boxSize;
  border-radius: 5px;
  background-color: @ak-color-R50;
}`;
    const animatedBoxClasses = classNames(styles.animateMe, {
      animating: this.state.animating,
    });
    return (
      <div className={styles.flexRow}>
        <div className={classNames(styles.animationSandbox, styles.flexCol)}>
          <style>{this.state.animationCSS}</style>
          <div className={styles.flexRow}>
            <div className={styles.codeBox}>
              <div>Input LESS</div>
              <textarea
                id="codeBox"
                cols="60"
                rows="13"
                ref="userLessInput"
                defaultValue={defaultLESS}
              ></textarea>
              <div>Generated CSS</div>
              <textarea
                id="codeBox"
                cols="60"
                rows="13"
                disabled
                ref="cssOutput"
                value={this.state.animationCSS}
              ></textarea>
            </div>
            <div className={styles.sandboxContainer}>
              <div>Sandbox</div>
              <div className={styles.sandbox}>
                <div
                  className={animatedBoxClasses}
                  id="animateMe"
                  ref="animationTarget"
                  onClick={this.handleAnimationClick}
                >
                  #animateMe
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bottomRow}>
            <input type="button" value="Run" onClick={this.handleButtonClick} />
          </div>
          {
            this.state.error ?
              <div className={styles.errorRow}>
                Error: {this.state.error}. See console for more information.
              </div> :
              null
          }

        </div>
        <div>
          <div>Help</div>
          <div className={styles.infoPanel}>
            <p>Creating an animation is as simple as defining your props, choosing your curve and
             calling a mixin.
            </p>
            <p>
              Define your props as a variable in the form `[PropName] [PropString], [StartVal],
              [EndVal]`.
              <code>@translate: 'transform', 'translateX(XXpx)', 0, 100;</code>
              [PropName] is the name of the CSS property to animate.<br />
              [PropString] is a string to create the value of the prop. It needs to contain an `XX`
              in it to make where the values are inserted.<br />
              [StartVal] and [EndVal] are the starting and ending values to place into the XX,
              respectively<br />
            </p>
            <p>
              Next, choose the animation curve to use. Each of the curves in this Storybook will
              have a corresponding mixin in akutil/src/mixins/animations.less
              <code>.createBoldAnimation(@translate; 'foo');</code>
              We pass in each of the animation props from above to the mixin and pass in an
              animation name ('foo' in this example)
            </p>
            <p>
              That's it! You can now bind your animation the same way as you would use any other
              git keyframe animation
              <code>animation: foo 1s;</code>
            </p>
          </div>
        </div>
      </div>
    );
  }
}


export default AnimationSandbox;
