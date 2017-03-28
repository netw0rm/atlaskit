import { SpriteServiceRepresentation, SpriteRepresentation, ImageRepresentation } from './types';

export const isSpriteServiceRepresentation = (rep): rep is SpriteServiceRepresentation => !!(rep && (<SpriteServiceRepresentation> rep).spriteRef);
export const isSpriteRepresentation = (rep): rep is SpriteRepresentation => !!(rep && (<SpriteRepresentation> rep).sprite);
export const isImageRepresentation = (rep): rep is ImageRepresentation => !!(rep && (<ImageRepresentation> rep).imagePath);
