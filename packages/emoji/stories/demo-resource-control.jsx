import React, { PropTypes, Component } from 'react';

import EmojiResource from '../src/api/EmojiResource';
import EmojiService from '../src/api/EmojiService';

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
  return obj.toString();
};

export default class ResourcedEmojiControl extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    // eslint-disable-next-line react/forbid-prop-types
    emojiConfig: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      emojiService: new EmojiService([]),
    };
    this.refreshEmoji(this.props.emojiConfig);
  }

  componentWillReceiveProps(nextProps) {
    this.refreshEmoji(nextProps.emojiConfig);
  }

  refreshEmoji(emojiConfig) {
    const resource = new EmojiResource(emojiConfig);
    resource.loadAllEmoji().then((emojis) => {
      this.setState({
        emojiService: new EmojiService(emojis),
      });
    });
  }

  emojiConfigChange = (event) => {
    // eslint-disable-next-line no-eval
    const config = eval(`( () => (${event.target.value}) )()`);
    this.refreshEmoji(config);
  }

  render() {
    const { emojiService } = this.state;

    return (
      <div style={{ padding: '10px' }} >
        {React.cloneElement(this.props.children, { emojiService })}
        <p>
          <label htmlFor="emoji-urls">EmojiResource config</label>
        </p>
        <p>
          <textarea
            id="emoji-urls"
            rows="15"
            style={{ width: '400px' }}
            onChange={this.emojiConfigChange}
            defaultValue={toJavascriptString(this.props.emojiConfig)}
          />
        </p>
      </div>
    );
  }
}
