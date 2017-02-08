import TipIcon from 'ak-icon/glyph/editor/hint';
import InfoIcon from 'ak-icon/glyph/editor/info';
import NoteIcon from 'ak-icon/glyph/editor/note';
import RemoveIcon from 'ak-icon/glyph/editor/remove';
import WarningIcon from 'ak-icon/glyph/editor/warning';
import * as React from 'react';
import { PureComponent } from 'react';
import FloatingToolbar from '../FloatingToolbar';
import ToolbarButton from '../ToolbarButton';

import { availablePanelType, PanelState, PanelType } from '../../plugins/panel';
import { PanelNode } from '../../schema';
import * as styles from './styles';

const icons = {
  info: InfoIcon,
  note: NoteIcon,
  tip: TipIcon,
  warning: WarningIcon,
};

export interface Props {
  pluginState: PanelState;
}

export interface State {
  target?: HTMLElement | undefined;
  activePanel?: PanelNode | undefined;
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
    const { target, activePanel } = this.state;
    const activePanelType =  activePanel && activePanel.attrs['panelType'];
    if (target) {
      return (
        <FloatingToolbar target={target} align="left">
          {availablePanelType.map((panelType, index) => {
            // tslint:disable-next-line:variable-name
            const Icon = icons[panelType.panelType];
            return (
              <ToolbarButton
                key={index}
                wrapperClassName={styles.buttonWrapperStyle}
                selected={activePanelType === panelType.panelType}
                onClick={this.handleSelectPanelType.bind(this, panelType)}
                iconBefore={<Icon label={panelType.panelType} />}
              />
          );})}
          <span className={styles.removeIconWrapperStyle}>
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
    this.setState({
      target: pluginState.element,
      activePanel: pluginState.activePanel,
    });
  }

  private handleSelectPanelType = (panelType: PanelType, event) => {
    this.props.pluginState.changePanelType(panelType);
  }

  private handleRemovePanelType = () => {
    this.props.pluginState.removePanelType();
  }
}
