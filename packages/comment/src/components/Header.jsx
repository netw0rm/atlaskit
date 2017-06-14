import React from 'react';
import PropTypes from 'prop-types';
import Lozenge from '@atlaskit/lozenge';
import LockIcon from '@atlaskit/icon/glyph/lock';
import { BulletSpacer, Restricted, TopItem, TopItemsContainer } from '../styled/HeaderStyles';

const HeaderItems = ({
  author, edited, isError, isSaving, restrictedTo, savingText, time, type,
}) => {
  const restrictedElement = restrictedTo ? (
    <Restricted>
      <BulletSpacer>&bull;</BulletSpacer>
      <LockIcon label="restricted" size="small" />Restricted to {restrictedTo}
    </Restricted>
  ) : null;

  const items = (
    [
      author || null,
      type ? <Lozenge>{type}</Lozenge> : null,
      time && !isSaving && !isError ? time : null,
      edited || null,
      isSaving ? savingText : null,
      restrictedElement,
    ]
    .filter(item => !!item)
    .map((item, index) => <TopItem key={index}>{item}</TopItem>)
  );

  return items.length
    ? <TopItemsContainer>{items}</TopItemsContainer>
    : null;
};

HeaderItems.propTypes = {
  author: PropTypes.node,
  restrictedTo: PropTypes.string,
  isSaving: PropTypes.bool,
  savingText: PropTypes.string,
  time: PropTypes.node,
  type: PropTypes.string,
  edited: PropTypes.node,
  isError: PropTypes.bool,
};

export default HeaderItems;
