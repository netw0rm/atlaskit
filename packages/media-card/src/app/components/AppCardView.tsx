import * as React from 'react';
import {Details, Action} from '../model';
import {HeaderView} from './HeaderView';
import {DescriptionView} from './DescriptionView';
import {MetaView} from './MetaView';
import {ContextView} from './ContextView';
import {ActionsView} from './ActionsView';
import {Card, Preview, CardContent, Collapsible, Footer} from '../styled/AppCardView';

const maxCardWidth = 744;
const previewWidth = 116;

export interface AppCardViewProps {
  details: Details;
  collapsed?: boolean;
  onCollapseToggled?: () => void;
  onPrimaryAction?: (action: Action) => void;
  onSecondaryAction?: (action: Action) => void;
}

export class AppCardView extends React.Component<AppCardViewProps, {}> {

  static defaultProps = {
    collapsed: true
  };

  get isDarkAppearance() {
    const {details: {background}} = this.props;
    return Boolean(background);
  }

  get contentMaxWidth() {
    const {details: {preview}} = this.props;
    return preview ? maxCardWidth - previewWidth : maxCardWidth;
  }

  renderPreview() {
    const {details: {preview}} = this.props;
    if (!preview) {
      return null;
    }
    return <Preview image={preview}/>;
  }

  renderHeader() {
    const {details: {title, user, background, collapsible}, collapsed, onCollapseToggled} = this.props;
    return (
      <HeaderView
        title={title}
        user={user}
        inverse={Boolean(background)}
        collapsible={collapsible}
        collapsed={collapsed}
        contentMaxWidth={this.contentMaxWidth}
        onToggleCollapse={onCollapseToggled}
      />
    );
  }

  renderDescription() {
    const {details: {description}} = this.props;
    if (!description) {
      return null;
    }
    return <DescriptionView title={description.title} text={description.text} contentMaxWidth={this.contentMaxWidth}/>;
  }

  renderMeta() {
    const {details: {meta}} = this.props;
    if (!meta) {
      return null;
    }
    return <MetaView meta={meta} inverse={this.isDarkAppearance} contentMaxWidth={this.contentMaxWidth}/>;
  }

  renderContext() {
    const {details: {context, background}} = this.props;
    if (!context) {
      return null;
    }
    const {icon, text, href} = context;
    return <ContextView icon={icon} text={text} href={href} inverse={Boolean(background)}/>;
  }

  renderActions() {
    const {details: {actions, background}} = this.props;

    if (!actions) {
      return null;
    }

    return <ActionsView actions={actions} inverse={Boolean(background)}/>;
  }

  renderBody() {
    const {details: {description, meta, context, actions}} = this.props;

    if (!description && !meta && !context && !actions) {
      return null;
    }

    return (
      <div>
        {this.renderDescription()}
        {meta && this.renderMeta()}
        {context || actions ? (
          <Footer>
            {this.renderContext()}
            {this.renderActions()}
          </Footer>
        ) : null}
      </div>
    );
  }

  renderCollapsibleBody() {
    const {details: {collapsible}, collapsed} = this.props;

    if (collapsible) {
      return (
        <Collapsible collapsed={collapsed}>
          {this.renderBody()}
        </Collapsible>
      );
    }

    return this.renderBody();
  }

  render(): JSX.Element {
    const {details: {background, preview}} = this.props;
    return (
      <Card background={background}>
        {this.renderPreview()}
        <CardContent hasPreview={Boolean(preview)}>
          {this.renderHeader()}
          {this.renderCollapsibleBody()}
        </CardContent>
      </Card>
    );
  }

}
