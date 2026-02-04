import { useCallback, useEffect, useRef } from "react"

/**
 * Returns a function that returns the current mount state. This hook is useful when you have to
 * detect component mount state within async effects.
 *
 * Implementation directly copied from: https://github.com/react-hookz/web/blob/master/src/useIsMounted/index.ts
 *
 * @param initialValue Initial value.
 *
 * @return Function that returns `true` only if the component is mounted.
 */
export function useIsMounted(initialValue = false): () => boolean {
  const isMounted = useRef(initialValue)
  const get = useCallback(() => isMounted.current, [])

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return get
}
