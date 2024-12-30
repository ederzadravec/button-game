import "styled-components";

import Theme from "#/assets/theme";

import {
  PaletteValues,
  ScreensValues,
  ScreensEnum,
  ColorsEnum,
  PaletteColorsEnum,
} from "./enums";

declare module "styled-components" {
  export interface DefaultTheme {
    palette: PaletteValues;
    helpers: typeof Theme.helpers;
    screens: ScreensValues;
  }
}

export type ScreensType = Partial<
  Record<ScreensEnum, 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | number>
>;

export type PalleteColors = ColorsEnum | PaletteColorsEnum;
