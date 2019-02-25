/** @jsx jsx */
/* eslint-disable import/first */
import { Component, ReactChildren, useContext } from 'react'
import { ThemeContext } from '@nyctalope/core'
import { jsx, css } from '@emotion/core'

type FrameProps = {
  children: any
}

export const Frame = (props: FrameProps) => {
  const { colors } = useContext(ThemeContext)
  const frameStyle = css`
    background: ${colors.background};
    color: ${colors.main};
  `
  return <div css={frameStyle}>{props.children}</div>
}

export default Frame
