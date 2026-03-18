import { init, setUser, setTag, browserTracingIntegration } from '@sentry/react'
import { API_URL, APP_MODE, PUBLIC_URL, SENTRY_KEY, SENTRY_RATE } from '@/constants/variables'
import { getAmplitudeId } from '@/services/analytics/amplitude-helper'

type U = { id?: string; email?: string; username?: string }
let currentUser: U = {}
const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const norm = (u: U): U => ({
  ...(u.id ? { id: String(u.id) } : {}),
  ...(u.email ? { email: u.email.trim().toLowerCase() } : {}),
  ...(u.username ? { username: u.username.trim() } : {}),
})

const urlToOriginRegex = (url?: string) => {
  if (!url) return undefined
  try {
    const { origin } = new URL(url)
    return new RegExp('^' + escapeRegex(origin))
  } catch {
    return undefined
  }
}

export function updateSentryUser(patch: U) {
  currentUser = { ...currentUser, ...norm(patch) }

  setUser({
    id: currentUser.id,
    email: currentUser.email,
    username: currentUser.username,
  })

  const amplitudeId = getAmplitudeId()
  if (amplitudeId) {
    setTag('amplitude_id', amplitudeId as string)
  }
}

export const initSentry = () => {
  const targets = [
    // /^\//,
    'localhost',
    urlToOriginRegex(API_URL),
    urlToOriginRegex(PUBLIC_URL),
  ].filter(Boolean) as (string | RegExp)[]
  const tracesSampleRate = Number(SENTRY_RATE || 0.1)

  init({
    dsn: SENTRY_KEY,
    sendDefaultPii: true,
    integrations: [browserTracingIntegration()],
    tracesSampleRate,
    tracePropagationTargets: targets,
    environment: APP_MODE === 'live' ? 'production' : 'development',
  })

  updateSentryUser({})
}
