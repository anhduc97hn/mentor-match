import React from 'react'
import SessionCard from './SessionCard'

function SessionCanceled() {
  const status = "Canceled"
  return (
    <SessionCard status={status}/>
  )
}

export default SessionCanceled