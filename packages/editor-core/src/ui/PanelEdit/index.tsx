import TipIcon from 'ak-icon/glyph/editor/hint';
import InfoIcon from 'ak-icon/glyph/editor/info';
import NoteIcon from 'ak-icon/glyph/editor/note';
import RemoveIcon from 'ak-icon/glyph/editor/remove';
import WarningIcon from 'ak-icon/glyph/editor/warning';
import * as React from 'react';
import { PureComponent } from 'react';
import FloatingToolbar from '../FloatingToolbar';
import ToolbarButton from '../ToolbarButton';
import { EditorView } from '../../prosemirror';

import { availablePanelType, PanelState, PanelType } from '../../plugins/panel';
import * as styles from './styles';

const icons = {
  info: InfoIcon,
  note: NoteIcon,
  tip: TipIcon,
  warning: WarningIcon,
};

export interface Props {
  editorView: EditorView;
  pluginState: PanelState;
}

export interface State {
  showToolbar?: boolean;
  target?: HTMLElement | undefined;
  activePanelType?: string | undefined;
}

export default class PanelEdit extends PureComponent<Props, State> {
  state: State = { };

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    const { target, activePanelType, showToolbar } = this.state;
    if (showToolbar) {
      return (
        <FloatingToolbar target={target} align="left">
          {availablePanelType.map((panelType, index) => {
            // tslint:disable-next-line:variable-name
            const Icon = icons[panelType.panelType];
            return (
              <ToolbarButton
                key={index}
                wrapperClassName={
                  activePanelType === panelType.panelType ?
                  styles.selectedButtonWrapperStyle :
                  styles.buttonWrapperStyle
                }
                selected={activePanelType === panelType.panelType}
                onClick={this.handleSelectPanelType.bind(this, panelType)}
                iconBefore={<Icon label={panelType.panelType} />}
              />
          );})}
          <span className={styles.removeButtonWrapperStyle}>
            <ToolbarButton
              wrapperClassName={styles.buttonWrapperStyle}
              onClick={this.handleRemovePanelType}
              iconBefore={<RemoveIcon label="remove" />}
            />
          </span>
        </FloatingToolbar>
      );
    } else {
      return null;
    }
  }

  private handlePluginStateChange = (pluginState: PanelState) => {
    const { target } = this.state;
    const { element, clicked, activePanelType } = pluginState;
    const showToolbar = !!element && (clicked || target !== element);
    this.setState({
      showToolbar,
      target: element,
      activePanelType,
    });
  }

  private handleSelectPanelType = (panelType: PanelType, event) => {
    this.props.pluginState.changePanelType(panelType, editorView);
  }

  private handleRemovePanelType = () => {
    const { editorView } = this.props;
    this.props.pluginState.removePanelType(editorView);
  }
}
