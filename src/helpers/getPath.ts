import { HOMEPAGE_PATH } from '@/constants/variables'

export function getStaticPath(path: string) {
  return `${HOMEPAGE_PATH}${path}`
}

export function addPathPrefix(path?: string) {
  const prefix = HOMEPAGE_PATH || ''

  if (path && !path.startsWith(prefix)) {
    return prefix + path
  }

  return path || ''
}
