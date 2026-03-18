import { AMPLITUDE_RATE } from '@/constants/variables'
import { init, add, identify, Identify } from '@amplitude/analytics-browser'
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser'

const sendCustomUtmTagsInAmplitude = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const campaignId = urlParams.get('campaign_id')
  const adgroupId = urlParams.get('adgroup_id')

  const identifyObj = new Identify()

  if (campaignId)
    identifyObj.setOnce('initial_campaign_id', campaignId).set('campaign_id', campaignId)
  if (adgroupId) identifyObj.setOnce('initial_adgroup_id', adgroupId).set('adgroup_id', adgroupId)

  if (campaignId || adgroupId) identify(identifyObj)
}

export const initAmplitude = () => {
  init('b2a79bfa738450505fcce812db525ad1', { defaultTracking: true })
  const sessionReplayTracking = sessionReplayPlugin({ sampleRate: AMPLITUDE_RATE })
  add(sessionReplayTracking)

  sendCustomUtmTagsInAmplitude()
}
