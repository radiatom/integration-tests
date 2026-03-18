import ReactPixel from 'react-facebook-pixel'

export const initFacebookPixel = () => {
  ReactPixel.init(process.env.REACT_APP_FB_PIXEL_ID ?? '')
  ReactPixel.fbq('dataProcessingOptions', ['LDU'], 1, 0)
}
