import * as React from 'react';
import {AppCardModel, AppCardAction} from '../model';
import {HeaderView} from './HeaderView';
import {DescriptionView} from './DescriptionView';
import {MetaView} from './MetaView';
import {ContextView} from './ContextView';
import {ActionsView} from './ActionsView';
import {Link, Card, Preview, CardContent, Collapsible, Footer} from '../styled/AppCardView';

const maxCardWidth = 744;
const previewWidth = 116;

export interface AppCardViewProps {
  model: AppCardModel;
  collapsed?: boolean;
  onClick?: () => void;
  onContextClick?: () => void;
  onActionClick?: (action: AppCardAction) => void;
  onCollapseClick?: () => void;
}

export class AppCardView extends React.Component<AppCardViewProps, {}> {

  static defaultProps = {
    collapsed: true
  };

  get isDarkAppearance() {
    const {model: {background}} = this.props;
    return Boolean(background);
  }

  get contentMaxWidth() {
    const {model: {preview}} = this.props;
    return preview ? maxCardWidth - previewWidth : maxCardWidth;
  }

  renderPreview() {
    const {model: {preview}} = this.props;
    if (!preview) {
      return null;
    }
    return <Preview image={preview.url}/>;
  }

  renderHeader() {
    const {model: {title: {text, user}, background, collapsible}, collapsed, onCollapseClick} = this.props;
    return (
      <HeaderView
        title={text}
        user={user}
        inverse={Boolean(background)}
        collapsible={collapsible}
        collapsed={collapsed}
        contentMaxWidth={this.contentMaxWidth}
        onCollapseClick={onCollapseClick}
      />
    );
  }

  renderDescription() {
    const {model: {description}} = this.props;
    if (!description) {
      return null;
    }
    return <DescriptionView title={description.title} text={description.text} contentMaxWidth={this.contentMaxWidth}/>;
  }

  renderMeta() {
    const {model: {details}} = this.props;
    if (!details) {
      return null;
    }
    return <MetaView meta={details} inverse={this.isDarkAppearance} contentMaxWidth={this.contentMaxWidth}/>;
  }

  renderContext() {
    const {model: {context, background}, onContextClick} = this.props;
    if (!context) {
      return null;
    }
    const {icon, text, link} = context;
    return (
      <ContextView
        icon={icon}
        text={text}
        link={link && link.url}
        inverse={Boolean(background)}
        onContextClick={onContextClick}
      />
    );
  }

  renderActions() {
    const {model: {actions, background}, onActionClick} = this.props;

    if (!actions) {
      return null;
    }

    return <ActionsView actions={actions} inverse={Boolean(background)} onActionClick={onActionClick}/>;
  }

  renderBody() {
    const {model: {description, details, context, actions}} = this.props;

    if (!description && !details && !context && !actions) {
      return null;
    }

    return (
      <div>
        {this.renderDescription()}
        {this.renderMeta()}
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
    const {model: {collapsible}, collapsed} = this.props;

    if (collapsible) {
      return (
        <Collapsible collapsed={collapsed}>
          {this.renderBody()}
        </Collapsible>
      );
    }

    return this.renderBody();
  }

  renderCard(): JSX.Element {
    const {model: {background, preview}, onClick} = this.props;
    return (
      <Card background={background && background.url} onClick={onClick}>
        {this.renderPreview()}
        <CardContent hasPreview={Boolean(preview)}>
          {this.renderHeader()}
          {this.renderCollapsibleBody()}
        </CardContent>
      </Card>
    );
  }

  render(): JSX.Element {
    const {model: {link}} = this.props;

    if (link) {
      return (
        <Link href={link.url}>
          {this.renderCard()}
        </Link>
      );
    }

    return this.renderCard();
  }

}
