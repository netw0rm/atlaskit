import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  akGridSize,
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';
import Message from '@atlaskit/inline-message';
import Table from '@atlaskit/dynamic-table';

import { Heading, Intro, Section } from '../components/Type';
import patterns from '../../patterns';

const head = {
  cells: [
    {
      key: 'pattern',
      content: 'Pattern',
      isSortable: false,
      width: 15,
    },
    {
      key: 'mainComponent',
      content: 'Main Component',
      shouldTruncate: true,
      isSortable: false,
      width: 45,
    },
  ],
};

export default class Components extends PureComponent {
  static propTypes = {
    packages: PropTypes.arrayOf(PropTypes.object),
    header: PropTypes.node,
  }

  renderHeader = () => {
    const { header: Header, ...rest } = this.props;

    return Header ? <Header {...rest} /> : <span />;
  }

  renderRow = (pattern) => {
    const {
      title, mainComponent,
    } = pattern;

    return {
      cells: [
        {
          key: 'pattern',
          content: (
            <RowCell>
              <Link to={`/patterns/${encodeURI(title)}`}>
                {title}
              </Link>
            </RowCell>
          ),
        },
        {
          key: 'mainComponent',
          shouldTruncate: true,
          content: (
            <RowCell>
              <Link to={`/components/${mainComponent}`}>
                {mainComponent}
              </Link>
            </RowCell>
          ),
        },
      ],
    };
  }

  renderDesktop = () => (
    <TableWrapper>
      <Table
        head={head}
        rows={
          patterns.map(pattern => this.renderRow(pattern))
        }
        isFixedSize
      />
    </TableWrapper>
  );

  render() {
    const Header = this.renderHeader;
    const DesktopContent = this.renderDesktop;

    return (
      <Wrapper>
        <Helmet title="Patterns" />
        <Heading>Patterns</Heading>
        <Intro>
          These packages are designed for complex use-cases, exporting multiple
          composable components.
        </Intro>
        <Section>
          <Header />
          <DesktopContent />
        </Section>
        <Section style={{ marginLeft: `-${akGridSize}` }}>
          <Message title="Atlassians">
            For internal, Fabric, and Media Services components please see the <a href="//aui-cdn.atlassian.com/atlaskit/registry/components.html" target="_blank" rel="noopener noreferrer">registry website</a>.
          </Message>
        </Section>
      </Wrapper>
    );
  }
}

// Layout
const Wrapper = styled.div`
  padding-bottom: 3em;
  padding-left: ${akGridSizeUnitless * 2.5}px;
  padding-right: ${akGridSizeUnitless * 2.5}px;

  @media (min-width: 600px) {
    padding-left: ${akGridSizeUnitless * 5}px;
    padding-right: ${akGridSizeUnitless * 5}px;
  }
`;

// Tabular data
const TableWrapper = styled.div`
  @media (max-width: 600px) {
    overflow-x: auto;

    & table {
      table-layout: auto;
    }
  }
`;
const RowCell = styled.div`
  padding-bottom: ${akGridSize};
  padding-top: ${akGridSize};
`;
