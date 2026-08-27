"use client"

export function track(eventId: string, extra?: Record<string, string>) {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: "cta_click", event_id: eventId, ...extra })
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function Analytics() {
  return null
}
