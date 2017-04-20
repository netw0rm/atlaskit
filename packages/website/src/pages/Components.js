import React, { PropTypes, PureComponent } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { akGridSize, akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import Table from '@atlaskit/dynamic-table';

import { Heading, Intro, Section } from '../components/Type';

const head = {
  cells: [
    {
      key: 'name',
      content: 'Name',
      isSortable: true,
      width: 15,
    },
    {
      key: 'description',
      content: 'Description',
      shouldTruncate: true,
      isSortable: false,
      width: 45,
    },
    {
      key: 'updated',
      content: 'Updated',
      shouldTruncate: true,
      isSortable: true,
      width: 20,
    },
    {
      key: 'maintainers',
      content: 'Maintainers',
      shouldTruncate: true,
      isSortable: false,
      width: 20,
    },
  ],
};

export default class Components extends PureComponent {
  static propTypes = {
    components: PropTypes.arrayOf(PropTypes.object),
    header: PropTypes.node,
  }

  isMaintainerFound = component => !!(component.maintainers.length)
  isComponentFound = component => !!(component.name)
  filteredComponents = component => !(
    !this.isMaintainerFound(component)
    && !this.isComponentFound(component)
  )

  renderHeader = () => {
    const { header: Header, ...rest } = this.props;

    return Header ? <Header {...rest} /> : <span />;
  }

  renderRow = (component) => {
    const {
      description, packageName, packageNameWithoutOrg, maintainers, name, publishTime, version,
    } = component;

    return {
      cells: [
        {
          key: name,
          content: (
            <RowCell>
              <Link to={`/components/${packageNameWithoutOrg}`}>
                {name}
              </Link>
            </RowCell>
          ),
        },
        {
          key: description,
          shouldTruncate: true,
          content: (
            <RowCell>{description}</RowCell>
          ),
        },
        {
          key: publishTime.toString(),
          content: (
            <RowCell>
              <a href={`https://www.npmjs.com/package/${packageName}`} target="_new">
                {version}
              </a>
              &nbsp;
              {publishTime ? (
                <time dateTime={publishTime}>
                  {publishTime.toLocaleDateString()}
                </time>
              ) : null}
            </RowCell>
          ),
        },
        {
          content: (
            <RowCell>
              {maintainers.map(val => val.name).join(', ')}
            </RowCell>
          ),
        },
      ],
    };
  }

  renderContent = () => {
    const { components } = this.props;
    return (
      <TableWrapper>
        <Table
          head={head}
          rows={components.filter(this.filteredComponents).map(c => this.renderRow(c))}
          isFixedSize
          defaultSortKey="name"
          defaultSortOrder="ASC"
        />
      </TableWrapper>
    );
  }

  render() {
    const Header = this.renderHeader;
    const Content = this.renderContent;

    return (
      <Wrapper>
        <Helmet title="Components" />
        <Heading>Components</Heading>
        <Intro>
          Write something compelling here, cupcake powder dragée liquorice fruitcake cookie.
        </Intro>
        <Section>
          <Header />
          <Content />
        </Section>
      </Wrapper>
    );
  }
}

// Layout
const Wrapper = styled.div`
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
