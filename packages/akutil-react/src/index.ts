import reactify from 'skatejs-react-integration';

/**
 * Turn an atlaskit web component into a react component
 * @param {!object} webComponent the atlaskit web component
 * @param {!{React: object, ReactDOM: object}} options
 *          - React: the instance of React to register with
 *          - ReactDOM: the instance of ReactDOM to register with
 */

interface Options {
  React?: any;
  ReactDOM?: any;
}

export default (webComponent: any, options?: Options): any => reactify(webComponent, options);
