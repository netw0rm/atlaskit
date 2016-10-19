import { vdom } from 'skatejs';

// eslint-disable-next-line max-len
const DefaultAvatar = () => (<svg width="100%" height="100%" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="User---sizes" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="xlarge---100px"><g id="Defualt-avatar"><path d="M50,0 C22.3833333,0 0,22.3888889 0,50 C0,77.6166667 22.3833333,100 50,100 C77.6111111,100 100,77.6166667 100,50 C100,22.3888889 77.6111111,0 50,0 L50,0 Z" id="Fill-1" fill="#1893E7" /><path d="M50,19 C58.8373333,19 66,26.168 66,35 C66,43.8373333 58.8373333,51 50,51 C41.1626667,51 34,43.8373333 34,35 C34,26.168 41.1626667,19 50,19 L50,19 Z" id="Path" fill="#80D8FF" /><mask id="mask-2" fill="white"><path d="M80.5246347,74.2768131 C73.3793503,83.2490744 62.3612755,89 50,89 C37.6385983,89 26.6204246,83.2489569 19.4751464,74.2765382 C23.8287068,66.9274259 31.8398972,62 41.0068806,62 L58.9931194,62 C68.1573006,62 76.1701334,66.9268153 80.5246347,74.2768131 Z" /></mask><path fill="#80D8FF" d="M80.5246347,74.2768131 C73.3793503,83.2490744 62.3612755,89 50,89 C37.6385983,89 26.6204246,83.2489569 19.4751464,74.2765382 C23.8287068,66.9274259 31.8398972,62 41.0068806,62 L58.9931194,62 C68.1573006,62 76.1701334,66.9268153 80.5246347,74.2768131 Z" /></g></g></g></svg>);

/* eslint-disable react/prop-types */
export default (props) => {
  if (!props.loading) {
    if (!props.src || props.error) {
      return (<DefaultAvatar {...props} />);
    }
  }

  // we deliberately insert the alt prop knowing it will get overwritten by ...props because all
  // img tags should either have an alt or role="presentation"
  return (<img alt={props.alt} {...props} />);
};

