import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LayoutFork from 'react-media';
import Message from '@atlaskit/inline-message';
import Table from '@atlaskit/dynamic-table';
import { borderRadius, colors, gridSize, math, themed } from '@atlaskit/theme';

import { Heading, Intro, Section } from '../components/Type';
import components from '../data';
import { MOBILE_QUERY, NEW_WEBSITE_LOCATION } from '../../constants';

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
      description,
      key,
      maintainers,
      name,
      lastPublishedOn,
      packageName,
      packageHasBeenMoved,
      version,
    } = component;

    const publishTime = new Date(lastPublishedOn);
    const Destination = () => (
      packageHasBeenMoved
        ? (
          <a href={`${NEW_WEBSITE_LOCATION}/packages/elements/${key}`}>
            {name}
          </a>
        )
        : (
          <Link to={`/components/${key}`}>
            {name}
          </Link>
        )
    );

    return {
      cells: [
        {
          key: 'name',
          content: (
            <RowCell>
              <Destination />
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
                <Time dateTime={component.publishedDate}>
                  {' '}({component.publishedDate && new Date(component.publishedDate).toLocaleDateString()})
                </Time>
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

  renderDesktop = () => (
    <TableWrapper>
      <Table
        head={head}
        rows={componentKeys.map(key => this.renderRow(components[key]))}
        isFixedSize
      />
    </TableWrapper>
  );

  renderMobile = () => (
    <div>{componentKeys.map((key) => {
      const component = components[key];
      const { description, name, version } = component;

      return (
        <Row to={`/components/${key}`} key={key}>
          <RowHeader>
            <RowTitle>{name}</RowTitle>
            <RowVersion>{version}</RowVersion>
          </RowHeader>
          <RowDescription>
            {description}
          </RowDescription>
        </Row>
      );
    })}</div>
  );

  render() {
    const Header = this.renderHeader;
    const DesktopContent = this.renderDesktop;
    const MobileContent = this.renderMobile;

    return (
      <Wrapper>
        <Helmet title="Components" />
        <Heading>Components</Heading>
        <Intro>
          These React components will help you
          build Atlassian cloud applications and add-ons.
        </Intro>
        <Section>
          <Header />
          <LayoutFork query={MOBILE_QUERY}>
            {matches => (matches ? <MobileContent /> : <DesktopContent />)}
          </LayoutFork>
        </Section>
        <Section style={{ marginLeft: -gridSize(this.props) }}>
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
  padding-left: ${math.multiply(gridSize, 2.5)}px;
  padding-right: ${math.multiply(gridSize, 2.5)}px;

  @media (min-width: 600px) {
    padding-left: ${math.multiply(gridSize, 5)}px;
    padding-right: ${math.multiply(gridSize, 5)}px;
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
  padding-bottom: ${gridSize}px;
  padding-top: ${gridSize}px;
`;
const Time = styled.time`
  color: ${themed({ dark: colors.DN80, light: colors.N80 })};
`;

// Mobile content
const Row = styled(Link)`
  padding-bottom: ${gridSize}px;
  border-radius: ${borderRadius}px;
  color: ${themed({ dark: colors.DN80, light: colors.N80 })};
  display: block;
  padding: 0.5em 1em;
  margin-bottom: 0.5em;
  margin-left: -1em;
  margin-right: -1em;
  text-decoration: none !important;

  &:active,
  &:focus {
    background-color: ${themed({ dark: colors.DN50, light: colors.B50 })};
    text-decoration: none;
  }
`;
const RowHeader = styled.div`
  align-items: baseline;
  display: flex;
`;
const RowTitle = styled.div`
  color: ${colors.link};
  font-weight: 500;
  margin-right: 0.5em;
`;
const RowVersion = styled.div`
  color: ${colors.subtleText};
`;
const RowDescription = styled.div`
  color: ${colors.text};
  line-height: 1.4;
  font-size: 0.85em;
`;
