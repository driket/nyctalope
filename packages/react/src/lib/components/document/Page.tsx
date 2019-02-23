/** @jsx jsx */
import React, { useContext } from 'react'
import { jsx, css } from '@emotion/core'
import { transparentize } from 'polished'
import { ThemeContext } from '@nyctalope/core'

export const Page = (props) => {
  const { colors, fonts } = useContext(ThemeContext)
  return (
    <div
      css={css`
        /* background-color: ${colors.background}; */
        color: ${transparentize(0.22, colors.main)};
        font-family: ${fonts.main};
        padding-bottom: 20px;
        h1, h2 {
            border-bottom: 1px solid ${transparentize(0.9, colors.main)};
            padding-bottom: 5px;
            color: ${transparentize(0.22, colors.main)};
        }
        a {
            color: ${colors.highlight};
            text-decoration: none;
        }
        h2, h3, h4, h5 {
            margin-top: 30px;
        }
        p {
          color: ${transparentize(0.22, colors.main)};
        }
      `}
    >
      {props.children}
    </div>
  )
}

export default Page
