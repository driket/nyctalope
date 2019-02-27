import useMedia from './use-media'

/**
 * Return true if user prefers dark mode
 */
export const useDarkMode = () => {
  return useMedia('(prefers-color-scheme: dark)')
}

export default useDarkMode
