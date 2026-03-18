import React from 'react'
import { SUPPORT_EMAIL } from './variables'

export const SUPPORT_LINK = (
  <a href={`mailto:${SUPPORT_EMAIL}`} target={'_blank'} rel="noreferrer">
    {SUPPORT_EMAIL}
  </a>
)
