/** @jsx jsx */
import React, { useContext } from 'react'
import { css, jsx } from '@emotion/core'
import { ThemeContext } from '@nyctalope/core'

export const ColorDot = (props) => {
  const { colors } = useContext(ThemeContext)
  const { themedColor } = props || 'main'
  const processedColor = colors[themedColor]
  return (
    <div
      css={css`
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        background-color: ${processedColor};
      `}
      {...props}
    />
  )
}

export const ColorPalette = (props) => {
  const { colors } = useContext(ThemeContext)
  console.log('colors:', colors)

  const { themedColor } = props || 'main'
  const processedColor = colors[themedColor]
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        border: 1px solid ${colors.lighterGrey};
        /* margin-bottom: 10px; */
        width: 100px;
      `}
    >
      <div
        css={css`
          display: block;
          width: 100px;
          height: 100px;
          background-color: ${processedColor};
        `}
        {...props}
      />

      <div
        css={css`
          color: ${colors.main};
          font-size: 11px;
          padding: 10px;
          background-color: ${colors.background};
        `}
      >
        <b>{themedColor}</b>
        <br />
        {processedColor}
      </div>
    </div>
  )
}

export default ColorDot
