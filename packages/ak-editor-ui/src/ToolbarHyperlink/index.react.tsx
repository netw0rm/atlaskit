import React, { PureComponent } from 'react';
import LinkIcon from 'ak-icon/glyph/editor/link';
import { HyperlinkState } from 'ak-editor-plugin-hyperlink';
import * as styles from './styles.global.less';
import Panel from '../Panel/index.react';
import DismissBlanket from '../DismissBlanket/index.react';
import TextInput from '../PanelTextInput/index.react';
import IconButton from '../ToolbarIconButton/index.react';

interface Props {
  pluginState: HyperlinkState;
}

interface State {
  active?: boolean;
  adding?: boolean;
  disabled?: boolean;
}

export default class ToolbarHyperlink extends PureComponent<Props, State> {
  state: State = {};

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    const { active, adding, disabled } = this.state;

    return (
      <span className={styles.container}>
        <IconButton
          disabled={disabled}
          onClick={this.openLinkPanel}
          selected={active || adding}
          icon={<LinkIcon label='Link' />}
        />
        {!adding ? null :
        <DismissBlanket onDismiss={this.closeLinkPanel}>
          <div className={styles.panel}>
            <Panel>
              <TextInput
                autoFocus
                placeholder="Paste link"
              />
            </Panel>
          </div>
        </DismissBlanket>
        }
      </span>
    );
  }

  private openLinkPanel = () => {
    this.setState({ adding: true });
  }

  private closeLinkPanel = () => {
    this.setState({ adding: false });
  }

  private handlePluginStateChange = (pluginState: HyperlinkState) => {
    this.setState({
      active: pluginState.active,
      disabled: pluginState.disabled
    });
  }
}

// export default define('ak-editor-ui-toolbar-hyperlink', class extends Component {
//   static get props() {
//     return {
//       /**
//        * @description Controls disablily of an popup.
//        * @memberof Popup
//        * @instance
//        * @default false
//        * @type Boolean
//        * @example @html <ak-editor-popup disabled></ak-editor-popup>
//        * @example @js dialog.disabled = true;
//        */
//       disabled: prop.boolean({ attribute: true }),
//       open: prop.boolean({ attribute: true }),
//       active: prop.boolean({ attribute: true }),
//     };
//   }
//   static render(elem) {
//     const active = elem.active || elem.open;

//     const LinkButton = (
//       <Button
//         className="link-button"
//         onClick={elem.toggleHyperlink}
//         active={active}
//         disabled={elem.disabled}
//       >
//         <LinkIcon {...((active) ? { style: { color: 'white' } } : {})} />
//       </Button>
//     );

//     let linkButton;

//     /* eslint-disable no-return-assign  */
//     /* eslint-disable new-cap  */
//     return (
//       <div // eslint-disable-line jsx-a11y/no-static-element-interactions
//         onKeyup={elem.onKeyup}
//       >
//         {linkButton = LinkButton()}

//         <Popup
//           class="popup"
//           target={linkButton}
//           open={elem.open}
//           on-activate={elem.openHyperlink}
//         >
//           <TextInput className="text-input" placeholder="Paste link" />
//         </Popup>
//       </div>
//     );
//   }

//   static rendered(elem) {
//     // `elem.justOpenedHyperlink` is for focusing on the input
//     // if we just opened hyperlink, we want to focus on the input straight away
//     // else, don't auto focus on it
//     if (elem.justOpenedHyperlink) {
//       const textInput = elem.shadowRoot.querySelector('.text-input');
//       // next tick
//       // because dom is rendered async but the API is not,
//       // `textInput` is only availale on dom in the next tick
//       setTimeout(() => textInput.focus());
//       elem.justOpenedHyperlink = false;
//     }
//   }


//   openHyperlink() {
//     this.open = true;
//     this.justOpenedHyperlink = true;
//   }

//   addHyperlink() {
//     if (this.shadowRoot) {
//       const textInput = this.shadowRoot.querySelector('.text-input');
//       this.open = false;
//       emit(this, 'addHyperlink', { detail: { value: textInput.value } });
//       textInput.value = '';
//     }
//   }

//   handleClickOutside(e) {
//     // todo: we will use a common helper function when it's ready.
//     // https://ecosystem.atlassian.net/browse/AK-513
//     if (this.open && e.target !== this && !isDescendantOf(e.target, this) &&
//       !(e.path && e.path.indexOf(this) > -1)) {
//       this.open = false;
//     }
//   }

//   toggleHyperlink() {
//     if (this.disabled) {
//       return;
//     }

//     if (this.open) {
//       this.open = false;
//     } else {
//       this.openHyperlink();
//     }
//   }

//   onKeyup(event) {
//     if (event.keyCode === 13) {
//       this.addHyperlink();
//     } else if (event.keyCode === 27) {
//       this.open = false;
//     }
//   }
// });
