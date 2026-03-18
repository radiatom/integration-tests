import React from 'react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/providers/AuthContext'
import { PopupProvider } from '@/providers/PopupContext'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HOMEPAGE_PATH } from '@/constants/variables'
import { ROUTES } from '@/constants/routes'
import { HomePage } from '@/components/pages/HomePage/HomePage'
import { RestrictedRoute } from '@/components/RestrictedRoute'
import LoginPage from '@/components/pages/LoginPage'
import OtpPage from '@/components/pages/OtpPage'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import ProfilePage from '@/components/pages/ProfilePage/Profile'
import ReasonsPage from '@/components/pages/ReasonsPage'
import OfferPage from '@/components/pages/OfferPage'
import { FAQ } from '@/components/pages/FAQ/FAQ'
import { PrivacyPolicy } from '@/components/pages/PrivacyPolicy/PrivacyPolicy'
import { MoneyBackPolicy } from '@/components/pages/MoneyBackPolicy/MoneyBackPolicy'
import { Terms } from '@/components/pages/Terms/Terms'
import useEdgeGuard from '@/hooks/useEdgeGuard'
import PersonalDataManagementPage from '@/components/pages/PersonalDataManagement/PersonalDataManagementPage'
import PlanPage from '@/components/pages/PlanPage/PlanPage'
import MenuBottom from '@/components/MenuBottom/MenuBottom'
import MealsPage from '@/components/pages/MealsPage/MealsPage'
import WorkoutsGroupsPage from '@/components/pages/WorkoutsGroupsPage/WorkoutsGroupsPage'
import WorkoutsPage from '@/components/pages/WorkoutsPage/WorkoutsPage'
import WorkoutPage from '@/components/pages/WorkoutPage/WorkoutPage'
import MealPage from '@/components/pages/MealPage/MealPage'
import GlobalLoaderRQK from '@/components/GlobalLoaderRQK/GlobalLoaderRQK'
import PersonalPlanSettings from '@/components/pages/PersonalPlanSettings/PersonalPlanSettings.component'
import FastingPage from '@/components/pages/FastingPage/FastingPage'
import ChallengesPage from '@/components/pages/ChallengesPage/ChallengesPage'
import TrophiesPage from '@/components/pages/TrophiesPage/TrophiesPage'
import ChallengePage from '@/components/pages/ChallengePage/ChallengePage'
import DiscoverChallengesPage from '@/components/pages/DiscoverChallenges/DiscoverChallengesPage'
import AppSettingsPage from '@/components/pages/AppSettingsPage/AppSettingsPage'
import HelpPage from '@/components/pages/HelpPage/HelpPage'
import LimitedPage from '@/components/pages/LimitedPage/LimitedPage'

const App = () => {
  useEdgeGuard()

  return (
    <AuthProvider>
      <GlobalLoaderRQK />

      <Toaster position="top-center" expand={false} richColors closeButton duration={3000} />
      <PopupProvider>
        <Router basename={HOMEPAGE_PATH}>
          <MenuBottom />

          <Routes>
            <Route path={ROUTES.HOME} Component={() => <HomePage />} />

            <Route path={ROUTES.LIMITED} Component={(props) => <LimitedPage {...props} />} />

            <Route
              path={ROUTES.LOGIN}
              Component={(props) => (
                <RestrictedRoute>
                  <LoginPage {...props} />
                </RestrictedRoute>
              )}
            />
            <Route
              path={ROUTES.OTP}
              Component={(props) => (
                <RestrictedRoute>
                  <OtpPage {...props} />
                </RestrictedRoute>
              )}
            />
            {/* <Route path="/forgot/" Component={(props) => <ForgotPage {...props} />} /> */}
            {/* <Route path="/forgot-success/" Component={(props) => <ForgotSuccessPage {...props} />} /> */}
            <Route
              path={ROUTES.CHALLENGES}
              Component={(props) => (
                <ProtectedRoute>
                  <ChallengesPage {...props} />
                </ProtectedRoute>
              )}
            />
            <Route
              path={ROUTES.CHALLENGES + ROUTES.TROPHIES}
              Component={(props) => (
                <ProtectedRoute>
                  <TrophiesPage {...props} />
                </ProtectedRoute>
              )}
            />
            <Route
              path={ROUTES.CHALLENGES + ROUTES.DISCOVER_CHALLENGES}
              Component={(props) => (
                <ProtectedRoute>
                  <DiscoverChallengesPage {...props} />
                </ProtectedRoute>
              )}
            />
            <Route
              path={ROUTES.CHALLENGES + ROUTES.CHALLENGE}
              Component={(props) => (
                <ProtectedRoute>
                  <ChallengePage {...props} />
                </ProtectedRoute>
              )}
            />
            <Route
              path={ROUTES.PLAN}
              Component={(props) => (
                <ProtectedRoute>
                  <PlanPage {...props} />
                </ProtectedRoute>
              )}
            />
            <Route
              path={ROUTES.WORKOUTS_GROUPS}
              Component={(props) => (
                <ProtectedRoute>
                  <WorkoutsGroupsPage {...props} />
                </ProtectedRoute>
              )}
            />
            <Route
              path={ROUTES.WORKOUTS_GROUPS + ROUTES.WORKOUTS}
              Component={(props) => (
                <ProtectedRoute>
                  <WorkoutsPage {...props} />
                </ProtectedRoute>
              )}
            />
            <Route
              path={ROUTES.PLAN + ROUTES.WORKOUT}
              Component={(props) => (
                <ProtectedRoute>
                  <WorkoutPage {...props} />
                </ProtectedRoute>
              )}
            />
            <Route
              path={ROUTES.MEALS}
              Component={(props) => (
                <ProtectedRoute>
                  <MealsPage {...props} />
                </ProtectedRoute>
              )}
            />

            <Route
              path={ROUTES.MEALS + ROUTES.MEAL}
              Component={(props) => (
                <ProtectedRoute>
                  <MealPage {...props} />
                </ProtectedRoute>
              )}
            />

            <Route
              path={ROUTES.FASTING}
              Component={(props) => (
                <ProtectedRoute>
                  <FastingPage {...props} />
                </ProtectedRoute>
              )}
            />
            <Route
              path={ROUTES.PROFILE}
              Component={(props) => (
                <ProtectedRoute>
                  <ProfilePage {...props} />
                </ProtectedRoute>
              )}
            />

            <Route
              path={ROUTES.PERSONAL_PLAN_SETTINGS}
              Component={(props) => (
                <ProtectedRoute>
                  <PersonalPlanSettings {...props} />
                </ProtectedRoute>
              )}
            />

            <Route
              path={ROUTES.APP_SETTINGS}
              Component={(props) => (
                <ProtectedRoute>
                  <AppSettingsPage {...props} />
                </ProtectedRoute>
              )}
            />

            <Route
              path={ROUTES.PERSONAL_DATA_MANAGEMENT}
              Component={(props) => (
                <ProtectedRoute>
                  <PersonalDataManagementPage {...props} />
                </ProtectedRoute>
              )}
            />
            <Route
              path={ROUTES.HELP}
              Component={(props) => (
                <ProtectedRoute>
                  <HelpPage {...props} />
                </ProtectedRoute>
              )}
            />
            <Route
              path={ROUTES.REASONS}
              Component={(props) => (
                <ProtectedRoute>
                  <ReasonsPage {...props} />
                </ProtectedRoute>
              )}
            />
            <Route
              path={ROUTES.OFFER}
              Component={(props) => (
                <ProtectedRoute>
                  <OfferPage {...props} />
                </ProtectedRoute>
              )}
            />
            <Route path={ROUTES.FAQ} Component={(props) => <FAQ {...props} />} />
            <Route
              path={ROUTES.PRIVACY_POLICY}
              Component={(props) => <PrivacyPolicy {...props} />}
            />
            <Route path={ROUTES.MONEY_BACK} Component={(props) => <MoneyBackPolicy {...props} />} />
            <Route path={ROUTES.TERMS} Component={(props) => <Terms {...props} />} />
          </Routes>
        </Router>
      </PopupProvider>
    </AuthProvider>
  )
}

export default App
