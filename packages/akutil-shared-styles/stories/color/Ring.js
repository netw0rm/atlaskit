import React from 'react';
import uid from 'uid';
import Tooltip, { TooltipTrigger } from 'ak-tooltip';
import reactify from 'akutil-react';
import camelcase from 'camelcase';


import styles from 'style!./ring.less';
import ClipboardQuarterRing from './ClipboardQuarterRing';


const AkTooltip = reactify(Tooltip);
const AkTooltipTrigger = reactify(TooltipTrigger);
const tooltipId = `tooltip-${uid()}`;

const Quarter = (props) => {
  const position = camelcase(props['y-pos'], props['x-pos']);
  return (
    <AkTooltipTrigger description={props.description} position={props['y-pos']}>
      <ClipboardQuarterRing
        position={position}
        color={props.color}
        aria-describedby={tooltipId}
      />
    </AkTooltipTrigger>
  );
};
Quarter.propTypes = {
  'x-pos': React.PropTypes.string.isRequired,
  'y-pos': React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  color: React.PropTypes.string.isRequired,
};


const Ring = props => (
  <div className={styles.ring}>
    <div className={styles.topHalf}>
      <Quarter
        y-pos="top"
        x-pos="left"
        description={props.topLeftColor}
        color={props.topLeftColor}
      />
      <Quarter
        y-pos="top"
        x-pos="right"
        description={props.topRightColor}
        color={props.topRightColor}
      />
    </div>
    <div className={styles.bottomHalf}>
      <Quarter
        y-pos="bottom"
        x-pos="left"
        description={props.bottomLeftColor}
        color={props.bottomLeftColor}
      />
      <Quarter
        y-pos="bottom"
        x-pos="right"
        description={props.bottomRightColor}
        color={props.bottomRightColor}
      />
    </div>
    <AkTooltip id={tooltipId} />
  </div>
);

Ring.displayName = 'Ring';
Ring.propTypes = {
  topLeftColor: React.PropTypes.string.isRequired,
  topRightColor: React.PropTypes.string.isRequired,
  bottomLeftColor: React.PropTypes.string.isRequired,
  bottomRightColor: React.PropTypes.string.isRequired,
};


export default Ring;
