export interface ReviewType {
  title: string
  quote: string
  stars: number
  name?: string
  src: string
  srcWebp?: string
  class?: string
  mainTitle: string
  trustpilot?: boolean
}
export interface sliderBlockItemType {
  name: string
  review?: string
  img?: string
  res?: string
}
export interface Condition {
  fieldName: string
  value: string
}
export interface ImageType {
  src: string
  srcWebp?: string
  classname?: string
}
export interface TestimonialsType {
  title: string
  quote: string
  name: string
  src: string
  srcWebp?: string
  mode?: string
}
export type ContentType = {
  [x: string]: any
  image?: ImageType
  title?: string
  lottie?: {
    src: string
    className?: string
    paragraph?: string
  }
  imageAbsolute?: {
    src: string
  }
  paragraph?: {
    text: string
    bold?: string
  }
  info?: {
    image: ImageType
    title: string
    text: string
  }
  date?: {
    text: string
  }
  smallParagraph?: string
  smallSpan?: {
    text: string
  }
  slider?: boolean
  reviews?: ReviewType[]
  testimonails?: TestimonialsType[]
  trustpilot?: boolean
  conditions?: Condition[]
}
export type InputType = {
  min: number | undefined
  max: number | undefined
  step: number | undefined
  maxLength: number | undefined
  type: string
  label: string
  placeholder: string
  minLength?: number
  required?: boolean
  name: string
  tooltip?: boolean
  className?: string
  inputMode: string
}
export type RadioButtonType = {
  text: string
  textIcon?: string
  small?: string
  img?: string
  imgWebp?: string
  withTick?: boolean
  halfWidth?: boolean
  bgImg?: ImageType
  bigSize?: boolean
  hideChecked?: boolean
  smallWidthRight?: boolean
  smallWidth?: boolean
}
export type RadioCardType = {
  text: string
  img: string
}

export type CheckboxButtonType = {
  text: string
  img?: string
  name?: string
  resetCheckbox?: boolean
  allCheckbox?: boolean
  className?: string
  hideText?: string
  cardView?: boolean
  bgImg?: ImageType
  bigSize?: boolean
}
export type CheckboxCardType = {
  text: string
  img?: string
  name?: string
  resetCheckbox?: boolean
  allCheckbox?: boolean
  className?: string
  hideText?: string
}
export type RangeBodyType = {
  currentValue: number | null
}
export type HumanSizesType = {
  units: ['', '']
  name: string
  active?: string
}
export type GraphType = {
  src: string
  className?: string
  text?: string
  nameTitle?: boolean
  smallText?: boolean
  title: string
}
export type LifestyleActiveType = {
  src: string
  text: string
  title: string
  name: string
  index: number
}

export type Question = {
  paragraph?: string
  name?: string
  nameClass?: string
  className?: string
  components: {
    input?: InputType
    content?: ContentType
    datePicker: any
    titleWithWeight: any
    personalizedGraphic: any
    purchaseWithName: any
    radioButton?: RadioButtonType
    checkboxButton?: CheckboxButtonType
    checkboxCard?: CheckboxCardType
    progress?: string
    rangeBody?: RangeBodyType
    bodyAreas: boolean
    humanSizes: HumanSizesType
    profile: boolean
    profileBetterme: boolean
    graph: GraphType
    lifestyleActive: [LifestyleActiveType]
    radioCard: RadioCardType
    loader: string
  }[]
  background?: {
    image: ImageType
    width?: string
    height?: string
    className?: string
  }
  nextButton: boolean
  skipStep?: boolean
  clickedBackButton: boolean
  nextButtonTitle?: string
  fieldName?: string
  noRequiredFields?: boolean
  disabledButtonOpacity?: boolean
  hideHeader?: boolean
  hideNav?: boolean
  hideBackHeader?: boolean
  hideBtnHeader?: boolean
  isCashed?: boolean
  amplitudeEvent?: string
}
export type Step = {
  name: string
  questions: Question[]
}
export type Answer = { [name: string]: string[] }
export type Answers = { [stepIndex: number]: Answer[] }
export type Plan = {
  _id: string
  id: string
  mostPopular: boolean
  name: string
  originalPrice: number
  discountedPrice30: number
  discountedPrice45: number
  pricePerDay30: number
  pricePerDay45: number
  pricePerDay: number
  instruction: string
  information?: string
  paddlePriceID?: string
  nextProductPaddleID?: string
  paddleDiscounted30CouponID?: string
  paddleDiscounted45CouponID?: string
  paddleDiscountedFreeTrial?: string
  payProProductID?: string
  payProDiscounted30CouponID?: string
  payProDiscounted45CouponID?: string
  payProTrialID?: string
}
export type PaymentPlanPaddle = {
  paddlePriceID: string
  nextProductPaddleID?: string
  paddleCouponID: string
}
export type PaymentPlan = {
  name: string
  originalPrice: number
  discountedPrice: number
  paddlePriceID?: string
  paddleCouponID?: string
  nextProductPaddleID?: string
  payProProductID?: string
  payProCouponID?: string
}
export type Subscription = {
  id: string
  current_period_end: string
  current_period_start: string
  plan: string
}
export type BenefitsItem = {
  src: string
  title?: string
  text?: string
}
export type PaywallContent = {
  title: string
  copyright: string
  choosePlanBlock?: {
    title: string
    titleTrial: string
    description?: string
  }
  benefitsBlock?: {
    title: string
    items?: [BenefitsItem]
  }
  featuredBlock?: {
    title: string
    items?: string[]
  }
  checkoutBlock?: {
    title: string
    items?: string[]
  }
  testimonialsBlock?: {
    title?: string
    reviews: ReviewType[]
  }
  faqBlock?: {
    title: string
    items?: [
      {
        title: string
        text: string
      },
    ]
  }
  moneyBackBlock?: {
    title: string
    content?: string
    img?: string
    description?: string
    link: string
  }
  plans: {
    descriptionTrial: string
  }
}
export type Customer = {
  name: string
  email: string
  customerPortalID: string
  countryCode?: string
  postalCode?: string
}
