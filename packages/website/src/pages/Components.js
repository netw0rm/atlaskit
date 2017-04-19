import React, { PropTypes, PureComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { akGridSize, akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import DynamicTable from '@atlaskit/dynamic-table';

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

export default class TabbedComponents extends PureComponent {
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
        <DynamicTable
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
        <Title>
          <h1>Components</h1>
        </Title>
        <Header />
        <Content />
      </Wrapper>
    );
  }
}

// Layout
const Wrapper = styled.div`
  padding-left: ${akGridSizeUnitless * 1.5}px;
  padding-right: ${akGridSizeUnitless * 1.5}px;

  @media (min-width: 600px) {
    padding-left: ${akGridSizeUnitless * 3}px;
    padding-right: ${akGridSizeUnitless * 3}px;
  }
`;
const Title = styled.div`
  padding-bottom: ${akGridSizeUnitless * 1.5}px;
  padding-top: ${akGridSizeUnitless * 1.5}px;

  @media (min-width: 600px) {
    padding-bottom: ${akGridSizeUnitless * 3}px;
    padding-top: ${akGridSizeUnitless * 3}px;
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
