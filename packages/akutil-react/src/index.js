import reactify from 'skatejs-react-integration';

/**
 * Turn an atlaskit web component into a react component
 * @param webComponent the atlaskit web component
 * @param options
 *          - React: the instance of React to register with
 *          - ReactDOM: the instance of ReactDOM to register with
 */
export default function (webComponent, options) {
  return reactify(webComponent, options);
}
