import React, {
  useContext,
  CSSProperties,
  ReactChildren,
  ReactElement,
  SFC,
} from 'react'
import { ThemeContext } from '@nyctalope/core'
import {
  legendSegmentStyle,
  pillStyle,
  legendStyle,
  pillSegmentStyle,
} from './Pill.style'

type PillProps = {
  value: number
  title: string
  themedcolor: string
  showLegend: boolean
  size: string
  style: any
  children: any
}

export const Pill = (props: PillProps) => {
  const { colors } = useContext(ThemeContext)
  const totalSegmentsValue = sumSegmentsValue(props.children)
  return (
    <div {...props} style={{ width: '100%' }}>
      <div style={pillStyle} {...props}>
        {React.Children.map(props.children, (segment) => (
          <PillSegment
            {...segment.props}
            size={(segment.props.value / totalSegmentsValue) * 100 + '%'}
          />
        ))}
      </div>
      {props.showLegend && (
        <div style={legendStyle(colors.grey)}>
          {React.Children.map(props.children, (segment) => (
            <div style={{ display: 'flex' }}>
              <div
                style={legendSegmentStyle(colors[segment.props.themedColor])}
              />
              {segment.props.title}: {segment.props.value}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

type PillSegmentProps = {
  value: number
  title: string
  themedColor: string
  size: string
  style: any
}

export const PillSegment: SFC<PillSegmentProps> = (props: PillSegmentProps) => {
  const { colors } = useContext(ThemeContext)
  const { themedColor } = props || 'main'
  const { size } = props || '33.33%'
  const processedColor = colors[themedColor]
  return <div style={pillSegmentStyle(size, processedColor)} {...props} />
}

const sumSegmentsValue = (segments): number => {
  return React.Children.toArray(segments).reduce(
    (previousValue, currentValue) => {
      if (typeof currentValue === 'object') {
        return previousValue + currentValue.props.value
      } else {
        return previousValue
      }
    },
    0,
  )
}

export default Pill
