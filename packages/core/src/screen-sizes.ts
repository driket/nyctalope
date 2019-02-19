/**
 * Screen sizes type
 * Reference different screen sizes corresponding to several devices
 */
export type MDSScreenSizesType = {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
}

/**
 * Screen sizes identifiers
 * Helps to target most commonly used devices out there
 */
export const MDSScreenSizes: MDSScreenSizesType = {
    xs: 0, // eg. mobile portrait
    sm: 480, // eg. mobile landscape
    md: 768, // eg. tablet portrait, small desktop (windowed)
    lg: 1024, // eg. tabled landscape, large web (windowed or fullscreen)
    xl: 1366, // eg. full screen desktop or very large monitors
}

export default MDSScreenSizes
