// Need to make div full height in case consumer wants to align
// child content vertically center. These styles can be overridden by the
// product using the optional SizeDetector.outerStyles prop.
export const containerDivStyle = {
  height: '100%',
  flex: '1 0 auto',
  position: 'relative',
};

// Not using styled-components here for performance
// and framework-agnostic reasons.
export const objectStyle = {
  display: 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  pointerEvents: 'none',
  zIndex: -1,
};
