import React from 'react'
import MentorCard from './MentorCard'

function MentorList({mentors}) {

  return (
   <>
    {mentors.map((mentor, index) => (<MentorCard mentor={mentor} key={index}/>))}
   </> 
  )
  }

export default MentorList