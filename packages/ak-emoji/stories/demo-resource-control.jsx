import React, { PropTypes, Component } from 'react';

import EmojiResource from '../src/api/EmojiResource';
import EmojiService from '../src/api/EmojiService';

export default class ResourcedEmojiControl extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    emojiUrls: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    emojiUrls: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      emojiService: new EmojiService([]),
    };
    this.refreshEmoji(this.props.emojiUrls);
  }

  componentWillReceiveProps(nextProps) {
    this.refreshEmoji(nextProps.emojiUrls);
  }

  refreshEmoji(emojiUrls) {
    const resource = new EmojiResource({
      providers: emojiUrls.map(url => ({ url })),
    });
    resource.loadAllEmoji().then((emojis) => {
      this.setState({
        emojiService: new EmojiService(emojis),
      });
    });
  }

  emojiUrlChange = (event) => {
    const emojiUrls = event.target.value.split('\n');
    this.refreshEmoji(emojiUrls);
  }

  render() {
    const { emojiService } = this.state;

    return (
      <div style={{ padding: '10px' }} >
        {React.cloneElement(this.props.children, { emojiService })}
        <p>
          <label htmlFor="emoji-urls">Emoji provider urls</label>
        </p>
        <p>
          <textarea
            id="emoji-urls"
            rows="5"
            style={{ width: '400px' }}
            onChange={this.emojiUrlChange}
            defaultValue={this.props.emojiUrls.join('\n')}
          />
        </p>
      </div>
    );
  }
}
