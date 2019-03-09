import React, {
  useContext,
  useState,
  MouseEventHandler,
  HTMLAttributes,
  SFC,
  RefObject,
} from 'react';

import { ThemeContext, ColorSchemeType } from '@nyctalope/core';
import { Icon } from './Icon';
import { Stack } from '../layout/Stack';
import useHover from '../../hooks/use-hover';
import { mix, transparentize } from 'polished';

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  handleClick?: MouseEventHandler;
  type: 'default' | 'primary' | 'secondary' | 'danger' | 'ghost';
  size: 'xs' | 'sm' | 'md' | 'lg';
  children?: any;
  icon?: string;
  direction: 'vertical' | 'horizontal';
  style?: any;
  iconSpacing?: number;
};

export const Button: SFC<ButtonProps> = (props: ButtonProps) => {
  const [hoverRef, isHovered] = useHover();
  const [active, setActive] = useState(false);
  const { colors } = useContext(ThemeContext);
  const { style, type, size, direction } = props;
  const combinedStyle = {
    ...baseButtonStyle(colors, isHovered, active),
    ...buttonStyleTypes(colors, isHovered, active)[type],
    ...buttonStyleSizes(direction)[size]['button'],
    ...style,
  };
  const iconStyle = {
    ...buttonStyleSizes(direction)[size]['icon'],
  };
  return (
    <button
      onMouseDownCapture={() => setActive(true)}
      onMouseUpCapture={() => setActive(false)}
      onMouseLeave={() => setActive(false)}
      ref={hoverRef}
      style={combinedStyle}
    >
      <Stack
        direction={direction}
        distribute='center'
        gap={buttonStyleSizes(direction)[size]['gap']}
      >
        {props.icon && <Icon icon={props.icon} style={iconStyle} />}
        {props.children && <span>{props.children}</span>}
      </Stack>
    </button>
  );
};

Button.defaultProps = {
  type: 'default',
  style: {},
  size: 'md',
  direction: 'horizontal',
};

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
    /* userSelect: 'none', */
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none',

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
  };
};

interface ButtonStyleTypesInterface {
  default: object;
  primary: object;
  secondary: object;
  danger: object;
  ghost: object;
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
      color: colors.main,
      backgroundColor: isActive
        ? transparentize(0.95, colors.main)
        : 'transparent',
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
      color: isActive ? colors.highlight : colors.main,
      boxShadow: 'none',
    },
  };
};

type StyledItems = {
  button: object;
  icon: object;
  gap: number;
};
type ButtonStyleSizesInterface = {
  xs: StyledItems;
  sm: StyledItems;
  md: StyledItems;
  lg: StyledItems;
};

const buttonStyleSizes = (direction): ButtonStyleSizesInterface => {
  return {
    xs: {
      button: {
        fontSize: '0.4em',
        borderWidth: '1px',
        padding: '3px 8px',
      },
      icon: {
        height: '10px',
        width: '10px',
      },
      gap: direction == 'horizontal' ? 2 : 2,
    },
    sm: {
      button: {
        fontSize: '0.6em',
        borderWidth: '2px',
        padding: '3px 12px',
      },
      icon: {
        height: '12px',
        width: '12px',
      },
      gap: direction == 'horizontal' ? 4 : 2,
    },
    md: {
      button: {
        fontSize: '0.7em',
        borderWidth: '2px',
        padding: '4px 12px',
      },
      icon: {
        height: '14px',
        width: '14px',
      },
      gap: direction == 'horizontal' ? 6 : 2,
    },
    lg: {
      button: {
        fontSize: direction == 'horizontal' ? '0.9em' : '0.7em',
        borderWidth: '2px',
        padding: '5px 16px',
      },
      icon: {
        height: '20px',
        width: '20px',
      },
      gap: direction == 'horizontal' ? 8 : 2,
    },
  };
};

export default Button;
