import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import uid from 'uid';

import { colors } from '../../../theme/src';

const sizes = {
  small: '16px',
  medium: '24px',
  large: '32px',
  xlarge: '48px',
};

// NOTE: spanStyles is exported for testing
// Once styled-components is bumped > 2.X.X we can enjoy `toHaveStyleRule` from
// https://github.com/styled-components/jest-styled-components#tohavestylerule

export const spanStyles = css`
  color: ${p => p.primaryColor || 'currentColor'};
  display: inline-block;
  fill: ${p => p.secondaryColor || colors.background};
  height: ${p => p.size};
  line-height: 1;
  width: ${p => p.size};
`;

export const Span = styled.span`${spanStyles}`;

class Icon extends PureComponent {
  static propTypes = {
    /** Glyph to show by Icon component (not required when you import a glyph directly) */
    glyph: PropTypes.func.isRequired,
    /** String to apply as the SVG title element */
    label: PropTypes.string.isRequired,
    /** onClick handler for the icon element */
    onClick: PropTypes.func,
    /** For primary colour for icons */
    primaryColor: PropTypes.string,
    /** For secondary colour for 2-color icons. Set to inherit to control this via "fill" in CSS */
    secondaryColor: PropTypes.string,
    /** Control the size of the icon */
    size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  }

  static defaultProps = {
    onClick: () => {},
  }

  render() {
    const {
      glyph: Glyph,
      onClick,
      primaryColor,
      secondaryColor,
      size,
      ...svgProps
    } = this.props;

    const dimensions = sizes[size];
    const svgStyles = {
      height: dimensions,
      maxHeight: '100%',
      maxWidth: '100%',
      overflow: 'hidden',
      verticalAlign: 'bottom',
      width: dimensions,
    };

    const id = uid();
    return (
      <Span
        onClick={onClick}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        size={dimensions}
      >
        <Glyph
          role="img"
          style={svgStyles}
          title={this.props.label}
          id={id}
          {...svgProps}
        />
      </Span>
    );
  }
}

const size = Object.keys(sizes).reduce((p, c) => Object.assign(p, { [c]: c }), {});

export { size };
export default Icon;
