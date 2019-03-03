import React, { CSSProperties, useContext, SFC, ReactChildren } from 'react'
import { darken, transparentize, mix } from 'polished'
import { ColorScheme, Fonts, ThemeContext } from '@nyctalope/core'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import reactElementToJSXString from 'react-element-to-jsx-string'
import * as NyctalopeComponents from '@nyctalope/react'
import * as NyctalopeDocComponents from '../components'

type WrapperProps = {
  colorSchemeSeparatorDirection: 'vertical' | 'horizontal'
  minHeight: string
  bothColorSchemes: boolean
  checkerBoard: boolean
  children: any
}

export const Wrapper = (props) => {
  const { colorSchemeSeparatorDirection = 'vertical' } = props
  const { minHeight } = props
  const currentColorScheme = useContext(ThemeContext)
  const { colors } = currentColorScheme
  const colorSchemes = props.bothColorSchemes
    ? ['dark', 'light']
    : [currentColorScheme.prefersColorScheme]
  const wrapperStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'start',
  }
  const code = reactElementToJSXString(props.children)
  // const code =
  // "<Stack distribute='start'>\n    {['default', 'primary', 'secondary', 'ghost', 'danger'].map((type) => (\n      <Button type={type}>\n        {type.charAt(0).toUpperCase() + type.slice(1)}\n      </Button>\n    ))}\n  </Stack>\n  "
  const canvasStyle: CSSProperties = {
    minHeight: minHeight ? minHeight : 'initial',
    width:
      colorSchemeSeparatorDirection == 'horizontal'
        ? 'calc(100% - 30px)'
        : 'calc(100% - 30px)',
    // marginLeft: index == 1 ? '20px' : '0px',
  }
  const checkerBoardStyle: CSSProperties = {}
  return (
    <div style={wrapperStyle}>
      <LiveProvider
        code={code}
        scope={{ ...NyctalopeComponents, ...NyctalopeDocComponents }}
        style={{ width: '100%' }}
      >
        <Canvas {...props} style={canvasStyle}>
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
          <LiveEditor
            style={{
              backgroundColor: mix(0.97, colors.background, colors.main),
              color: colors.main,
            }}
          />
          <LiveError />
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
    border: `1px solid ${colors.lighterGrey}`,
    padding: '15px',
    ...props.style,
  }
  return <div style={canvasBGStyle}>{props.children}</div>
}

const CheckerBoard = (props) => {
  const { colors } = useContext(ThemeContext)
  const { checkerBoard = false } = props
  const backgroundColor = colors.background
  const alternateBackgroundColor = darken(0.05, backgroundColor)
  const baseBackgroundStyle = {
    padding: '10px',
    backgroundColor: backgroundColor,
    color: colors.main,
    height: 'calc(100% - 20px)',
  }
  const mozCheckerBackgroundStyle: CSSProperties = {
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
  }
  const webkitCheckerBackgroundStyle: CSSProperties = {
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
  }

  const checkerBackgroundStyle: CSSProperties = {
    backgroundColor: backgroundColor,
    ...(checkerBoard ? mozCheckerBackgroundStyle : {}),
    ...(checkerBoard ? webkitCheckerBackgroundStyle : {}),
    backgroundSize: '20px 20px',
    color: colors.main,
    backgroundPosition: '0 0, 10px 0, 10px -10px, 0px 10px',
  }

  const backgroundStyle = {
    ...baseBackgroundStyle,
    ...checkerBackgroundStyle,
  }
  return <div style={backgroundStyle}>{props.children}</div>
}

export default Wrapper
