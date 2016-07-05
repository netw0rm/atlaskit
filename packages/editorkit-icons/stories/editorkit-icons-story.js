import { storiesOf } from '@kadira/storybook';
import { define, vdom, state } from 'skatejs';
import styles from './styles.css'
import * as icons from '../src/index'

const React = window.React;
const ReactDOM = window.ReactDOM;

class SVG extends React.Component {
  componentDidMount() {
    vdom.IncrementalDOM.patch(this.svg, this.props.patch)
  }

  render() {
    return <svg ref={(svg) => this.svg = svg} title={this.props.title}/>
  }
}

storiesOf('editorkit-icons', module)
  .add('All icons', () => (
    <div className={styles.icons}>
      {Object.keys(icons)
        .filter(name => typeof icons[name] === "function")
        .map(name => <SVG patch={icons[name](vdom.IncrementalDOM)} title={name} key={name}/>)}
    </div>
  ));
