import React from 'react'
import Profile from '../../components/ProfilePage'
import { useSelector } from 'react-redux'
function ProfilePage() {
  const currenUser = useSelector(state => state.auth.current)
  const { photourl } = useSelector(state => state.updateavatar)
  return (
    <div>
      <Profile currenUser={currenUser} avatar={photourl} />
    </div>
  )
}

export default ProfilePage
