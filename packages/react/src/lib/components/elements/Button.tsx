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
import { mix, transparentize } from 'polished'

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
  const { type = 'default' } = props
  const { size = 'md' } = props
  const combinedStyle = {
    ...baseButtonStyle(colors, isHovered, active),
    ...buttonStyleTypes(colors, isHovered, active)[type],
    ...buttonStyleSizes[size],
    ...style,
  }
  console.log('combinedStyle: ', combinedStyle)
  console.log('type: ', type)
  return (
    <button
      onMouseDownCapture={() => setActive(true)}
      onMouseUpCapture={() => setActive(false)}
      onMouseLeave={() => setActive(false)}
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
    /* borders */
    borderStyle: 'solid',
    borderRadius: '0.4em',

    /* font */
    fontWeight: '500',

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

    border: 'none',

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

interface ButtonStyleTypesInterface {
  default: object
  primary: object
  secondary: object
  danger: object
  ghost: object
}

const buttonStyleTypes = (
  colors: ColorSchemeType,
  isHovered: boolean,
  isActive: boolean,
): ButtonStyleTypesInterface => {
  return {
    default: {
      backgroundColor: isActive
        ? mix(0.85, colors.lighterGrey, colors.main)
        : colors.lighterGrey,
      color: colors.main,
    },
    primary: {
      backgroundColor: isActive
        ? mix(0.85, colors.highlight, 'white')
        : colors.highlight,
      color: 'white',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: isActive
        ? mix(0.65, colors.main, colors.background)
        : isHovered
        ? mix(0.85, colors.main, colors.background)
        : colors.main,
      boxShadow: `inset 0px 0px 0px 1px ${transparentize(0.5, colors.main)}`,
    },
    danger: {
      backgroundColor: isActive
        ? mix(0.85, colors.danger, 'white')
        : colors.danger,
      color: 'white',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: isActive
        ? mix(0.65, colors.main, colors.background)
        : isHovered
        ? mix(0.85, colors.main, colors.background)
        : colors.main,
      boxShadow: 'none',
    },
  }
}

interface ButtonStyleSizesInterface {
  xs: object
  sm: object
  md: object
  lg: object
}

const buttonStyleSizes: ButtonStyleSizesInterface = {
  xs: {
    fontSize: '0.4em',
    borderWidth: '1px',
    padding: '3px 8px',
  },
  sm: {
    fontSize: '0.6em',
    borderWidth: '2px',
    padding: '3px 12px',
  },
  md: {
    fontSize: '0.7em',
    borderWidth: '2px',
    padding: '4px 12px',
  },
  lg: {
    fontSize: '0.9em',
    borderWidth: '2px',
    padding: '5px 16px',
  },
}

export default Button
