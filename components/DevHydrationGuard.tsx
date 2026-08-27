"use client"

import { useEffect } from "react"

/** Cursor's browser injects data-cursor-ref before hydrate, which Next treats as a blocking overlay. */
export function DevHydrationGuard() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return

    const dismiss = () => {
      document.querySelectorAll("nextjs-portal").forEach((node) => node.remove())
    }

    dismiss()
    const observer = new MutationObserver(dismiss)
    observer.observe(document.documentElement, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return null
}
