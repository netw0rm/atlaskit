/* eslint-disable react/prop-types */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme, themeValue } from '../../../../theme/src';

const MetaItem = ({ href, label, summary }) => (
  <DI>
    <DT>{label}</DT>
    <DD>{href
      ? <a href={href} target="_new">{summary}</a>
      : summary
    }</DD>
  </DI>
);

export default class MetaData extends PureComponent {
  static propTypes = {
    packageKey: PropTypes.string,
    packageName: PropTypes.string,
  }

  render() {
    const { packageKey, packageName } = this.props;

    return (
      <Meta>
        <MetaItem
          label="Install"
          summary={<code>yarn add {packageName}</code>}
        />
        <MetaItem
          href={`https://www.npmjs.com/package/${packageName}`}
          label="npm"
          summary={packageName}
        />
        <MetaItem
          href={`https://bitbucket.org/atlassian/atlaskit/src/master/packages/${packageKey}`}
          label="Source"
          summary="Bitbucket"
        />
        <MetaItem
          href={`https://unpkg.com/${packageName}/dist`}
          label="Bundle"
          summary="unpkg.com"
        />
      </Meta>
    );
  }
}

const Meta = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.5em;
  margin-right: -0.5em;
  padding-bottom: ${p => theme(p).base.gridSize * 1.5}px;
  padding-top: ${p => theme(p).base.gridSize * 1.5}px;

  @media (min-width: 780px) {
    padding-bottom: ${p => theme(p).base.gridSize * 3}px;
    padding-top: ${p => theme(p).base.gridSize * 3}px;
  }
`;
const DI = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  padding: 0.5em;

  @media (min-width: 780px) {
    flex-direction: row;
  }
  @media (min-width: 1200px) {
    flex-basis: 50%;
  }
`;
const DT = styled.div`
  color: ${themeValue('colors.subtleText')};
  flex-basis: 25%;
`;
const DD = styled.div`
  flex: 1 0 auto;
`;
