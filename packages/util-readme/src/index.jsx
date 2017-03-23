/*

# Notes

The https://github.com/storybooks/react-storybook-addon-info addon only
displayed a tiny question mark (?) in the upper right corner that the viewer
had to click if they wanted to view the information we decorated the story
with. Unfortunatley it didn't seem there was any way to disable this.

There was https://github.com/tuchk4/storybook-readme but it, too, didn't render
how we wanted it to.

I tried using https://github.com/FormidableLabs/component-playground but I
couldn't get past an ambiguous error about ref, mounting and the possibility of
having multiple copies of React on the page. When I searched for issues, I
found https://github.com/FormidableLabs/component-playground/issues/67 but
there wasn't a resolution or much activity on it.

Styles are currently done with inline styles because I didn't want to boil the
ocean and it was the simplest way.

*/

import React, { PropTypes, PureComponent } from 'react';
import decamelize from 'decamelize';
import Chrome from './Chrome';
import Description from './Description';
import DynamicProps from './DynamicProps';
import Usage from './Usage';

export default class Readme extends PureComponent {
  static propTypes = {
    /** The component class/function described by the readme */
    component: PropTypes.func.isRequired,
    /**
     * An optional overriding name, e.g. @atlaskit/util-readme.
     * Useful when props.component doesn't have a displayname attribute
     */
    name: PropTypes.string,
    /** A description of the component */
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    /** A renderable example of the basic usage of the component */
    codeExample: PropTypes.node.isRequired,
    /** The source code for the renderable example, displayed alongside the example */
    codeSource: PropTypes.string.isRequired,
    /** The source code of the component */
    componentSource: PropTypes.string.isRequired,
  }

  render() {
    const {
      codeExample,
      codeSource,
      component,
      componentSource,
      description,
      name,
    } = this.props;

    const displayName = name || component.displayName || 'Unknown';
    const displayNameDashed = displayName ? decamelize(displayName, '-') : '';

    return (
      <Chrome title={displayName}>
        <Description>{description}</Description>
        <Usage moduleName={displayNameDashed} source={codeSource} example={codeExample} />
        <DynamicProps component={component} componentSrc={componentSource} />
      </Chrome>
    );
  }
}
