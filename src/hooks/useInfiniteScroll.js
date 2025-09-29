import { useEffect, useRef, useState } from 'react'

export default function useInfiniteScroll(callback, { rootMargin = '600px', disabled = false } = {}) {
  const ref = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (disabled) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          callback?.()
        }
      })
    }, { rootMargin })
    observer.observe(el)
    setReady(true)
    return () => observer.disconnect()
  }, [callback, rootMargin, disabled])

  return { sentinelRef: ref, ready }
}
