import React, { PropTypes, PureComponent } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import styles from 'style!./styles.less';
import { NotImplementedError } from './internal/exceptions';
import size from './internal/size';

export default class Icon extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    size: PropTypes.oneOf(Object.keys(size).map(k => size[k])),
    onClick: PropTypes.func,
    color: PropTypes.string,
    fill: PropTypes.string,
  }

  static defaultProps = {
    onClick() {
    },
    size: 'small',
    color: '#172b4d',
  }

  // eslint-disable-next-line class-methods-use-this
  getGlyphTemplate() {
    throw new NotImplementedError('Subclasses need to provide an implementation');
  }

  render() {
    const { color, fill, label } = this.props;
    const Glyph = this.getGlyphTemplate();
    const iconBodyClasses = classnames([styles.iconBody, styles[this.props.size]]);
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <span className={iconBodyClasses} onClick={this.props.onClick}>
        <div className={styles.svg} label={this.props.label} role="img" aria-label={label}>
          <Glyph color={color} fill={fill} label={label} />
        </div>
      </span>
    );
  }
}

const IconContent = styled.div`
  background-image: url(${props => props.dataURI});
  background-size: contain;
  width: 100%;
  height: 100%;
`;

const iconContructor = (componentName, svgBase) => (
  class extends Icon {
    static displayName = JSON.stringify(componentName);
    static propTypes = {
      label: PropTypes.string.isRequired,
      color: PropTypes.string,
      fill: PropTypes.string,
    }
    /* eslint-disable class-methods-use-this */
    /* eslint-disable react/prop-types */
    getGlyphTemplate() {
      return (props) => {
        const { label } = props;
        const placeHolders = Object.keys(props).map(key => `${key}="${props[key]}"`).join(' ');
        const svgData = btoa(svgBase.replace(/iconProps/i, placeHolders));

        const dataURI = `data:image/svg+xml;base64,${svgData}`;
        return (
          <div>
            <span className={styles.label}>{label}</span>
            <IconContent dataURI={dataURI} />
          </div>
        );
      };
    }
    /* eslint-enable react/prop-types */
    /* eslint-enable class-methods-use-this */
  }
);

export { NotImplementedError, iconContructor, size };
