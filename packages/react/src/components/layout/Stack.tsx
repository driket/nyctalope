/** @jsx jsx */
import React, {
  StatelessComponent,
  ReactChild,
  ReactChildren,
  CSSProperties,
} from 'react'
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'

type StackType = {
  children?: any
  distribute?:
    | 'start'
    | 'end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  alignItems?: 'start' | 'center' | 'end' | 'stretch'
  direction: 'horizontal' | 'vertical'
  reverse?: boolean
  style?: any
}

type StackTypeDistributed = StackType
type StackTypeInline = StackType & {
  gap?: number
}

function getFlexDirection(
  props: StackTypeDistributed | StackTypeInline,
): string {
  let flexDirection = ''
  if (props.direction == 'horizontal') {
    flexDirection = 'row'
  } else {
    flexDirection = 'column'
  }
  if (props.reverse) {
    flexDirection = flexDirection + '-reverse'
  }
  return flexDirection
}

function getFlexDistribution(props: StackTypeDistributed | StackTypeInline) {
  if (props.distribute == 'start' || props.distribute == 'end') {
    return 'flex-' + props.distribute
  } else {
    return props.distribute
  }
}

const StackInline: StatelessComponent<StackTypeInline> = (
  props: StackTypeInline,
) => <StyledStackInline {...props}>{props.children}</StyledStackInline>

const StackDistributed: StatelessComponent<StackTypeDistributed> = (
  props: StackTypeDistributed,
) => (
  <StyledStackDistributed {...props}>{props.children}</StyledStackDistributed>
)

export const Stack = (
  props: { distribute: string } & (StackTypeInline | StackTypeDistributed),
) => {
  const { distribute, ...rest } = props
  if (distribute == 'start' || distribute == 'end' || distribute == 'center') {
    return (
      <StackInline distribute={distribute} {...rest as StackTypeInline}>
        {props.children}
      </StackInline>
    )
  } else {
    return (
      <StackDistributed
        distribute={distribute}
        {...rest as StackTypeDistributed}
      >
        {props.children}
      </StackDistributed>
    )
  }
}

const StyledStackDistributed = styled.div<StackTypeDistributed>`
  /* allow padding */
  box-sizing: border-box;

  /* use CSS flexbox */
  display: flex;
  justify-content: ${(props) => getFlexDistribution(props)};
  align-items: ${(props) => props.alignItems};
  flex-direction: ${(props) => getFlexDirection(props)};

  /* fullSize by default */
  width: 100%;
  height: 100%;
  min-height: 100%;
`

const StyledStackInline = styled(StyledStackDistributed)<StackTypeInline>`
  & > * {
    &:not(:first-child) {
      ${(props) =>
        props.direction == 'vertical' ? 'margin-top' : 'margin-left'}: ${(
        props,
      ) => props.gap}px;
    }
  }
`

Stack.defaultProps = {
  distribute: 'start',
  direction: 'horizontal',
  reverse: false,
  alignItems: 'center',
}

StackInline.defaultProps = {
  distribute: 'start',
  direction: 'horizontal',
  reverse: false,
  alignItems: 'center',
  gap: 10,
}

export default Stack
