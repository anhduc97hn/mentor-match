import React from 'react'
import SessionCard from "./SessionCard"

function SessionReviewed() {
 const status = "Reviewed"
  return (
    <SessionCard status={status}/>
  )
}

export default SessionReviewed