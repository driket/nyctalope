import React, { useContext } from 'react'
import { ThemeContext } from '@nyctalope/core'

type FrameProps = {
  children: any
  style: any
}

export const Frame = (props: FrameProps) => {
  const { colors } = useContext(ThemeContext)
  const style = {
    background: colors.background,
    color: colors.main,
    ...props.style,
  }
  return <div style={props.style}>{props.children}</div>
}

export default Frame
