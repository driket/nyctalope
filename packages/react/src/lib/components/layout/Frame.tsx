import React, { useContext } from 'react'
import { ThemeContext } from '@nyctalope/core'

type FrameProps = {
  children?: any
  style?: any
}

export const Frame = (props: FrameProps) => {
  const { colors } = useContext(ThemeContext)
  const { style = {} } = props
  const combinedStyle = {
    background: colors.background,
    color: colors.main,
    ...style,
  }
  return <div style={combinedStyle}>{props.children}</div>
}

export default Frame
