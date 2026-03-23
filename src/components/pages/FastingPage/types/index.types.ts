export interface Stage {
  id: number
  activeSvg: string
  svg: string
  svgProgress: string
  svgProgressInactive: string
  svgCard: string
  title: string
  descriptionSmall: string
  descriptions: string[]
  durationHours: number
}

export interface FastingModel {
  id: string
  fastingDuration: number
  eatingDuration: number
  description: string
  listTitle: string
  list: string[]
  stages: Stage[]
}

export interface FastingLevel {
  levelName: string
  models: FastingModel[]
}
