import React from 'react';


export default function RecirculationPost({post}) {  
  return(
    <div className="recirc-post">
      <img src={post.image}/>
      <p className="recirc-post__title">{post.title}</p>
      <p className="recirc-post__tagline">{post.tagline}</p>
      <p className="recirc-post__stats">
        ▲{post.votesCount}<span>•</span>{post.commentsCount} Comments
      </p>  
    </div>
  )
}