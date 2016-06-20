export default function (component, { React }) {
  function ReactComponent(props) {
    return <div>Hello {props.name}</div>;
  }
  ReactComponent.propTypes = {
    name: React.PropTypes.string,
  };

  ReactComponent.displayName = 'ReactifiedComponent';
  return ReactComponent;
}
