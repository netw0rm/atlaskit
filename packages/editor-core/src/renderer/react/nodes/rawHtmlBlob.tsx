import * as React from 'react';

export default (props) => {
  return <span dangerouslySetInnerHTML={{__html: props.html}} />;
};
