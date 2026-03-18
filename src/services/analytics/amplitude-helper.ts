/* eslint-disable no-console */

import { getSessionId, getUserId, getDeviceId } from '@amplitude/analytics-browser'

export const getAmplitudeId = (): string | null => {
  try {
    const userId = getUserId()
    const sessionId = getSessionId()
    const deviceId = getDeviceId()

    if (userId) {
      return `${userId}`
    }

    if (sessionId) {
      return `${sessionId}`
    }

    if (deviceId) {
      return `${deviceId}`
    }

    return null
  } catch (error) {
    console.warn('Error getting Amplitude ID:', error)
    return null
  }
}
