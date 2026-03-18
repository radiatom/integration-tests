import React from 'react'
import { useIsFetching } from 'react-query'
import LoaderLogo from '@/components/LoaderLogo/LoaderLogo'

const GlobalLoaderRQK = () => {
  const filter = {
    predicate: (query) => {
      return query.options.meta?.globalLoader !== false
    },
  }

  const isFetchingCount = useIsFetching(filter)
  const isLoading = isFetchingCount > 0

  if (!isLoading) return null

  return <LoaderLogo />
}

export default GlobalLoaderRQK
