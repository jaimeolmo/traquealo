import type { PaletteRange } from '@mui/joy/styles'
import { extendTheme } from '@mui/joy/styles'

declare module '@mui/joy/styles' {
  interface ColorPalettePropOverrides {
    // apply to all Joy UI components that support `color` prop
    secondary: true
  }

  interface Palette {
    // this will make the node `secondary` configurable in `extendTheme`
    // and add `secondary` to the theme's palette.
    secondary: PaletteRange
  }

  // this will expand the types for the common color of the theme
  interface PaletteCommon {
    softWhite: string
    softBlack: string
    brown50: string
    brown500: string
    brown900: string
  }
}

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        common: {
          white: '#fff',
          softWhite: '#f2f2f2',
          softBlack: '#242424',
          brown50: '#f8f6ee',
          brown500: '#b48c4b',
          brown900: '#563a2d',
        },
        primary: {
          '50': '#f1f9fe',
          '100': '#e2f1fc',
          '200': '#bfe3f8',
          '300': '#87cdf2',
          '400': '#47b3e9',
          '500': '#1e92cc',
          '600': '#127bb7',
          '700': '#106294',
          '800': '#11547b',
          '900': '#144666',
        },
        secondary: {
          '50': '#fffaeb',
          '100': '#fff1c6',
          '200': '#fee489',
          '300': '#fecf4b',
          '400': '#fdba22',
          '500': '#f89c12',
          '600': '#db7104',
          '700': '#b64e07',
          '800': '#943c0c',
          '900': '#79320e',
          plainColor: 'var(--joy-palette-secondary-500)',
          plainHoverBg: 'var(--joy-palette-secondary-100)',
          plainActiveBg: 'var(--joy-palette-secondary-200)',
          plainDisabledColor: 'var(--joy-palette-neutral-400)',
          outlinedColor: 'var(--joy-palette-secondary-500)',
          outlinedBorder: 'var(--joy-palette-secondary-300)',
          outlinedHoverBg: 'var(--joy-palette-secondary-100)',
          outlinedActiveBg: 'var(--joy-palette-secondary-200)',
          outlinedDisabledColor: 'var(--joy-palette-neutral-400)',
          outlinedDisabledBorder: 'var(--joy-palette-neutral-200)',
          softColor: 'var(--joy-palette-secondary-700)',
          softBg: 'var(--joy-palette-secondary-100)',
          softHoverBg: 'var(--joy-palette-secondary-200)',
          softDisabledColor: 'var(--joy-palette-neutral-400)',
          softDisabledBg: 'var(--joy-palette-neutral-50)',
          softActiveBg: 'var(--joy-palette-secondary-300)',
          solidColor: 'var(--joy-palette-secondary-50)',
          solidBg: 'var(--joy-palette-secondary-500)',
          solidHoverBg: 'var(--joy-palette-secondary-600)',
          solidActiveBg: 'var(--joy-palette-secondary-700)',
          solidDisabledColor: 'var(--joy-palette-neutral-400)',
          solidDisabledBg: 'var(--joy-palette-neutral-100)',
        },
      },
    },
    dark: {
      palette: {
        secondary: {
          '50': '#fffaeb',
          '100': '#fff1c6',
          '200': '#fee489',
          '300': '#fecf4b',
          '400': '#fdba22',
          '500': '#f89c12',
          '600': '#db7104',
          '700': '#b64e07',
          '800': '#943c0c',
          '900': '#79320e',
          outlinedBorder: 'var(--joy-palette-secondary-100)',
          outlinedColor: 'var(--joy-palette-secondary-700)',
          outlinedActiveBg: 'var(--joy-palette-secondary-100)',
          softColor: 'var(--joy-palette-secondary-800)',
          softBg: 'var(--joy-palette-secondary-200)',
          softActiveBg: 'var(--joy-palette-secondary-300)',
          plainColor: 'var(--joy-palette-secondary-700)',
          plainActiveBg: 'var(--joy-palette-secondary-100)',
          solidColor: 'var(--joy-palette-secondary-50)',
          solidBg: 'var(--joy-palette-secondary-500)',
          solidHoverBg: 'var(--joy-palette-secondary-600)',
          solidActiveBg: 'var(--joy-palette-secondary-700)',
        },
      },
    },
  },
})

export default theme
