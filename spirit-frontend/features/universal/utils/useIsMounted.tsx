import { useCallback, useEffect, useRef } from "react"

export default function useIsMounted(initial = false) {
  const isMounted = useRef(initial)
  const get = useCallback(() => isMounted.current, [])

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return get
}
