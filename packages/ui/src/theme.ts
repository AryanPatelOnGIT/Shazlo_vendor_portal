import { createTheme, type CSSProperties, type Theme, type ThemeOptions } from '@mui/material/styles'
import { voyageFontFaces, type VoyageFontOptions } from './fonts'
import { brand, fontFamily, neutral, radius, status, typeScale, type TypeStyle } from './tokens'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    display1: CSSProperties
    display2: CSSProperties
    stat: CSSProperties
    mono: CSSProperties
  }
  interface TypographyVariantsOptions {
    display1?: CSSProperties
    display2?: CSSProperties
    stat?: CSSProperties
    mono?: CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display1: true
    display2: true
    stat: true
    mono: true
  }
}

export interface ShazloThemeOptions {
  // Adds @font-face rules for Voyage to CssBaseline. Leave unset if the app has no licensed copy;
  // display text then falls back to Instrument Serif or Georgia.
  voyage?: VoyageFontOptions
  // Deep-merged over the Shazlo defaults.
  overrides?: ThemeOptions
}

function type(s: TypeStyle): CSSProperties {
  return {
    fontFamily: fontFamily[s.family],
    fontSize: `${s.size / 16}rem`,
    lineHeight: Math.round((s.lineHeight / s.size) * 1000) / 1000,
    fontWeight: s.weight,
    letterSpacing: `${s.letterSpacing}px`,
  }
}

function baseOptions({ voyage }: ShazloThemeOptions): ThemeOptions {
  return {
    palette: {
      mode: 'light',
      primary: { main: brand.black, contrastText: brand.white },
      secondary: { main: brand.gold, contrastText: brand.black },
      success: { main: status.success },
      warning: { main: status.warning },
      error: { main: status.error },
      info: { main: status.info },
      text: { primary: neutral.ink, secondary: neutral.inkSecondary, disabled: neutral.inkTertiary },
      divider: neutral.line,
      background: { default: neutral.canvas, paper: neutral.surface },
      grey: {
        50: neutral.canvas,
        100: neutral.muted,
        200: neutral.line,
        300: neutral.lineStrong,
        500: neutral.inkTertiary,
        700: neutral.inkSecondary,
        900: neutral.ink,
      },
    },
    shape: { borderRadius: radius.control },
    typography: {
      fontFamily: fontFamily.body,
      display1: type(typeScale.displayXl),
      display2: type(typeScale.displayL),
      h1: type(typeScale.h1),
      h2: type(typeScale.h2),
      h3: type(typeScale.h3),
      h4: { ...type(typeScale.bodyStrong), fontWeight: 600 },
      h5: { ...type(typeScale.smallStrong), fontWeight: 600 },
      h6: { ...type(typeScale.caption), fontWeight: 600 },
      subtitle1: type(typeScale.bodyStrong),
      subtitle2: type(typeScale.smallStrong),
      body1: type(typeScale.body),
      body2: type(typeScale.small),
      caption: type(typeScale.caption),
      overline: { ...type(typeScale.overline), textTransform: 'uppercase' },
      button: { ...type(typeScale.bodyStrong), textTransform: 'none' },
      stat: type(typeScale.stat),
      mono: type(typeScale.mono),
    },
    components: {
      MuiCssBaseline: voyage ? { styleOverrides: voyageFontFaces(voyage) } : {},
      MuiTypography: {
        defaultProps: {
          variantMapping: { display1: 'h1', display2: 'h2', stat: 'p', mono: 'code' },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: { root: { borderRadius: radius.control } },
      },
      MuiPaper: { defaultProps: { elevation: 0 } },
      MuiCard: {
        defaultProps: { variant: 'outlined' },
        styleOverrides: { root: { borderRadius: radius.card } },
      },
      MuiChip: { styleOverrides: { root: { borderRadius: radius.pill, fontWeight: 500 } } },
      MuiOutlinedInput: {
        styleOverrides: {
          root: { borderRadius: radius.control },
          notchedOutline: { borderColor: neutral.lineStrong },
        },
      },
    },
  }
}

export function createShazloTheme(options: ShazloThemeOptions = {}): Theme {
  return createTheme(baseOptions(options), options.overrides ?? {})
}

export const theme = createShazloTheme()
