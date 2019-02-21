/** @jsx jsx */
import React from 'react'
import { jsx, css, SerializedStyles } from '@emotion/core'

export default function Wrapper(props) {
  const { colorSchemeSeparatorDirection = 'vertical' } = props
  const colorSchemes = ['dark', 'light']
  let style: SerializedStyles
  if (colorSchemeSeparatorDirection == 'horizontal') {
    style = css`
      width: 50%;
      &:first-child {
        margin-right: 20px;
      }
    `
  } else {
    style = css`
      width: 100%;
    `
  }
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
      `}
    >
      {props.children}
    </div>
  )
}
