// @flow

export const TIME_BETWEEN_POURS = 42; // The meaing of everything 👀
export const POUR_TIME = 10;

export const TASTE_BASE_PARTS = 2;
export const STRENGTH_BASE_PARTS = 3;
export const COFFEE_TO_WATER_RATIO = 0.065;

/**
 * Tetsu Kasuya's original formula is:
 *    coffee x 3 x pours = water
 *
 * That gives us the following coffee to water ratio
 *    1 / (3 x pours) => 0.0666...
 *
 * Which is slightly more than 0.065 (my personal base) and what I use
 * to convert water to coffee in `getCoffeeWeight()` 👇
 *
 * To improve accuracy over Kasuya's formula I calculate a custom COFFEE_MULTIPLIER:
 */
export const COFFEE_MULTIPLIER = 1 / (COFFEE_TO_WATER_RATIO * 5); // => 3.0765...
