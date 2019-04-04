import React, { useContext, SFC, CSSProperties } from 'react';
import { ThemeContext } from '@nyctalope/core';
import { PillStyle } from './Pill.style';

export type PillProps = {
  value: number;
  title: string;
  themedcolor: string;
  showLegend?: boolean;
  style: CSSProperties;
  legendStyle: CSSProperties;
  children: any;
};

export const Pill: SFC<PillProps> = (props: PillProps) => {
  const { colors } = useContext(ThemeContext);
  const { style, legendStyle } = props;
  const totalSegmentsValue = sumSegmentsValue(props.children);
  return (
    <div {...props} style={{ width: '100%' }}>
      <div style={{ ...PillStyle.pillStyle, ...style }} {...props}>
        {React.Children.map(props.children, (segment) => (
          <PillSegment
            {...segment.props}
            size={(segment.props.value / totalSegmentsValue) * 100 + '%'}
          />
        ))}
      </div>
      {props.showLegend && (
        <div style={{ ...PillStyle.legendStyle(colors.grey), ...legendStyle }}>
          {React.Children.map(props.children, (segment) => (
            <div style={{ display: 'flex' }}>
              <div
                style={PillStyle.legendSegmentStyle(
                  colors[segment.props.themedColor],
                )}
              />
              {segment.props.title}: {segment.props.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Pill.defaultProps = {
  legendStyle: {},
  style: {},
  showLegend: false,
};

type PillSegmentProps = {
  value: number;
  title: string;
  themedColor: string;
  size: string;
  style: any;
};

export const PillSegment: SFC<PillSegmentProps> = (props: PillSegmentProps) => {
  const { colors } = useContext(ThemeContext);
  const { themedColor } = props || 'main';
  const { size } = props || '33.33%';
  const { style = {} } = props;
  const processedColor = colors[themedColor];
  return (
    <div
      {...props}
      style={{ ...PillStyle.pillSegmentStyle(size, processedColor), ...style }}
    />
  );
};

const sumSegmentsValue = (segments): number => {
  return React.Children.toArray(segments).reduce(
    (previousValue, currentValue) => {
      if (typeof currentValue === 'object') {
        return previousValue + currentValue.props.value;
      } else {
        return previousValue;
      }
    },
    0,
  );
};

export default Pill;
export { PillStyle };
