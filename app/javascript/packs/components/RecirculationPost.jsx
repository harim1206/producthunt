import React from 'react';


export default function RecirculationPost({post}) {  
  return(
    <div className="recirc-post">
      <img src={post.image}/>
      <p className="recirc-post__title">{post.title}</p>
      <p className="recirc-post__tagline">{post.tagline}</p>
      <p className="recirc-post__stats">
        <span className='votes-count'>▲{post.votesCount}</span> • <span className='comments-count'>{post.commentsCount} Comments</span>
      </p>  
    </div>
  )
}