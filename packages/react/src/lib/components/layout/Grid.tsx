import React, { Component, ReactChildren } from 'react'
import { ScreenSizes, ScreenSizesType } from '@nyctalope/core'
import { useMedia } from '../../hooks/use-media'

interface GridProps {
  numCol: number
  numColXS?: number
  numColSM?: number
  numColMD?: number
  numColLG?: number
  numColXL?: number
  children: any
  style: any
  gridGap?: string
}

export const Grid = (props: GridProps) => {
  const numColForSizes = getNumColForScreenSizes(props)
  const { gridGap = '10px' } = props
  const propStyle = props.style || {}
  const columns = React.Children.toArray(props.children)

  const sizes = Object.entries(ScreenSizes)
  let colForSizesStyle = {}
  sizes.map((size, index) => {
    let currentSize = ScreenSizes[size[0]]
    if (size[0] == 'xl') {
      if (useMedia(`screen and (min-width: ${currentSize}px)`)) {
        colForSizesStyle = {
          gridTemplateColumns: `repeat(${numColForSizes[size[0]]}, 1fr)`,
        }
      }
    } else {
      const nextBiggerSize = ScreenSizes[sizes[index + 1][0]]
      if (
        useMedia(
          `screen and (min-width: ${currentSize}px) and (max-width: ${nextBiggerSize}px)`,
        )
      ) {
        colForSizesStyle = {
          gridTemplateColumns: `repeat(${numColForSizes[size[0]]}, 1fr)`,
        }
      }
    }
  })

  const style = {
    ...baseGridStyle(gridGap),
    ...colForSizesStyle,
    ...propStyle,
  }

  return (
    <div style={style}>
      {columns.map((column) => {
        return column
      })}
    </div>
  )
}

const baseGridStyle = (gridGap: string): any => ({
  width: '100%',
  display: 'grid',
  gridGap: gridGap,
})

interface ColProps {
  children: any
}

export const Col = (props: ColProps) => {
  return <div>{props.children}</div>
}

const getNumColForScreenSizes = (props: GridProps): ScreenSizesType => {
  const { numCol = 4 } = props
  const { numColXL = numCol } = props
  const { numColLG = numColXL } = props
  const { numColMD = numColLG } = props
  const { numColSM = numColMD } = props
  const { numColXS = numColSM } = props
  return {
    xs: numColXS,
    sm: numColSM,
    md: numColMD,
    lg: numColLG,
    xl: numColXL,
  }
}

export default Grid
