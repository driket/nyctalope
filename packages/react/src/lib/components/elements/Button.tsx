import React, {
  useContext,
  useState,
  MouseEventHandler,
  HTMLAttributes,
  SFC,
  RefObject,
} from 'react'
import { ThemeContext, ColorSchemeType } from '@nyctalope/core'
import useHover from '../../hooks/use-hover'
import { mix } from 'polished'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  handleClick?: MouseEventHandler
  type?: 'default' | 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  children?: any
  icon?: string
  direction?: 'vertical' | 'horizontal'
  style?: any
  iconSpacing?: number
}

export const Button: SFC<ButtonProps> = (props: ButtonProps) => {
  const [hoverRef, isHovered] = useHover()
  const [active, setActive] = useState(false)
  const { colors } = useContext(ThemeContext)
  const { style = {} } = props
  const combinedStyle = {
    ...baseButtonStyle(colors, isHovered, active),
    ...style,
  }
  return (
    <button
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      ref={hoverRef}
      style={combinedStyle}
    >
      {props.children}
    </button>
  )
}

const baseButtonStyle = (
  colors: ColorSchemeType,
  isHovered: boolean,
  isActive: boolean,
) => {
  return {
    /* reset */
    // margin: '0',

    /* borders */
    borderStyle: 'solid',
    borderRadius: '0.4em',

    /* font */
    fontWeight: '600',

    /* don't select text */
    userSelect: 'none',

    /* don't wrap icon/text */
    whiteSpace: 'nowrap',

    /* chrome outline fix */
    outline: '0',

    /* add shine and shadow */
    boxShadow: [
      `0px ${1}px ${1}px rgba(0,0,0,0.4)`,
      `inset 0px ${1}px ${1}px rgba(255,255,255,0.1)`,
    ],

    fontSize: '0.7em',
    borderWidth: '2px',
    padding: '4px 12px',

    /* background */
    backgroundColor: isActive
      ? mix(0.85, colors.highlight, 'white')
      : isHovered
      ? mix(0.95, colors.highlight, 'white')
      : colors.highlight,
    border: 'none',
    color: 'white',

    // /* icon */
    // & .feather {
    //     position: relative;
    //     display: block;
    // }
    // & span {
    //     position: relative;
    //     display: block;
    // }
  }
}

export default Button
