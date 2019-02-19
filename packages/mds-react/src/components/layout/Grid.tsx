import React, { ReactChildren } from "react"
import { css } from "@emotion/core"
import { screenSizes, ScreenSizesType } from "@mandala-design-system/core"

interface GridProps {
    numCol: number
    numColXS?: number
    numColSM?: number
    numColMD?: number
    numColLG?: number
    numColXL?: number
    children: ReactChildren
    gridGap: string
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

export const Grid = (props: GridProps) => {
    const numColForSizes = getNumColForScreenSizes(props)
    const { gridGap = "10px" } = props
    const columns = React.Children.toArray(props.children)

    return (
        <div css={gridStyle(numColForSizes, screenSizes, gridGap)}>
            {columns.map((column) => {
                return column
            })}
        </div>
    )
}

interface ColProps {
    children: any
}

export const Col = (props: ColProps) => {
    return (
        <div
            css={css`
                /* background: red; */
            `}
        >
            {props.children}
        </div>
    )
}

const gridStyle = (
    numColForSizes: ScreenSizesType,
    screenSizes: ScreenSizesType,
    gridGap: string,
) => {
    const baseGridStyle = css`
        width: 100%;
        display: grid;
        grid-gap: ${gridGap};
    `
    const sizes = Object.entries(screenSizes)
    const colForSizesStyke = sizes.map((size, index) => {
        let currentSize = screenSizes[size[0]]
        if (size[0] == "xl") {
            return `
                    @media screen and (min-width: ${currentSize}px) {
                        grid-template-columns: repeat(${
                            numColForSizes[size[0]]
                        }, 1fr);
                    }
                `
        } else {
            const nextBiggerSize = screenSizes[sizes[index + 1][0]]
            return `
                    @media screen and (min-width: ${currentSize}px) and (max-width: ${nextBiggerSize}px) {
                        grid-template-columns: repeat(${
                            numColForSizes[size[0]]
                        }, 1fr);
                    }
                `
        }
    })
    return [baseGridStyle, colForSizesStyke]
}

export default Grid