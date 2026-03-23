import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: MemoryRouter, ...options })

export { customRender as render }

// import React, { ReactElement } from 'react'
// import { render, RenderOptions } from '@testing-library/react'
// import { MemoryRouter } from 'react-router-dom'
// import ErrorBoundary from '@/components/ErrrosBoundary'
// import { QueryClient, QueryClientProvider } from 'react-query'
// import { AuthProvider } from '@/providers/AuthContext'
//
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       retry: 1,
//     },
//   },
// })
//
// const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <ErrorBoundary>
//       <QueryClientProvider client={queryClient}>
//         <AuthProvider>
//           <MemoryRouter>{children}</MemoryRouter>
//         </AuthProvider>
//       </QueryClientProvider>
//     </ErrorBoundary>
//   )
// }
//
// const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
//   render(ui, { wrapper: AllTheProviders, ...options })
//
// // export * from '@testing-library/react'
// export { customRender as render }
