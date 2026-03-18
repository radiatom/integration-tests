export const isInAppBrowser = () => {
  const ua = navigator.userAgent.toLowerCase()

  return (
    ua.includes('fbav') ||
    ua.includes('fban') ||
    ua.includes('instagram') ||
    ua.includes('line') ||
    ua.includes('wv') || // android webview
    ua.includes('tiktok')
  )
}
