export { DefaultTheme } from "styled-components";

import Theme from "#/assets/theme";

export type PaletteValues = typeof Theme.palette;
export type PaletteEnum = keyof PaletteValues;

export type PaletteColorsValues = Omit<typeof Theme.palette, "text" | "colors">;
export type PaletteColorsEnum = keyof PaletteColorsValues;

export type ColorsValues = typeof Theme.palette.colors;
export type ColorsEnum = keyof ColorsValues;

export type ScreensValues = typeof Theme.screens;
export type ScreensEnum = keyof ScreensValues;
