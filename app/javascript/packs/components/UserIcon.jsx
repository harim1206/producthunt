import React from 'react';
import {UserTypeIcon} from '../components/Icons'

export default function UserIcon(props) {

  const userTypeIcon = UserTypeIcon[props.userType]

  return(
    <div className="user-icon">
      <img className="user-icon" key={props.id} src={props.src}/>
      {userTypeIcon}
    </div>
  )
}