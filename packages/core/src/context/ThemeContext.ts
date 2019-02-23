import * as React from 'react'
import { ColorScheme } from '../colors'
import { Fonts } from '../fonts'

export const ThemeContext = React.createContext({
  prefersColorScheme: 'light',
  colors: ColorScheme.light,
  fonts: Fonts,
})

export default ThemeContext
