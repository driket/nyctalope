/** @jsx jsx */
import React, { useContext } from 'react'
import { darken, transparentize } from 'polished'
import { jsx, css, SerializedStyles } from '@emotion/core'
import { ThemeContext } from '@nyctalope/core'
import { ColorScheme, Fonts } from '@nyctalope/core'

type WrapperProps = {
  colorSchemeSeparatorDirection: 'vertical' | 'horizontal'
  minHeight: string
  bothColorSchemes: boolean
  checkerBoard: boolean
  children: any
}

export const Wrapper = (props: WrapperProps) => {
  const { colorSchemeSeparatorDirection = 'vertical' } = props
  const { minHeight } = props
  const currentColorScheme = useContext(ThemeContext)
  const colorSchemes = props.bothColorSchemes
    ? ['dark', 'light']
    : [currentColorScheme.prefersColorScheme]
  const styleHeight = minHeight
    ? css`
        min-height: ${minHeight};
      `
    : css``
  const styleWidth =
    colorSchemeSeparatorDirection == 'horizontal'
      ? css`
          width: 50%;
          &:first-child {
            margin-right: 20px;
          }
        `
      : css`
          width: 100%;
        `
  const style = [styleWidth, styleHeight]
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
      `}
    >
      {colorSchemes.map((theme) => {
        const wrapperTheme = {
          prefersColorScheme: theme,
          colors: ColorScheme[theme],
          fonts: Fonts,
        }
        console.log('wrapperTheme:', wrapperTheme)
        return (
          <ThemeContext.Provider value={wrapperTheme}>
            <StoryRenderBackground darkMode={theme} css={style} {...props}>
              {props.children}
            </StoryRenderBackground>
          </ThemeContext.Provider>
        )
      })}
    </div>
  )
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

const CheckerBoard = (props) => {
  const { colors } = useContext(ThemeContext)
  const { themedBackgroundColor = 'background' } = props
  const { checkerBoard = false } = props
  const backgroundColor = colors[themedBackgroundColor]
  const alternateBackgroundColor = darken(0.05, backgroundColor)
  const baseBackgroundStyle = css`
    padding: 10px;
    background-color: ${backgroundColor};
    color: ${colors.main};
    height: calc(100% - 20px);
  `
  const checkerBackgroundStyle = checkerBoard
    ? css`
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
    : css``
  const backgroundStyle = [baseBackgroundStyle, checkerBackgroundStyle]

  return <div css={[backgroundStyle]}>{props.children}</div>
}

export default Wrapper
