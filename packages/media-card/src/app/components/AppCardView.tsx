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
  isCollapsed?: boolean;
  onClick?: () => void;
  onCollapseClick?: () => void;
  onContextClick?: () => void;
  onActionClick?: (action: AppCardAction) => void;
}

export class AppCardView extends React.Component<AppCardViewProps, {}> {

  static defaultProps = {
    isCollapsed: true
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
    const {model: {title: {text, user}, background, collapsible}, isCollapsed, onCollapseClick} = this.props;
    return (
      <HeaderView
        title={text}
        user={user}
        isInversed={Boolean(background)}
        collapsible={collapsible}
        isCollapsed={isCollapsed}
        onCollapseClick={onCollapseClick}
        contentMaxWidth={this.contentMaxWidth}
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
    return <MetaView meta={details} isInversed={this.isDarkAppearance} contentMaxWidth={this.contentMaxWidth}/>;
  }

  renderContext() {
    const {model: {context}, onContextClick} = this.props;
    if (!context) {
      return null;
    }
    const {icon, text, link} = context;
    return (
      <ContextView
        icon={icon}
        text={text}
        link={link && link.url}
        isInversed={this.isDarkAppearance}
        onContextClick={onContextClick}
      />
    );
  }

  renderActions() {
    const {model: {actions}, onActionClick} = this.props;

    if (!actions) {
      return null;
    }

    return <ActionsView actions={actions} isInversed={this.isDarkAppearance} onActionClick={onActionClick}/>;
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
    const {model: {collapsible}, isCollapsed} = this.props;

    if (collapsible) {
      return (
        <Collapsible isCollapsed={isCollapsed}>
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
