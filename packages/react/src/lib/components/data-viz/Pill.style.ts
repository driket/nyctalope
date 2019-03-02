import { CSSProperties } from 'react'

export const pillSegmentStyle = (
  size: string,
  color: string,
): CSSProperties => ({
  display: 'block',
  width: size,
  backgroundColor: color,
  height: '30px',
})

export const legendStyle = (color: string): CSSProperties => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-evenly',
  marginTop: '20px',
  color: color,
  fontSize: '12px',
})
export const legendSegmentStyle = (color: string): CSSProperties => ({
  backgroundColor: color,
  width: '8px',
  height: '8px',
  borderRadius: '8px',
  marginTop: '6px',
  marginRight: '6px',
})
export const pillStyle: CSSProperties = {
  height: '30px',
  borderRadius: '150px',
  padding: '0px',
  overflow: 'hidden',
  width: '100%',
  display: 'flex',
}

export const PillStyle = {
  pillSegmentStyle,
  legendStyle,
  legendSegmentStyle,
  pillStyle,
}
