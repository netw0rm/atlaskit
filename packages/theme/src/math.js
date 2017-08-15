// @flow

export function add(fn: (props: Object) => number, addend: number): number {
  return Number(props => fn(props) + addend);
}

export function subtract(fn: (props: Object) => number, subtrahend: number): number {
  return Number(props => fn(props) - subtrahend);
}

export function multiply(fn: (props: Object) => number, factor: number): number {
  return Number(props => fn(props) * factor);
}

export function divide(fn: (props: Object) => number, divisor: number): number {
  return Number(props => fn(props) / divisor);
}
