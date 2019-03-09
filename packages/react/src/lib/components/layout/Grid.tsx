import React, { Component, ReactChildren } from 'react';
import { ScreenSizes, ScreenSizesType } from '@nyctalope/core';
import { useMedia } from '../../hooks/use-media';

/**
 * Grid properties
 */
interface GridProps {
  /* Number of columns */
  numCol: number;
  /* Number of columns displayed on a XS sized screen.*/
  numColXS?: number;
  /* Number of columns displayed on a SM sized screen.
  Will be used for smaller screen sizes if they are not set */
  numColSM?: number;
  /* Number of columns displayed on a MD sized screen.
  Will be used for smaller screen sizes if they arenot set */
  numColMD?: number;
  /* Number of columns displayed on a LG sized screen.
  Will be used for smaller screen sizes if they arenot set */
  numColLG?: number;
  /* Number of columns displayed on a XL sized screen.
  Will be used for smaller screen sizes if they arenot set */
  numColXL?: number;
  /* Grid cells as children */
  children: any;
  /* Custom style */
  style: any;
  /* Gap between columns */
  gridGap?: string;
}

/**
 * Grid component
 * @param props GridProps
 */
export const Grid = (props: GridProps) => {
  const numColForSizes = getNumColForScreenSizes(props);
  const { gridGap = '10px' } = props;
  const propStyle = props.style || {};
  const columns = React.Children.toArray(props.children);

  const sizes = Object.entries(ScreenSizes);
  let colForSizesStyle = {};
  sizes.map((size, index) => {
    let currentSize = ScreenSizes[size[0]];
    if (size[0] == 'xl') {
      if (useMedia(`screen and (min-width: ${currentSize}px)`)) {
        colForSizesStyle = {
          gridTemplateColumns: `repeat(${numColForSizes[size[0]]}, 1fr)`,
        };
      }
    } else {
      const nextBiggerSize = ScreenSizes[sizes[index + 1][0]];
      if (
        useMedia(
          `screen and (min-width: ${currentSize}px) and (max-width: ${nextBiggerSize}px)`,
        )
      ) {
        colForSizesStyle = {
          gridTemplateColumns: `repeat(${numColForSizes[size[0]]}, 1fr)`,
        };
      }
    }
  });

  /**
   * Construct grid style and override with custom style
   */
  const style = {
    ...baseGridStyle(gridGap),
    ...colForSizesStyle,
    ...propStyle,
  };

  return (
    <div style={style}>
      {columns.map((column) => {
        return column;
      })}
    </div>
  );
};

const baseGridStyle = (gridGap: string): any => ({
  width: '100%',
  display: 'grid',
  gridGap: gridGap,
});

interface ColProps {
  children: any;
}

export const Col = (props: ColProps) => {
  return <div>{props.children}</div>;
};

/**
 * Compute default values for columns
 * If a column prop for size is not set, inherit from bigger size
 * @param props
 */
const getNumColForScreenSizes = (props: GridProps): ScreenSizesType => {
  const { numCol = 4 } = props;
  const { numColXL = numCol } = props;
  const { numColLG = numColXL } = props;
  const { numColMD = numColLG } = props;
  const { numColSM = numColMD } = props;
  const { numColXS = numColSM } = props;
  return {
    xs: numColXS,
    sm: numColSM,
    md: numColMD,
    lg: numColLG,
    xl: numColXL,
  };
};

export default Grid;
