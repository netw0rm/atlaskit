import { action } from '@kadira/storybook';

// eslint-disable-next-line max-len
export const sampleText = 'Cookie macaroon liquorice. Marshmallow donut lemon drops candy canes marshmallow topping chocolate cake. Croissant pastry soufflé waffle cake fruitcake. Brownie oat cake sugar plum.';
export const nonSpacedSampleText = 'Cookiemacaroonliquorice.Marshmallowdonutlemondropscandycanesmarshmallowtoppingchocolatecake.Croissantpastrysouffléwafflecakefruitcake.Brownieoatcakesugarplum.';

export const clickHandler = event => action(`${event.target.textContent} button was clicked.`)();
