// @flow
import React, { Children, PureComponent } from 'react';
import ReactMarkdown from 'react-markdown';
import semver from 'semver';
import styled, { css } from 'styled-components';
import { akBorderRadius, akColorN20, akColorN30, akColorN200, akGridSizeUnitless } from '@atlaskit/util-shared-styles';
// import { LogType } from '../types';

const gutter = `${akGridSizeUnitless * 3}px`;

const H3 = styled.h3`
  color: ${akColorN200};
  font-size: 18px;
  font-weight: normal;
`;
const Heading = (
  { children, level }:
  { children: string, level: number }
) => {
  if (level !== 2) return children;
  const childrenArray = Children.toArray(children);
  if (childrenArray.length !== 1) return children;
  const title = childrenArray[0];
  if (typeof title !== 'string') return children;

  const version = title.match(/^(\d+\.\d+\.\d+)\s+\(([^)]+)\)/);
  if (!version) return children;

  const versionNumber = version[1];
  const versionDate = version[2];

  const href = `https://bitbucket.org/atlassian/atlaskit/commits/tag/%40atlaskit%2Fflag%40${versionNumber}`;
  const anchorProps = { href, rel: 'noopener noreferrer', style: { fontWeight: 500 }, target: '_blank' };

  return (
    <H3>
      <a {...anchorProps}>{versionNumber}</a>
      <small> &mdash; {versionDate}</small>
    </H3>
  );
};

const LogItem = styled.div`
  margin-bottom: 1em;

  ${p => (p.major ? css`&:not(:first-child) {
    border-top: 2px solid ${akColorN30};
    margin-top: ${gutter};
    padding-top: ${gutter};
  }` : null)}
`;

export const NoMatch = styled.div`
  align-items: center;
  background-color: ${akColorN20};
  border-radius: ${akBorderRadius};
  color: ${akColorN200};
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: ${akGridSizeUnitless * 3}px;
  min-height: 120px;
`;

type Logs = Array<{ md: string, version: string }>;

type Props = {
  changelog: Logs,
  range: string,
};

export default class Changelog extends PureComponent {
  props: Props; // eslint-disable-line react/sort-comp
  render() {
    const { changelog, range } = this.props;
    const logs = range
      ? changelog.filter(e => semver.satisfies(e.version, range))
      : changelog;

    let currentMajor = 0;

    return (
      <div>
        {!logs.length ? (
          <NoMatch>
            No matching versions, please try again.
          </NoMatch>
        ) : logs.map((v, i) => {
          const major = v.version.substr(0, 1);
          const majorHasChanged = currentMajor !== major;
          currentMajor = major;

          return (
            <LogItem key={i} major={majorHasChanged}>
              <ReactMarkdown
                escapeHtml
                source={v.md}
                renderers={{ Heading }}
              />
            </LogItem>
          );
        })}
      </div>
    );
  }
}
