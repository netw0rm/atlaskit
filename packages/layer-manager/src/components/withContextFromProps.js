// @flow
import React, { Component } from 'react';
import { ChildrenType, ComponentType } from '../types';

type Props = { children: ChildrenType };

const DefaultBaseComponent = props => <div {...props} />;

const withContextFromProps = (
  propTypes: {},
  BaseComponent: ComponentType = DefaultBaseComponent
) => {
  class ContextProps extends Component {
    props: Props; // eslint-disable-line react/sort-comp

    getChildContext() {
      const props = Object.keys(this.props).reduce((result, key) => {
        if (key !== 'children') result[key] = this.props[key];

        return result;
      }, {});

      return props;
    }

    render() {
      return <BaseComponent>{this.props.children}</BaseComponent>;
    }
  }

  ContextProps.displayName = 'withContextFromProps';
  ContextProps.childContextTypes = propTypes;

  return ContextProps;
};

export default withContextFromProps;
