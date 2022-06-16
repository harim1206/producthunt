import React from 'react';
import {CommenterIcon, HunterIcon, MakerIcon, UpvoterIcon} from '../components/Icons'

export default function UserIcon(props) {

  let userTypeIcon;
  switch(props.userType) {
    case 'commenter':
      userTypeIcon = <CommenterIcon/>;
    break;
    case 'hunter':
      userTypeIcon = <HunterIcon/>;
    break;
    case 'maker':
      userTypeIcon = <MakerIcon/>;
    break;
    case 'voter':
      userTypeIcon = <UpvoterIcon/>;
    break;
  }

  return(
    <div className="user-icon">
      <img className="user-icon" key={props.id} src={props.src}/>
      {userTypeIcon}
    </div>
  )
}