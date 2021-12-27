import React from 'react'
import Profile from '../../components/ProfilePage'
import { useSelector } from 'react-redux'
function ProfilePage() {
  const currenUser = useSelector(state => state.auth.current)
  const { data } = useSelector(state => state.updateavatar)
  return (
    <div>
      <Profile currenUser={currenUser} avatar={data.thumbnail} />
    </div>
  )
}

export default ProfilePage
