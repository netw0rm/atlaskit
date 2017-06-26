import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  AvatarSectionDiv,
  NestedCommentsDiv,
  Container,
  MainSection,
} from '../styled/LayoutStyles';

export default class Layout extends PureComponent {
  static propTypes = {
    /** The element to display as the Comment avatar - generally an AtlasKit Avatar */
    avatar: PropTypes.node,
    /** Nested comments to render */
    children: PropTypes.node,
    /** The main content of the Comment */
    content: PropTypes.node,
  }

  render() {
    const { avatar, children, content } = this.props;

    const AvatarSection = () => (avatar ? (
      <AvatarSectionDiv>
        {avatar}
      </AvatarSectionDiv>
      ) : null);

    const NestedComments = () => (children
      ? <NestedCommentsDiv>{children}</NestedCommentsDiv>
      : null);

    return (
      <Container>
        <AvatarSection />
        <MainSection>
          {content}
          <NestedComments />
        </MainSection>
      </Container>
    );
  }
}
