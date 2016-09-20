import { define } from 'skatejs';
import AKTrigger from '../../src/index.tooltip-trigger';

/*
   This is a simple container element to show that we can bind a tooltip to an element in the
   shadowDOM.
*/
export default define('ak-container', {
  render() {
    const containerStyles = {
      height: '200px',
      width: '200px',
      border: '1px dashed red',
      position: 'relative',
    };
    const buttonStyles = {
      width: '80px',
      backgroundColor: 'orange',
      textAlign: 'center',
      position: 'absolute',
      bottom: '0px',
      right: '0px',
    };
    return (
      <div>
        We can bind tooltips to items in the shadowDOM easily as we don't rely on looking elements
        up by ID.<br /><br />
        <div style={containerStyles}>
          <AKTrigger style={buttonStyles} position="bottom" description="This is a tooltip">
            <span aria-describedby="ak-tooltip">Hover Me</span>
          </AKTrigger>
        </div>
      </div>
    );
  },
});
