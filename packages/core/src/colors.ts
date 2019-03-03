/**
 * Themed color scheme type
 * Should have both light and dark colors schemes
 */
export type ThemedColorSchemeType = {
  light: ColorSchemeType
  dark: ColorSchemeType
}

/**
 * Colors scheme type
 */
export type ColorSchemeType = {
  danger: string
  success: string
  main: string
  inverted: string
  background: string
  grey: string
  lightGrey: string
  lighterGrey: string
  highlight: string
  systemColors: SystemColorsType
}

export type SystemColorsType = {
  red: string
  purple: string
}

/**
 * Reference Color Scheme
 */
export const ColorScheme: ThemedColorSchemeType = {
  light: {
    danger: '#DE4D45',
    success: '#5EE89A',
    main: 'black',
    inverted: 'white',
    background: '#FFFFFF',
    grey: '#888',
    lightGrey: '#BBB',
    lighterGrey: '#EEE',
    highlight: 'rgb(12,95,254)',
    systemColors: {
      red: 'red',
      purple: 'purple',
    },
  },
  dark: {
    danger: '#eE5D55',
    success: '#2FA261',
    main: 'white',
    inverted: 'black',
    background: '#1F2228',
    grey: '#888',
    lightGrey: '#555',
    lighterGrey: '#333',
    highlight: 'rgb(42,125,254)',
    systemColors: {
      red: 'red',
      purple: 'purple',
    },
  },
}

export default ColorScheme
