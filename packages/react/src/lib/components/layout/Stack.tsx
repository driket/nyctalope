/** @jsx jsx */
//eslint-disable import/first
import React from 'react';
import { jsx, css } from '@emotion/core';

type StackType = {
  children?: any;
  distribute?:
    | 'start'
    | 'end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  direction: 'horizontal' | 'vertical';
  reverse?: boolean;
  style?: any;
  gap?: number;
};

export const Stack = (props: StackType) => {
  const { direction = 'horizontal' } = props;
  const { reverse = false } = props;
  const { style = {} } = props;
  const { distribute = 'start' } = props;
  const { alignItems = 'center' } = props;
  const { gap = 10 } = props;
  return (
    <div
      css={stackStyle(direction, reverse, distribute, alignItems, gap)}
      style={style}
    >
      {props.children}
      {/* <span>direction={direction}</span>
      <span>flexDirection={getFlexDirection(direction, reverse)}</span>
      <span>reverse={reverse == true}</span>
      <span>distribute={distribute}</span>
      <span>flexDistribution={getFlexDistribution(distribute)}</span>
      <span>gap={gap}</span> */}
    </div>
  );
};

const stackStyle = (
  direction: string,
  reverse: boolean,
  distribute: string,
  alignItems: string,
  gap: number,
) => {
  const margin =
    direction == 'vertical' ? `margin-top:${gap}px` : `margin-left:${gap}px`;
  const shouldRenderGap =
    distribute == 'start' || distribute == 'end' || distribute == 'center';
  return css`
    /* allow padding */
    box-sizing: border-box;
    /* use CSS flexbox */
    display: flex;
    justify-content: ${getFlexDistribution(distribute)};
    align-items: ${alignItems};
    flex-direction: ${getFlexDirection(direction, reverse)};

    /* fullSize by default */
    width: 100%;
    height: 100%;
    min-height: 100%;
    & > * {
      &:not(:first-child) {
        ${shouldRenderGap ? margin : ''};
      }
    }
  `;
};

function getFlexDirection(direction: string, reverse: boolean): string {
  const flexDirection = direction == 'horizontal' ? 'row' : 'column';
  const flexDirectionWithReverse =
    reverse == false ? flexDirection : `${flexDirection}-reverse`;
  return flexDirectionWithReverse;
}

function getFlexDistribution(distribute: string) {
  const flexDistribution =
    distribute == 'start' || distribute == 'end'
      ? `flex-${distribute}`
      : distribute;
  return flexDistribution;
}

export default Stack;
