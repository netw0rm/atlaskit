import React, { PropTypes, Component } from 'react';

import MentionResource from '../src/api/MentionResource';

// FIXME FAB-1732 - extract or replace with third-party implementation
const toJavascriptString = (obj) => {
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      let arrString = '[\n';
      for (let i = 0; i < obj.length; i++) {
        arrString += `  ${toJavascriptString(obj[i])},\n`;
      }
      arrString += ']';
      return arrString;
    }
    let objString = '{\n';
    Object.keys(obj).forEach((key) => {
      objString += `  ${key}: ${toJavascriptString(obj[key])},\n`;
    });
    objString += '}';
    return objString;
  } else if (typeof obj === 'string') {
    return `'${obj}'`;
  }
  return obj && obj.toString();
};

export default class ConfigurableMentionPicker extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    // eslint-disable-next-line react/forbid-prop-types
    config: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      resourceProvider: new MentionResource(props.config),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.refreshMentions(nextProps.config);
  }

  refreshMentions(config) {
    this.setState({
      resourceProvider: new MentionResource(config),
    });
  }

  mentionConfigChange = (event) => {
    // eslint-disable-next-line no-eval
    const config = eval(`( () => (${event.target.value}) )()`);
    this.refreshMentions(config);
  }

  render() {
    const { resourceProvider } = this.state;

    return (
      <div style={{ padding: '10px' }} >
        {React.cloneElement(this.props.children, { resourceProvider })}
        <p>
          <label htmlFor="emoji-urls">MentionResource config</label>
        </p>
        <p>
          <textarea
            id="emoji-urls"
            rows="15"
            style={{ width: '400px' }}
            onChange={this.mentionConfigChange}
            defaultValue={toJavascriptString(this.props.config)}
          />
        </p>
      </div>
    );
  }
}
