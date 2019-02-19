/**
 * Themed color scheme type
 * Should have both light and dark colors schemes
 */
export type ThemedColorSchemeType = {
    light: ColorSchemeType
    dark: ColorSchemeType
}

/**
 * Colors scheme type
 */
export type ColorSchemeType = {
    danger: string
    success: string
    main: string
    inverted: string
    background: string
    grey: string
    lightGrey: string
    lighterGrey: string
    highlight: string
}

/**
 * Reference Color Scheme
 */
export const MDSColorScheme: ThemedColorSchemeType = {
    light: {
        danger: "#D00020",
        success: "#5EE89A",
        main: "black",
        inverted: "white",
        background: "#FFFFFF",
        grey: "#888",
        lightGrey: "#BBB",
        lighterGrey: "#EEE",
        highlight: "rgb(12,95,254)",
    },
    dark: {
        danger: "#D00020",
        success: "#2FA261",
        main: "white",
        inverted: "black",
        background: "#1F2228",
        grey: "#888",
        lightGrey: "#555",
        lighterGrey: "#333",
        highlight: "rgb(42,125,254)",
    },
}

export default MDSColorScheme
