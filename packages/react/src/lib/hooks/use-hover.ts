import { useRef, useState, useEffect, RefObject } from 'react'

export default function useHover() {
  const [value, setValue] = useState(false)
  const ref: RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null)

  const handleMouseOver = () => setValue(true)
  const handleMouseOut = () => setValue(false)

  useEffect(() => {
    const node = ref.current

    if (node != null) {
      node.addEventListener('mouseover', handleMouseOver)
      node.addEventListener('mouseout', handleMouseOut)

      return () => {
        node.removeEventListener('mouseover', handleMouseOver)
        node.removeEventListener('mouseout', handleMouseOut)
      }
    }
  }, [ref.current])
  const result: [RefObject<HTMLButtonElement>, boolean] = [ref, value]
  return result
}
