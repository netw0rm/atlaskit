import React from 'react';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import Banner from '@atlaskit/banner';

const Icon = <ErrorIcon label="Error icon" />;

export default () => (
  <Banner icon={Icon} isOpen appearance="error">
    This is an error banner
  </Banner>
);
