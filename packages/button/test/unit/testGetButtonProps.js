import getButtonProps from '../../src/components/getButtonProps';

let component;

describe('getButtonProps', () => {
  beforeEach(() => {
    component = {
      state: {},
      props: {},
    };
  });

  it('should pass through all props to a custom component', () => {
    component.props.component = () => {};
    component.props.customProp = 1;

    expect(getButtonProps(component).customProp).to.equal(1);
  });

  it('should not pass through all props to an inbuilt component', () => {
    component.customProp = 1;

    expect(getButtonProps(component).customProp).to.be.an('undefined');
  });

  it('should add appearance props', () => {
    expect(getButtonProps(component)).to.contain.all.keys([
      'appearance',
      'className',
      'disabled',
      'isActive',
      'isFocus',
      'isHover',
      'isSelected',
      'spacing',
      'theme',
    ]);
  });

  it('should pass interaction state props from the component\'s state', () => {
    component.state.isActive = 1;
    component.state.isFocus = 2;
    component.state.isHover = 3;

    expect(getButtonProps(component).isActive).to.equal(1);
    expect(getButtonProps(component).isFocus).to.equal(2);
    expect(getButtonProps(component).isHover).to.equal(3);
  });

  it('should add interaction handler props', () => {
    expect(getButtonProps(component)).to.contain.all.keys([
      'onBlur',
      'onFocus',
      'onMouseDown',
      'onMouseEnter',
      'onMouseLeave',
      'onMouseUp',
    ]);
  });

  it('should pass interaction handler functions directly from the component', () => {
    component.onBlur = 1;
    component.onFocus = 2;
    component.onMouseDown = 3;
    component.onMouseEnter = 4;
    component.onMouseLeave = 5;
    component.onMouseUp = 6;

    expect(getButtonProps(component).onBlur).to.equal(1);
    expect(getButtonProps(component).onFocus).to.equal(2);
    expect(getButtonProps(component).onMouseDown).to.equal(3);
    expect(getButtonProps(component).onMouseEnter).to.equal(4);
    expect(getButtonProps(component).onMouseLeave).to.equal(5);
    expect(getButtonProps(component).onMouseUp).to.equal(6);
  });

  it('should pass the onClick handler from props', () => {
    component.onClick = 1;
    component.props.onClick = 2;

    expect(getButtonProps(component).onClick).to.equal(2);
  });

  it('should add aria, form, id and type props to a button', () => {
    expect(getButtonProps(component)).to.contain.all.keys([
      'aria-haspopup',
      'aria-expanded',
      'aria-controls',
      'form',
      'id',
      'type',
    ]);

    component.props.href = '#';

    expect(getButtonProps(component)).to.not.contain.any.keys([
      'aria-haspopup',
      'aria-expanded',
      'aria-controls',
      'form',
      'id',
      'type',
    ]);
  });

  it('should add href and target props to a link', () => {
    component.props.href = '#';

    expect(getButtonProps(component)).to.contain.all.keys([
      'href',
      'target',
    ]);

    component.props.isDisabled = true;

    expect(getButtonProps(component)).to.not.contain.any.keys([
      'href',
      'target',
    ]);
  });
});
