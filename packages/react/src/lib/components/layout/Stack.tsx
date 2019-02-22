/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'

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
  gap?: number
}

export const Stack = (props: StackType) => {
  return <div css={stackStyle(props)}>{props.children}</div>
}

const stackStyle = (props: StackType) => {
  const margin =
    props.direction == 'vertical'
      ? `margin-top:${props.gap}px`
      : `margin-left:${props.gap}px`
  const shouldRenderGap =
    props.distribute == 'start' ||
    props.distribute == 'end' ||
    props.distribute == 'center'
  return css`
    /* allow padding */
    box-sizing: border-box;
    /* use CSS flexbox */
    display: flex;
    justify-content: ${getFlexDistribution(props.distribute!)};
    align-items: ${props.alignItems};
    flex-direction: ${getFlexDirection(props.direction, props.reverse!)};

    /* fullSize by default */
    width: 100%;
    height: 100%;
    min-height: 100%;

    & > * {
      &:not(:first-child) {
        ${shouldRenderGap ? margin : ''};
      }
    }
  `
}

Stack.defaultProps = {
  distribute: 'start',
  direction: 'horizontal',
  reverse: false,
  alignItems: 'center',
  gap: 10,
}

function getFlexDirection(direction: string, reverse: boolean): string {
  let flexDirection = ''
  if (direction == 'horizontal') {
    flexDirection = 'row'
  } else {
    flexDirection = 'column'
  }
  flexDirection = flexDirection + reverse ? '-reverse' : ''
  return flexDirection
}

function getFlexDistribution(distribute: string) {
  if (distribute == 'start' || distribute == 'end') {
    return 'flex-' + distribute
  } else {
    return distribute
  }
}

export default Stack
