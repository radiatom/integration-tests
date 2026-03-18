import { BaseHttpServices, CustomAxiosRequestConfig } from '@/services/base-http-services'
import { setUserIdAmplitude, trackErrors } from '@/helpers/facebookPixelEvents'
import { t } from 'i18next'
import { PaymentPlanData, PaymentUpsale, ProfileData, UserProfileView } from '@/types/interfaces'
import formatDate from '@/lib/formatDate'
import { API_URL } from '@/constants/variables'
import { API_URLS } from '@/constants/api-urls'

interface ProfileApiInterface {
  getProfile: () => Promise<UserProfileView>
}

export class ProfileApiService implements ProfileApiInterface {
  private readonly http: BaseHttpServices

  constructor(httpService: BaseHttpServices) {
    this.http = httpService
  }

  getProfile = async (): Promise<UserProfileView> => {
    try {
      const response = await this.http.get(
        API_URLS.GET_PROFILE,
        {} as CustomAxiosRequestConfig<any>,
      )

      const {
        profile,
        paymentPlan,
        upsale,
      }: { profile: ProfileData; paymentPlan: PaymentPlanData; upsale: PaymentUpsale } =
        response.data

      localStorage.setItem('userEmail', profile?.email)
      localStorage.setItem('userProgram', profile?.profile?.personalWorkoutType?.workoutType)

      const unit = {
        kg: t('units.kg'),
        cm: t('units.cm'),
        lbs: t('units.lbs'),
        in: t('units.in'),
        m: t('units.m'),
        ft: t('units.ft'),
      }

      const genderKey = profile.profile.gender
      const translatedGender = genderKey ? t(`gender.${genderKey}`) : 'None'

      // set userId in Amplitude
      if (profile.id) setUserIdAmplitude(profile.id)

      return {
        userName: profile.profile.name || profile.id,
        avatar: profile.profile.cover || null,
        email: profile.email,
        id: profile.id,
        targetWeight: `${Number(profile.profile.condition.weight.wanted)} ${profile.metricType === 'EU' ? `${unit.kg}` : `${unit.lbs}`}`,
        paymentPlan: { ...paymentPlan, subscriptions: paymentPlan?.subscriptions || [] },
        upSale: { ...upsale },
        manageSubscriptionItems: [
          { key: 'id', label: t('id'), value: profile.id, class: '' },
          { key: 'email', label: t('email'), value: profile.email, class: '' },
          { key: 'name', label: t('name'), value: profile.profile.name, class: 'capitalize' },
          {
            key: 'gender',
            label: t('gender.label'),
            value: translatedGender,
            class: 'capitalize',
          },
          { key: 'birthday', label: t('dateOfBirth'), value: formatDate(profile.profile.birthAt) },
          {
            label: t('units.label'),
            value:
              profile.metricType === 'EU' ? `${unit.kg}, ${unit.cm}` : `${unit.lbs}, ${unit.in}`,
          },
          {
            label: t('currentWeight'),
            value: `${isNaN(Number(profile.profile.condition.weight.current)) ? 'None' : Number(profile.profile.condition.weight.current).toFixed(0)} ${
              profile.metricType === 'EU' ? unit.kg : unit.lbs
            }`,
          },
          {
            label: t('height'),
            value: `${profile.profile.condition.height} ${
              profile.metricType === 'EU' ? unit.m : unit.ft
            }`,
          },
        ],
        profileItems: [
          { key: 'name', label: t('name'), value: profile.profile.name, class: 'capitalize' },
          { key: 'birthday', label: t('dateOfBirth'), value: formatDate(profile.profile.birthAt) },
          {
            key: 'gender',
            label: t('gender.label'),
            value: translatedGender,
            class: 'capitalize',
          },
          {
            label: t('height'),
            value: `${profile.profile.condition.height} ${
              profile.metricType === 'EU' ? unit.m : unit.ft
            }`,
          },
          {
            label: t('startWeight'),
            value: `${isNaN(Number(profile.profile.condition.weight.start)) ? 'None' : Number(profile.profile.condition.weight.start).toFixed(0)} ${
              profile.metricType === 'EU' ? unit.kg : unit.lbs
            }`,
          },
          {
            label: t('targetWeight'),
            value: `${isNaN(Number(profile.profile.condition.weight.wanted)) ? 'None' : Number(profile.profile.condition.weight.wanted).toFixed(0)} ${
              profile.metricType === 'EU' ? unit.kg : unit.lbs
            }`,
          },
          {
            label: t('dailyStepGoal'),
            value: `${isNaN(Number(profile.profile.goals.dailySteps)) ? 'None' : Number(profile.profile.goals.dailySteps).toFixed(0)} ${t('steps')}`,
          },
          {
            label: t('dietType'),
            value: profile.profile.dietType ? t(`dietTypes.${profile.profile.dietType}`) : 'None',
          },
          {
            label: t('units.label'),
            value:
              profile.metricType === 'EU' ? `${unit.kg}, ${unit.cm}` : `${unit.lbs}, ${unit.in}`,
          },
        ],
      }
    } catch (error) {
      trackErrors('profile:api:fetch', error)
      throw error
    }
  }
}

export const ProfileApi = new ProfileApiService(new BaseHttpServices(API_URL))
