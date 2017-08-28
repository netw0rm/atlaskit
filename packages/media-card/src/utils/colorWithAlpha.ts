import {parseToRgb, rgba} from 'polished';

export const colorWithAlpha = (color: string, alpha: number) => rgba({...parseToRgb(color), alpha});
