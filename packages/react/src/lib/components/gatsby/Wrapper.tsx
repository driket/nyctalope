/** @jsx jsx */
import React, { useContext } from 'react'
import { darken, transparentize } from 'polished'
import { jsx, css, SerializedStyles } from '@emotion/core'
import ThemeContext from '../../context/ThemeContext'
import { ColorScheme, Fonts } from '@nyctalope/core'

const CheckerBoard = (props) => {
  const { colors } = useContext(ThemeContext)
  const { themedBackgroundColor = 'background' } = props
  const { checkerBoard = false } = props
  const backgroundColor = colors[themedBackgroundColor]
  const alternateBackgroundColor = darken(0.05, backgroundColor)
  let backgroundStyle
  if (!checkerBoard) {
    backgroundStyle = css`
      padding: 10px;
      background-color: ${backgroundColor};
      color: ${colors.main};
    `
  } else {
    backgroundStyle = css`
      padding: 10px;
      background-color: ${backgroundColor};
      background-image: -moz-linear-gradient(
          45deg,
          ${alternateBackgroundColor} 25%,
          transparent 25%
        ),
        -moz-linear-gradient(-45deg, ${alternateBackgroundColor} 25%, transparent
              25%),
        -moz-linear-gradient(45deg, transparent 75%, ${alternateBackgroundColor}
              75%),
        -moz-linear-gradient(-45deg, transparent 75%, ${alternateBackgroundColor}
              75%);
      background-image: -webkit-gradient(
          linear,
          0 100%,
          100% 0,
          color-stop(0.25, ${alternateBackgroundColor}),
          color-stop(0.25, transparent)
        ),
        -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0.25, ${alternateBackgroundColor}), color-stop(0.25, transparent)),
        -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.75, transparent), color-stop(0.75, ${alternateBackgroundColor})),
        -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0.75, transparent), color-stop(0.75, ${alternateBackgroundColor}));
      -moz-background-size: 20px 20px;
      background-size: 20px 20px;
      -webkit-background-size: 20px 21px; /* override value for shitty webkit */
      background-position: 0 0, 10px 0, 10px -10px, 0px 10px;
      color: ${colors.main};
    `
  }
  return <div css={backgroundStyle}>{props.children}</div>
}

const StoryRenderBackground = (props) => {
  const { colors } = useContext(ThemeContext)
  return (
    <div
      css={css`
        border: 1px solid ${colors.lighterGrey};
        padding: 15px;
      `}
      {...props}
    >
      <CheckerBoard {...props}>{props.children}</CheckerBoard>
    </div>
  )
}

export default function Wrapper(props) {
  const { colorSchemeSeparatorDirection = 'vertical' } = props
  let colorSchemes
  if (props.bothColorSchemes) {
    colorSchemes = ['dark', 'light']
  } else {
    const currentColorScheme = useContext(ThemeContext)
    colorSchemes = [currentColorScheme.prefersColorScheme]
  }
  let style
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
      {colorSchemes.map((theme) => (
        <ThemeContext.Provider
          value={{
            prefersColorScheme: theme,
            colors: ColorScheme[theme],
            fonts: Fonts,
          }}
        >
          <StoryRenderBackground darkMode={theme} css={style} {...props}>
            {props.children}
          </StoryRenderBackground>
        </ThemeContext.Provider>
      ))}
    </div>
  )
}
