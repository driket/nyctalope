/** @jsx jsx */
/* eslint-disable import/first */
import React, { useContext } from 'react'
import { css, jsx } from '@emotion/core'
import { ThemeContext } from '@nyctalope/core'

type PillSegmentType = {
  value: number
  title: string
  color: string
  size: string
}

type PillType = {
  value: number
  title: string
  color: string
  size: string
}

export const PillSegment = (props) => {
  const { colors } = useContext(ThemeContext)
  const { value } = props || 0
  const { title } = props || ''
  const { themedColor } = props || 'main'
  const { size } = props || '33.33%'
  const processedColor = colors[themedColor]
  return (
    <div
      css={css`
        display: block;
        width: ${size};
        background-color: ${processedColor};
        height: 30px;
      `}
      {...props}
    />
  )
}

export const Pill = (props) => {
  const { colors } = useContext(ThemeContext)
  const totalSegmentsValue = React.Children.toArray(props.children).reduce(
    (previousValue, currentValue) => {
      if (typeof currentValue === 'object') {
        return previousValue + currentValue.props.value
      } else {
        return previousValue
      }
    },
    0,
  ) as number
  // const totalSegmentsValue = 10;
  console.log('props:', props)
  console.log('totalSegmentsValue', totalSegmentsValue)
  const sizedSegment = React.Children.map(props.children, (child) => {
    return {
      ...child,
      props: {
        ...child.props,
        size: (child.props.value / totalSegmentsValue) * 100 + '%',
      },
    }
    // return (
    //     <div>{child}</div>
    // )
  })
  const legend = props.showLegend && (
    <div
      css={css`
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        margin-top: 20px;
        color: ${colors.grey};
        font-size: 12px;
      `}
    >
      {sizedSegment.map((segment) => {
        return (
          <div
            css={css`
              display: flex;
            `}
          >
            <div
              css={css`
                background-color: ${colors[segment.props.themedColor]};
                width: 8px;
                height: 8px;
                border-radius: 8px;
                margin-top: 6px;
                margin-right: 6px;
              `}
            />
            {segment.props.title}: {segment.props.value}
          </div>
        )
      })}
    </div>
  )
  return (
    <div
      {...props}
      css={css`
        width: 100%;
      `}
    >
      <div
        css={css`
          /* background-color: blue; */
          height: 30px;
          border-radius: 150px;
          padding: 0px;
          overflow: hidden;
          width: 100%;
          display: flex;
        `}
        {...props}
      >
        {sizedSegment.map((segment) => {
          console.log(segment)
          return segment
        })}
      </div>
      {legend}
    </div>
  )
}

export default Pill
