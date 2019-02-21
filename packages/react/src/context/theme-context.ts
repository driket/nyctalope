import React from 'react'
import { ColorScheme, Fonts } from '@nyctalope/core'

export const ThemeContext = React.createContext({
  prefersColorScheme: 'light',
  colors: ColorScheme.light,
  fonts: Fonts,
})

export default ThemeContext
