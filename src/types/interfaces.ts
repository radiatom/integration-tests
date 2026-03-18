import { SUBSCRIPTION_STATUS } from '@/components/pages/ManageSubscriptionPage/components/Subscriptions/components/SubscriptionCard'

export enum statusChallengeEnum {
  Active = 'active',
  Completed = 'completed',
}

export interface UserFormInput {
  email: string
}

export interface UserOtpInput {
  code: string
}

export interface UserSignIn {
  email: string
  code: string
}

export type Diets = 'common' | 'vegetarian' | 'keto' | 'paleo' | 'vegan'

export type Genders = 'male' | 'female' | 'other'

export interface ProfileItem {
  key?: string
  label: string
  value: string
  class?: string
}

export interface ProfileCondition {
  weight: {
    current: number
    start: number
    wanted: number
  }
  height: number
}

export interface ProfileGoals {
  dailySteps: string
}

export interface PersonalWorkoutType {
  _id: string
  createdAt: string
  workoutType: string
}

export interface UserProfile {
  name: string
  cover: string | null
  gender: Genders
  birthAt: string
  dietType: Diets
  condition: ProfileCondition
  personalWorkoutType: PersonalWorkoutType
  goals: ProfileGoals
}

export interface ProfileData {
  id: string
  email: string
  profile: UserProfile
  metricType: string
  interfaceLanguage: string
}

export interface Zone {
  name: string
  id: string
  cover: string
}

export interface PauseItem {
  index: number
  pause: number
}

export interface Executes {
  pauseSchedule: PauseItem[]
}

export interface ExerciseZone {
  id: string
}

export interface ExerciseData {
  name: string
  id: string
  videos: string[]
  duration: string
  cover: string
  record: string
  zones: ExerciseZone[]
}

export interface WorkoutData {
  name: string
  id: string
  track: string
  duration: string
  cover: string
  zones: Zone[]
  calories: string
  equipment?: string | null
  difficultyLevel: string
  formatType: 'LongVideo' | 'Video' | 'Timer'
  executes: Executes
  exercises: ExerciseData[]
}

export interface WorkoutsGroupsData {
  id: string
  name: string
  cover: string
  // workouts: string[]
  workouts: WorkoutData[]
}

export interface RationDayData {
  date: string
  position: number
  breakfast: string
  lunch: string
  snack: string
  dinner: string
  _id: string
}

export interface MealsDaysData {
  name: string
  id: string
  ration: RationDayData[]
  startCountdownAt: string
}

export interface NutrientUnitData {
  grams: string
  ounces: string
}

export interface IngredientData {
  name: string
  weight: string | null
  metricType: string
}

export interface RecipeData {
  id: string
  name: string
  description: string
  cover: string
  cookTime: string
  kCal: string
  proteins: NutrientUnitData
  carbs: NutrientUnitData
  fat: NutrientUnitData
  ingredients: IngredientData[]
  mealType: string
  mealCategory: string
  dietType: string
}

export interface Subscription {
  subscriptionId: string
  paymentPlatform: string
  billingPeriod: string
  nextChargeDate: string
  amount: number
  name: string
  status: (typeof SUBSCRIPTION_STATUS)[keyof typeof SUBSCRIPTION_STATUS]
  nextInvoice?: {
    dateAt: string
    amount: number
  }
}

export interface PaymentPlanData {
  trial?: string
  subscriptions?: [Subscription]
}

export interface PaymentUpsale {
  amount: number
  billingPeriod: string
  interval: {
    count: string
    period: string
  }
  name: string
  nextChargeDate: string
  nextInvoice?: {
    dateAt: string
    amount: number
    billingPeriod: string
  }
  status: string
}

export interface SignInResponse {
  status: number
  body: any
}

export interface GetOtpCodeResponse {
  status: number
  body: any
}

export interface Forgot {
  email: string
}

export interface UnsubscribeParams {
  paymentPlatform: string
}

export interface PersonalTrainingResponse {
  id: string
  name: string
  workouts: string[]
}

export interface ProgressTraining {
  lastCompletedTrainingDate: string
  trainingIndex: number
}

export interface Plan {
  workoutType: string
  id: string
  name: string
}

export type WorkoutGroupsResponse = Plan[]

export interface ChallengeCategory {
  _id: string
  name: string
  slug: string
}

export interface Milestone {
  dayStart: number
  dayEnd: number
  description: string
  whatYouGet: string
  order: number
}

export interface ChallengeInfo {
  _id: string
  title: string
  about: string
  categoryId: ChallengeCategory
  challengePeriod: number
  image: string
  milestoneCount: number
  milestones: Milestone[]
  createdAt: string
  updatedAt: string
}

export interface ChallengeDay {
  dayNumber: number
  date: string
  completed: boolean | null
}

export interface UserChallenge {
  _id: string
  userId: string
  challengeId: ChallengeInfo
  startDate: string
  endDate: string
  // status: statusChallengeEnum.Active | statusChallengeEnum.Completed
  status: statusChallengeEnum
  completionPercentage: number
  daysCompleted: number
  daysRemaining: number
  strikesEarned: number
  completionCount: number
  days: ChallengeDay[]
}

export type UserChallengeStreaksResponse = {
  totalStreakPoints: number
}

export interface Challenge {
  _id: string
  userId: string
  challengeId: ChallengeInfo
  startDate: string
  endDate: string
  // status: statusChallengeEnum.Active | statusChallengeEnum.Completed
  status: statusChallengeEnum
  completionPercentage: number
  daysCompleted: number
  daysRemaining: number
  strikesEarned: number
  days: ChallengeDay[]
  createdAt: string
  updatedAt: string
}

export type UserChallengeTrophiesResponse = UserChallenge[]

export type UserChallengesActiveResponse = Challenge[]

export type UserChallengesFinishedResponse = UserChallenge[]

export type UserChallengesAvailableResponse = ChallengeInfo[]

export type UserChallengeResponse = Challenge

export interface MarkDayRequest {
  day: number
  completed: boolean
}

export enum typeFinishedChallengesEnum {
  Partial = 'partial',
  All = 'all',
  Successful = 'successful',
}

export enum typeAccessEnum {
  Limited = 'limited',
  FULL = 'full',
}

export interface UserProfileView {
  userName: string
  avatar: string | null
  email: string
  id: string
  targetWeight: string

  paymentPlan: {
    subscriptions: unknown[]
    [key: string]: unknown
  }

  upSale: {
    [key: string]: unknown
  }

  manageSubscriptionItems: ProfileItem[]
  profileItems: ProfileItem[]
}

export interface DailySteps {
  count: string
}

export interface Goals {
  name: string
  dailySteps: DailySteps
}

export interface WeightValue {
  pounds: string
  kilograms: string
}

export interface Weight {
  start: WeightValue
  current: WeightValue
  wanted: WeightValue
  dayStep: WeightValue
  index: number
}

export interface Height {
  meters: string
  feets: string
}

export interface Condition {
  height: Height
  weight: Weight
}

export interface ProfileAccount {
  name: string
  birthAt: string
  gender: string
  dailyActivity: string
  dietType: string
  personalMealType: number
  personalWorkoutType: PersonalWorkoutType
  goals: Goals
  condition: Condition
}

export interface User {
  _id: string
  role: typeAccessEnum
  interfaceLanguage: string
  metricType: string
  platform: string
  isEmailMarketingAgree: boolean
  quizVersion: number
  createdAt: string
  hubspotUserId: string
  status: string
  isMealsUpsaleSubscription: boolean
  upsales: unknown[]
  temporaryToken: string
  email: string
  isPurchasedByCron: boolean
  profile: ProfileAccount
}

export interface UserAccountResponse {
  user: User
}

export enum WorkoutTypeEnum {
  TaiChi = 'tai-chi',
  AfrobeatDance = 'afrobeat-dance',
  AsianChairYoga = 'asian-chair-yoga',
  AsianPilates = 'asian-pilates',
  AsianWalking = 'asian-walking',
  ChairYoga = 'chair-yoga',
  Walking = 'walking',
  Military = 'military',
  Calisthenics = 'calisthenics',
  PelvicWellness = 'pelvic-wellness',
}
