import React from 'react';
import traverse, { wrapRender, transformComponents } from 'react-traverse';
import ReactTooltip from 'react-tooltip';

const replaceDivsWithSpans = node => traverse(node, {
  ComponentElement(path) {
    const name = path.node.type.displayName || path.node.type.name;
    const nameProp = name ? { 'data-tip': name } : {};
    const clonedElementComponent = () => React.cloneElement(
      path.node,
      Object.assign(nameProp, path.node.props),
      ...path.traverseChildren(),
    );
    clonedElementComponent.displayName = name;
    if (name) {
      return (<div {...nameProp}>
        {clonedElementComponent()}
      </div>);
    }
    return clonedElementComponent();
  },
});

function annotate(Component) {
  return transformComponents(wrapRender(replaceDivsWithSpans))(Component);
}

class AnnotatedStory extends React.PureComponent {
  static propTypes = {
    component: React.PropTypes.func.isRequired,
  }
  render() {
    const Component = this.props.component;
    const AnnotatedComponent = annotate(Component);
    return (
      <div>
        <AnnotatedComponent />
        <ReactTooltip place="top" type="dark" effect="float" />
      </div>
    );
  }
}

export default AnnotatedStory;
