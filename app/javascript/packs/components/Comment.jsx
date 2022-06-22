import React from 'react';
import UserIcon from './UserIcon';

export default function Comment({comment}) {  
  return(
    <li className="comment">
      <div className="comment__user">
        <UserIcon src={comment.user.image}/>
      </div>
      <div className="comment__content">
        <p className="comment__content__name">{comment.user.name} <span className="user-name">@{comment.user.username}</span></p>
        <p className="comment__content__text">{comment.text}</p>
        <div className="comment__content__buttons">
          <span>Upvote (23)</span>
          <span>Reply</span>
          <span>Share</span>
          <span>23m</span>
        </div>
      </div>
    </li>
  )
}