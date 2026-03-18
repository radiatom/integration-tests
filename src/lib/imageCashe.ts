import { addPathPrefix } from '@/helpers/getPath'
import { Question } from '@/types/types'

export const extractImageUrls = (obj: Record<string, any> | Record<string, any>[]) => {
  const urls: string[] = []

  if (Array.isArray(obj)) {
    obj.forEach((subItem) => {
      urls.push(...extractImageUrls(subItem))
    })
  }

  Object.keys(obj).forEach((key) => {
    const item = obj[key]

    if (item && (Array.isArray(item) || typeof item === 'object')) {
      urls.push(...extractImageUrls(item))
    } else if (key === 'img' || key === 'imgWebp' || key === 'src' || key === 'srcWebp') {
      obj[key] = addPathPrefix(obj[key])

      urls.push(obj[key])
    }
  })

  return urls
}

export const preloadImage = (url: string) => {
  const img = new Image()

  img.loading = 'lazy'
  img.src = url
  img.onload = () => {
    document.body.removeChild(img)
  }
  document.body.appendChild(img)
}

export const preloadImages = (urls: string[]) => {
  urls.forEach((url) => preloadImage(url))
}

export const parseQuestion = (question: Question | null, delay = 500) => {
  if (question && !question.isCashed) {
    const urls = extractImageUrls(question)
    setTimeout(preloadImages, delay, urls)
    question.isCashed = true
  }
}
