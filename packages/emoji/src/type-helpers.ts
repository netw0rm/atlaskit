import { SpriteServiceRepresentation, SpriteRepresentation, ImageRepresentation } from './types';

export const isSpriteServiceRepresentation = rep => !!(rep && (<SpriteServiceRepresentation> rep).spriteRef);
export const isSpriteRepresentation = rep => !!(rep && (<SpriteRepresentation> rep).sprite);
export const isImageRepresentation = rep => !!(rep && (<ImageRepresentation> rep).imagePath);
