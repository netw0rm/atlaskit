import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { colors } from '@atlaskit/theme';

const sizes = {
  small: '16px',
  medium: '24px',
  large: '32px',
  xlarge: '48px',
};

// NOTE: spanStyles is exported for testing
// Once styled-components is bumped > 2.X.X we can enjoy `toHaveStyleRule` from
// https://github.com/styled-components/jest-styled-components#tohavestylerule

const getSize = props => {
  if (props.size) {
    return `height: ${sizes[props.size]}; width: ${sizes[props.size]};`;
  }
  return null;
};

export const spanStyles = css`
  ${getSize}
  color: ${p => p.primaryColor || 'currentColor'};
  display: inline-block;
  fill: ${p => p.secondaryColor || colors.background};
  line-height: 1;
  > svg {
    ${getSize}
    max-height: 100%;
    max-width: 100%;
    overflow: hidden;
    vertical-align: bottom;
  }
`;

export const IconWrapper = styled.span`${spanStyles}`;

class Icon extends PureComponent {
  static propTypes = {
    /** Glyph to show by Icon component (not required when you import a glyph directly) */
    glyph: PropTypes.func,
    /** More performant than the glyph prop, but potentially dangerous if the SVG string hasn't
    been "sanitised" */
    dangerouslySetGlyph: PropTypes.string,
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
      dangerouslySetGlyph,
      onClick,
      primaryColor,
      secondaryColor,
      size,
    } = this.props;

    // handling the glyphs as strings
    if (dangerouslySetGlyph) {
      return (
        <IconWrapper
          onClick={onClick}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          size={size}
          role="img"
          aria-label={this.props.label}
          dangerouslySetInnerHTML={{ __html: dangerouslySetGlyph }}
        />
      );
    }
    // handling the glyphs when passed through as functions
    return (
      <IconWrapper
        onClick={onClick}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        size={size}
        role="img"
        aria-label={this.props.label}
      >
        <Glyph role="presentation" />
      </IconWrapper>
    );
  }
}

const size = Object.keys(sizes).reduce((p, c) => Object.assign(p, { [c]: c }), {});

export { size };
export default Icon;
