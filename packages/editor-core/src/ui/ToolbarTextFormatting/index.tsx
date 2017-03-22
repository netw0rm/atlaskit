import BoldIcon from '@atlaskit/icon/glyph/editor/bold';
import ItalicIcon from '@atlaskit/icon/glyph/editor/italic';
import UnderlineIcon from '@atlaskit/icon/glyph/editor/underline';
import { EditorView } from '../../prosemirror';
import * as React from 'react';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import { toggleBold, toggleItalic, toggleUnderline, tooltip } from '../../keymaps';
import { TextFormattingState } from '../../plugins/text-formatting';
import ToolbarButton from '../ToolbarButton';

export interface Props {
    editorView: EditorView;
    pluginState: TextFormattingState;
}

export interface State {
    boldActive?: boolean;
    boldDisabled?: boolean;
    boldHidden?: boolean;
    italicActive?: boolean;
    italicDisabled?: boolean;
    italicHidden?: boolean;
    underlineActive?: boolean;
    underlineDisabled?: boolean;
    underlineHidden?: boolean;
}

export default class ToolbarTextFormatting extends PureComponent<Props, State> {
    state: State = {};

    componentDidMount() {
        this.props.pluginState.subscribe(this.handlePluginStateChange);
    }

    componentWillUmount() {
        this.props.pluginState.unsubscribe(this.handlePluginStateChange);
    }

    render() {
        return (
            <span>
        {this.state.boldHidden ? null :
            <ToolbarButton
                onClick={this.handleBoldClick}
                selected={this.state.boldActive}
                disabled={this.state.boldDisabled}
                title={tooltip(toggleBold)}
                iconBefore={<BoldIcon label="" />}
            />
        }

                {this.state.italicHidden ? null :
                    <ToolbarButton
                        onClick={this.handleItalicClick}
                        selected={this.state.italicActive}
                        disabled={this.state.italicDisabled}
                        title={tooltip(toggleItalic)}
                        iconBefore={<ItalicIcon label="" />}
                    />
                }

                {this.state.underlineHidden ? null :
                    <ToolbarButton
                        onClick={this.handleUnderlineClick}
                        selected={this.state.underlineActive}
                        disabled={this.state.underlineDisabled}
                        title={tooltip(toggleUnderline)}
                        iconBefore={<UnderlineIcon label="" />}
                    />
                }
      </span>
        );
    }

    private handlePluginStateChange = (pluginState: TextFormattingState) => {
        this.setState({
            boldActive: pluginState.strongActive,
            boldDisabled: pluginState.strongDisabled,
            boldHidden: pluginState.strongHidden,
            italicActive: pluginState.emActive,
            italicDisabled: pluginState.emDisabled,
            italicHidden: pluginState.emHidden,
            underlineActive: pluginState.underlineActive,
            underlineDisabled: pluginState.underlineDisabled,
            underlineHidden: pluginState.underlineHidden,
        });
    }

    @analytics('atlassian.editor.format.strong.button')
    private handleBoldClick = () => {
        if (!this.state.boldDisabled) {
            this.props.pluginState.toggleStrong(this.props.editorView);
        }
    }

    @analytics('atlassian.editor.format.em.button')
    private handleItalicClick = () => {
        if (!this.state.italicDisabled) {
            this.props.pluginState.toggleEm(this.props.editorView);
        }
    }

    @analytics('atlassian.editor.format.u.button')
    private handleUnderlineClick = () => {
        if (!this.state.underlineDisabled) {
            this.props.pluginState.toggleUnderline(this.props.editorView);
        }
    }
};
