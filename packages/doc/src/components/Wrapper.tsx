import React, { CSSProperties, useContext, SFC, ReactChildren } from 'react'
import { darken, transparentize, mix } from 'polished'
import {
  ColorScheme,
  Fonts,
  ThemeContext,
  ColorSchemeType,
} from '@nyctalope/core'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import * as NyctalopeComponents from '@nyctalope/react'
import * as NyctalopeDocComponents from '../components'

type WrapperProps = {
  bothColorSchemes: boolean
  checkerBoard: boolean
  children: any
}

export const Wrapper = (props) => {
  const currentColorScheme = useContext(ThemeContext)
  const { colors } = currentColorScheme
  const colorSchemes = props.bothColorSchemes
    ? ['dark', 'light']
    : [currentColorScheme.prefersColorScheme]
  const code = React.Children.toArray(props.children).join('\n')
  return (
    <div style={wrapperStyle}>
      <LiveProvider
        code={code}
        scope={{ ...NyctalopeComponents, ...NyctalopeDocComponents }}
        style={{ width: '100%' }}
      >
        <Canvas {...props} style={canvasStyle()}>
          {colorSchemes.map((theme, index) => {
            const wrapperTheme = {
              prefersColorScheme: theme,
              colors: ColorScheme[theme],
              fonts: Fonts,
            }
            return (
              <ThemeContext.Provider value={wrapperTheme}>
                <CheckerBoard {...props}>
                  <LivePreview />
                </CheckerBoard>
              </ThemeContext.Provider>
            )
          })}
          <LiveEditor style={liveEditorStyle(colors)} />
          <LiveError style={liveErrorStyle(colors)} />
        </Canvas>
      </LiveProvider>
    </div>
  )
}

type CanvasProps = {
  style: CSSProperties
  children: any
  checkerBoard: boolean
}

const Canvas = (props: CanvasProps) => {
  const { colors } = useContext(ThemeContext)
  const canvasBGStyle = {
    border: `1px solid ${mix(0.97, colors.background, colors.main)}`,
    padding: '0px',
    ...props.style,
  }
  return <div style={canvasBGStyle}>{props.children}</div>
}

const CheckerBoard = (props) => {
  const { colors } = useContext(ThemeContext)
  const { checkerBoard = true } = props
  const backgroundColor = colors.background
  const alternateBackgroundColor = darken(0.05, backgroundColor)

  const backgroundStyle = {
    ...baseBackgroundStyle(colors),
    ...(checkerBoard == true
      ? checkerBackgroundStyle(
          backgroundColor,
          alternateBackgroundColor,
          colors,
        )
      : {}),
  }
  return <div style={backgroundStyle}>{props.children}</div>
}

const canvasStyle = () =>
  ({
    borderRadius: '2px',
    boxShadow: '0px 10px 20px rgba(0,0,0,0.1)',
    width: '100%',
  } as CSSProperties)

const wrapperStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'start',
}

const liveEditorStyle = (colors: ColorSchemeType) =>
  ({
    backgroundColor: mix(0.97, colors.background, colors.main),
    color: colors.main,
    overflow: 'scroll',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    padding: '20px',
  } as CSSProperties)

const liveErrorStyle = (colors: ColorSchemeType) =>
  ({
    backgroundColor: colors.danger,
    color: 'white',
    fontSize: '12px',
    padding: '10px',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
  } as CSSProperties)

const baseBackgroundStyle = (colors: ColorSchemeType) =>
  ({
    padding: '20px',
    backgroundColor: colors.background,
    color: colors.main,
    height: 'calc(100% - 20px)',
  } as CSSProperties)

const mozCheckerBackgroundStyle = (
  backgroundColor: string,
  alternateBackgroundColor: string,
) =>
  ({
    backgroundImage: `
      -moz-linear-gradient(
        45deg,
        ${alternateBackgroundColor} 25%,
        transparent 25%
      ),
      -moz-linear-gradient(
        -45deg,
        ${alternateBackgroundColor} 25%,
        transparent 25%
      ),
      -moz-linear-gradient(
        45deg,
        transparent 75%,
        ${alternateBackgroundColor} 75%
      ),
      -moz-linear-gradient(
        -45deg,
        transparent 75%,
        ${alternateBackgroundColor} 75%
      )
      `,
  } as CSSProperties)

const webkitCheckerBackgroundStyle = (
  backgroundColor: string,
  alternateBackgroundColor: string,
) =>
  ({
    backgroundImage: `
      -webkit-gradient(
        linear,
        0 100%,
        100% 0,
        color-stop(0.25, ${alternateBackgroundColor}),
        color-stop(0.25, transparent)
      ),
      -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0.25, ${alternateBackgroundColor}), color-stop(0.25, transparent)),
      -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.75, transparent), color-stop(0.75, ${alternateBackgroundColor})),
      -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0.75, transparent), color-stop(0.75, ${alternateBackgroundColor}))
    `,
  } as CSSProperties)

const checkerBackgroundStyle = (
  backgroundColor: string,
  alternateBackgroundColor: string,
  colors: ColorSchemeType,
) =>
  ({
    backgroundColor: backgroundColor,
    ...mozCheckerBackgroundStyle(backgroundColor, alternateBackgroundColor),
    ...webkitCheckerBackgroundStyle(backgroundColor, alternateBackgroundColor),
    backgroundSize: '20px 20px',
    color: colors.main,
    backgroundPosition: '0 0, 10px 0, 10px -10px, 0px 10px',
  } as CSSProperties)

export default Wrapper
