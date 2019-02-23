/** @jsx jsx */
import { Component, ReactChildren, useContext } from 'react'
import { ThemeContext } from '@nyctalope/core'
import { jsx, css } from '@emotion/core'

export const Frame = (props) => {
  const { colors } = useContext(ThemeContext)
  const frameStyle = css`
    background: ${colors.background};
    color: ${colors.main};
  `
  return <div css={frameStyle}>Frame</div>
}

export default Frame
