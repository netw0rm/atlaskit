import * as React from 'react';
import { PureComponent } from 'react';
import AddIcon from '@atlaskit/icon/glyph/editor/add';
import ExpandIcon from '@atlaskit/icon/glyph/editor/expand';
import TableIcon from '@atlaskit/icon/glyph/editor/table';
import MediaIcon from '@atlaskit/icon/glyph/editor/image';
import CodeIcon from '@atlaskit/icon/glyph/editor/code';
import InfoIcon from '@atlaskit/icon/glyph/editor/info';
import QuoteIcon from '@atlaskit/icon/glyph/quote';
import { analyticsService as analytics } from '../../analytics';
import { TableState } from '../../plugins/table';
import { MediaPluginState } from '../../plugins/media';
import { BlockTypeState } from '../../plugins/block-type';
import { BlockType } from '../../plugins/block-type/types';
import { toggleTable, tooltip, findKeymapByDescription } from '../../keymaps';
import { EditorView } from '../../prosemirror';
import DropdownMenu from '../DropdownMenu';
import ToolbarButton from '../ToolbarButton';
import { TriggerWrapper, ExpandIconWrapper } from './styles';
import tableCommands from '../../plugins/table/commands';

export interface Props {
  isDisabled?: boolean;
  editorView: EditorView;
  pluginStateTable?: TableState;
  pluginStateMedia?: MediaPluginState;
  pluginStateBlockType?: BlockTypeState;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
}

export interface State {
  isOpen?: boolean;
  tableActive: boolean;
  tableHidden: boolean;
  mediaDisabled: boolean;
  availableWrapperBlockTypes?: BlockType[];
}

const blockTypeIcons = {
  codeblock: CodeIcon,
  panel: InfoIcon,
  blockquote: QuoteIcon,
};

export default class ToolbarInsertBlock extends PureComponent<Props, State> {
  state: State = {
    isOpen: false,
    tableActive: false,
    tableHidden: false,
    mediaDisabled: false,
  };

  componentDidMount() {
    const { pluginStateTable, pluginStateMedia, pluginStateBlockType } = this.props;
    if (pluginStateTable) {
      pluginStateTable.subscribe(this.handlePluginStateTableChange);
    }
    if (pluginStateMedia) {
      pluginStateMedia.subscribe(this.handlePluginStateMediaChange);
    }
    if (pluginStateBlockType) {
      pluginStateBlockType.subscribe(this.handlePluginStateBlockTypeChange);
      const { availableWrapperBlockTypes } = pluginStateBlockType;
      this.setState({
        availableWrapperBlockTypes,
      });
    }
  }

  componentWillReceiveProps(props: Props) {
    const { pluginStateTable, pluginStateMedia, pluginStateBlockType } = props;
    const {
      pluginStateTable: oldPluginStateTable,
      pluginStateMedia: oldPluginStateMedia,
      pluginStateBlockType: oldPluginStateBlockType,
    } = this.props;
    if (!oldPluginStateTable && pluginStateTable) {
      pluginStateTable.subscribe(this.handlePluginStateTableChange);
    }
    if (!oldPluginStateMedia && pluginStateMedia) {
      pluginStateMedia.subscribe(this.handlePluginStateMediaChange);
    }
    if (!oldPluginStateBlockType && pluginStateBlockType) {
      pluginStateBlockType.subscribe(this.handlePluginStateBlockTypeChange);
      const { availableWrapperBlockTypes } = pluginStateBlockType;
      this.setState({
        availableWrapperBlockTypes,
      });
    }
  }

  componentWillUnmount() {
    const { pluginStateTable, pluginStateMedia, pluginStateBlockType } = this.props;
    if (pluginStateTable) {
      pluginStateTable.unsubscribe(this.handlePluginStateTableChange);
    }
    if (pluginStateMedia) {
      pluginStateMedia.unsubscribe(this.handlePluginStateMediaChange);
    }
    if (pluginStateBlockType) {
      pluginStateBlockType.unsubscribe(this.handlePluginStateBlockTypeChange);
    }
  }

  private onOpenChange = (attrs: any) => {
    this.setState({
      isOpen: attrs.isOpen,
    });
  }

  private handleTriggerClick = () => {
    this.onOpenChange({ isOpen: !this.state.isOpen });
  }

  render() {
    const { isOpen } = this.state;
    const { popupsMountPoint, popupsBoundariesElement } = this.props;
    const items = this.createItems();

    if (items[0].items.length  === 0) {
      return null;
    }

    const toolbarButtonFactory = (disabled: boolean) => (
      <ToolbarButton
        selected={isOpen}
        disabled={disabled}
        onClick={this.handleTriggerClick}
        iconBefore={
          <TriggerWrapper>
            <AddIcon label="Open or close insert block dropdown"/>
            <ExpandIconWrapper>
              <ExpandIcon label="Open or close insert block dropdown" />
            </ExpandIconWrapper>
          </TriggerWrapper>}
      />
    );

    if (!this.props.isDisabled && items[0].items.length > 0) {
      return (
        <DropdownMenu
          items={items}
          onItemActivated={this.onItemActivated}
          onOpenChange={this.onOpenChange}
          mountTo={popupsMountPoint}
          boundariesElement={popupsBoundariesElement}
          isOpen={isOpen}
          fitHeight={188}
          fitWidth={175}
        >
          {toolbarButtonFactory(false)}
        </DropdownMenu>
      );
    } else {
      return (
        <span>
          <div>{toolbarButtonFactory(true)}</div>
        </span>
      );
    }
  }

  private createItems = () => {
    const { pluginStateTable, pluginStateMedia, pluginStateBlockType } = this.props;
    let items: any[] = [];
    if (pluginStateTable) {
      const { tableHidden, tableActive } = this.state;
      if (!tableHidden) {
        items.push({
          content: 'Table',
          value: { name: 'table' },
          isActive: tableActive,
          tooltipDescription: tooltip(toggleTable),
          tooltipPosition: 'right',
          elemBefore: <TableIcon label="Insert table"/>,
        });
      }
    }
    const { mediaDisabled } = this.state;
    if (pluginStateMedia && !mediaDisabled) {
      items.push({
        content: 'Files and images',
        value: { name: 'media' },
        tooltipDescription: 'Files and Images',
        tooltipPosition: 'right',
        elemBefore: <MediaIcon label="Insert files and images"/>,
      });
    }
    const { availableWrapperBlockTypes } = this.state;
    if (pluginStateBlockType && availableWrapperBlockTypes) {
      availableWrapperBlockTypes.forEach(blockType => {
        // tslint:disable-next-line:variable-name
        const BlockTypeIcon = blockTypeIcons[blockType.name];
        items.push({
          content: blockType.title,
          value: blockType,
          tooltipDescription: tooltip(findKeymapByDescription(blockType.title)),
          tooltipPosition: 'right',
          elemBefore: <BlockTypeIcon label={`Insert ${blockType} block`}/>,
        });
      });
    }
    return [{
      items,
    }];
  }

  private handlePluginStateTableChange = (pluginState: TableState) => {
    const { tableActive, tableHidden } = pluginState;
    this.setState({ tableActive, tableHidden });
  }

  private handlePluginStateMediaChange = (pluginState: MediaPluginState) => {
    this.setState({
      mediaDisabled: !pluginState.allowsUploads
    });
  }

  private handlePluginStateBlockTypeChange = (pluginState: BlockTypeState) => {
    this.setState({
      availableWrapperBlockTypes: pluginState.availableWrapperBlockTypes,
    });
  }

  private onItemActivated = ({ item }) => {
    const { editorView, pluginStateMedia } = this.props;
    analytics.trackEvent(`atlassian.editor.format.${item.value.name}.button`);
    switch(item.value.name) {
      case 'table':
        tableCommands.createTable()(editorView.state, editorView.dispatch);
        break;
      case 'media':
        pluginStateMedia!.showMediaPicker();
        break;
      case 'codeblock':
      case 'blockquote':
      case 'panel':
        const blockType = item.value;
        this.props.pluginStateBlockType!.insertBlockType(blockType.name, this.props.editorView);
    }
  }
}
