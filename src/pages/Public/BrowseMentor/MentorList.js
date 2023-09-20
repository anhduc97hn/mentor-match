import React from 'react'
import MentorCard from './MentorCard'

function MentorList({mentors}) {

  return (
   <>
    {mentors.map((mentor) => (<MentorCard mentor={mentor} key={mentor._id}/>))}
   </> 
  )
  }

export default MentorList