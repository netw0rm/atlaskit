import LinkIcon from '@atlaskit/icon/glyph/editor/link';
import * as React from 'react';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import { addLink, tooltip } from '../../keymaps';
import { EditorView } from '../../prosemirror';
import { HyperlinkState } from '../../plugins/hyperlink';
import FloatingToolbar from '../FloatingToolbar';
import TextInput from '../PanelTextInput';
import ToolbarButton from '../ToolbarButton';
import * as styles from './styles';

export interface Props {
    editorView: EditorView;
    pluginState: HyperlinkState;
}

export interface State {
    adding?: boolean;
    disabled?: boolean;
    showToolbarPanel?: boolean;
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
        const { adding, disabled, showToolbarPanel } = this.state;

        return (
            <span className={styles.outerContainer}>
        <ToolbarButton
            disabled={disabled}
            onClick={this.toggleLinkPanel}
            selected={adding}
            title={tooltip(addLink)}
            iconBefore={<LinkIcon label="Link" />}
        />
                {!showToolbarPanel ? null :
                    <FloatingToolbar align="center" onOutsideClick={this.toggleLinkPanel}>
                        <div className={styles.textInputContainer}>
                            <TextInput
                                autoFocus
                                placeholder="Paste link"
                                onSubmit={this.handleSubmit}
                                onCancel={this.toggleLinkPanel}
                            />
                        </div>
                    </FloatingToolbar>
                }
      </span>
        );
    }

    private toggleLinkPanel = () => {
        const { pluginState } = this.props;
        pluginState.showLinkPanel(this.props.editorView);
    }

    private handlePluginStateChange = (pluginState: HyperlinkState) => {
        this.setState({
            disabled: !pluginState.linkable || pluginState.active,
            showToolbarPanel: pluginState.showToolbarPanel,
        });
    }

    @analytics('atlassian.editor.format.hyperlink.button')
    private handleSubmit = (value: string) => {
        this.props.pluginState.addLink({ href: value }, this.props.editorView);
        this.toggleLinkPanel();
    }
}
