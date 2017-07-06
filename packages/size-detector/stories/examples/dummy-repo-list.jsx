import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';import {
  akColorN40,
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';

const Container = styled.div`
  margin-top: ${akGridSizeUnitless * 1.5}px;
`;
const Heading = styled.h2`
  border-bottom: 2px solid ${akColorN40};
  font-size: 14px;
  font-weight: bold;
  line-height: ${20 / 14};
  padding: ${akGridSizeUnitless / 2}px ${akGridSizeUnitless}px ${akGridSizeUnitless / 2}px 0;
`;
const List = styled.div`
  padding: ${akGridSizeUnitless}px 0;
`;
const Item = styled.div`
  padding: 5px;
`;

class RepoItem extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      repo: PropTypes.string,
      project: PropTypes.string,
      owner: PropTypes.string,
      updated: PropTypes.string,
    }),
  }

  state = {
    expanded: false,
  }

  handleToggle = () => {
    console.log(this.state.expanded);
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { data } = this.props;

    return (
      <Item>
        <div>
          <a href="#">{data.repo}</a> <button onClick={this.handleToggle}>toggle</button>
        </div>
        <dl style={{ display: this.state.expanded ? 'block' : 'none' }}>
          <dt>Project</dt>
          <dd>{data.project}</dd>
          <dt>Owner</dt>
          <dd>{data.owner}</dd>
          <dt>Last updated</dt>
          <dd>{data.updated}</dd>
        </dl>
      </Item>
    );
  }
}

export default class RepoList extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      repo: PropTypes.string,
      project: PropTypes.string,
      owner: PropTypes.string,
      updated: PropTypes.string,
    })),
  }

  render() {
    const { data } = this.props;

    return (
      <Container>
        <Heading>Repositories</Heading>
        <List>
          {data.map((item, index) => (
            <RepoItem key={index} data={item} />
          ))}
        </List>
      </Container>
    );
  }
}
