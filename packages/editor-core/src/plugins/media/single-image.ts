
export type Alignment = 'left' | 'right' | 'center';
export type Display = 'inline-block' | 'block';

export function textAlign(alignment: Alignment, display: Display): string {
  if (display !== 'block') {
    return 'left';
  }
  return alignment;
}

export function float(alignment: Alignment, display: Display): string {
  if (display === 'block') {
    return 'none';
  }

  switch (alignment) {
    case 'right':
      return 'right';
    default:
      return 'left';
  }
}

export function clear(alignment: Alignment, display: Display): string {
  if (display === 'block') {
    return 'both';
  }

  switch (alignment) {
    case 'left':
      return 'left';
    case 'right':
      return 'right';
    default:
      return 'both';
  }
}
