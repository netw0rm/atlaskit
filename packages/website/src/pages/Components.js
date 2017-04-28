import React, { PropTypes, PureComponent } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { akGridSize, akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import Table from '@atlaskit/dynamic-table';

import { Heading, Intro, Section } from '../components/Type';

import components from '../data';

const componentKeys = Object.keys(components);

const head = {
  cells: [
    {
      key: 'name',
      content: 'Name',
      isSortable: false,
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
      key: 'publishTime',
      content: 'Latest',
      shouldTruncate: true,
      isSortable: false,
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

  renderHeader = () => {
    const { header: Header, ...rest } = this.props;

    return Header ? <Header {...rest} /> : <span />;
  }

  renderRow = (component) => {
    const {
      description, packageName, key, maintainers, name, lastPublishedOn, version,
    } = component;

    const publishTime = new Date(lastPublishedOn);

    return {
      cells: [
        {
          key: 'name',
          content: (
            <RowCell>
              <Link to={`/components/${key}`}>
                {name}
              </Link>
            </RowCell>
          ),
        },
        {
          key: 'description',
          shouldTruncate: true,
          content: (
            <RowCell>{description}</RowCell>
          ),
        },
        {
          key: 'publishTime',
          content: (
            <RowCell>
              <a href={`https://www.npmjs.com/package/${packageName}`} target="_new">
                {version}
              </a>
              {publishTime ? (
                <time dateTime={component.publishedDate}>
                  {' '}{component.publishedDate && new Date(component.publishedDate).toLocaleDateString()}
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

  renderContent = () => (
    <TableWrapper>
      <Table
        head={head}
        rows={componentKeys.map(key => this.renderRow(components[key]))}
        isFixedSize
      />
    </TableWrapper>
  );

  render() {
    const Header = this.renderHeader;
    const Content = this.renderContent;

    return (
      <Wrapper>
        <Helmet title="Components" />
        <Heading>Components</Heading>
        <Intro>
          These React Components make up the foundation building blocks of our
          UI framework.
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
