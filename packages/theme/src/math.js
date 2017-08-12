// @flow

export function add(fn: (props: Object) => Number, addend: Number): Number {
  return props => fn(props) + addend;
}

export function subtract(fn: (props: Object) => Number, subtrahend: Number): Number {
  return props => fn(props) - subtrahend;
}

export function multiply(fn: (props: Object) => Number, factor: Number): Number {
  return props => fn(props) * factor;
}

export function divide(fn: (props: Object) => Number, divisor: Number): Number {
  return props => fn(props) / divisor;
}
