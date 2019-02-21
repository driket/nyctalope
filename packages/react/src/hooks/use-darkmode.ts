import useMedia from './use-media'

export const useDarkMode = () => {
  return useMedia('(prefers-color-scheme: dark)')
}

export default useDarkMode
