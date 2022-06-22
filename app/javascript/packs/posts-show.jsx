import React, { useEffect, useState } from 'react';
// import * as React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import renderComponent from './utils/renderComponent';
import UserIcon from './components/UserIcon';
import {POST_QUERY, POSTS_ALL_QUERY, VOTE_ADD_MUTATION, VOTE_REMOVE_MUTATION, VIEWER_QUERY} from './queries/posts-show-queries'
import RecirculationPost from './components/RecirculationPost';
import Comment from './components/Comment';

function PostsShow({ postId }) {
  /*
    States
  */
  // is a user logged in?
  const [loggedIn, setLoggedIn] = useState(false)
  // does the post have a vote?
  const [hasVote, setHasVote] = useState(false)
  // form inputs
  const [inputs, setInputs] = useState({});

  /*
    Queries & Mutations
  */
  const { data, error, loading } = useQuery(POST_QUERY, {
    variables: {
      id: postId
    },
  });
  const { data: postsAllData, error: postsAllError, loading: postsAllLoading } = useQuery(POSTS_ALL_QUERY);
  const { data: viewerData, error: viewerError, loading: viewerLoading } = useQuery(VIEWER_QUERY);
  const [ voteAdd, { data: voteAddData, error: voteAddError, loading: voteAddLoading }] = useMutation(VOTE_ADD_MUTATION);
  const [ voteRemove, { data: voteRemoveData, error: voteRemoveError, loading: voteRemoveLoading }] = useMutation(VOTE_REMOVE_MUTATION);

  useEffect(() => {
    if(viewerData?.viewer) setLoggedIn(true)
    if(data?.post.votesCount > 0) setHasVote(true)
  })

  if (loading || postsAllLoading || viewerLoading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (postsAllError) return `Error! ${postsAllError.message}`;
  if (viewerError) return `Error! ${viewerError.message}`;
  
  /*
    Event Handlers
  */
  // On vote button click
  async function onVoteClick(e) {   
    e.preventDefault();

    // If user is not logged in, direct to sign in page
    if(!loggedIn) {
      window.location = '/users/sign_in'
    }
    // If the post does not have a vote, add a vote
    else if(!hasVote) {
      const voteAddRes = await voteAdd({
        variables: {
          id: postId
        },
      }).catch(console.error);

      setHasVote(true)
    }
    // If the user voted on the post, remove the vote
    else {
      const voteRemoveRes = await voteRemove({
        variables: {
          id: postId
        },
      }).catch(console.error);

      setHasVote(false)
    }
  }

  // On comment form input change
  function handleChange(e) {
    let { value, name, type } = e.target;
    
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  // On comment form submit
  function handleSubmit(e) {
    e.preventDefault()
    console.log('handlesubmit')
  }

  /*
    Rendered components
  */
  const {post} = data
  const {postsAll} = postsAllData
  
  // user list icons
  const commenters = post.commenters.map( (user, id) => <UserIcon id={id} src={user.image} userType='commenter' />)
  const voters = post.voters.map( (user, id) => <UserIcon id={id} src={user.image} userType='voter' />)
  const makers = post.makers.map( (user, id) => <UserIcon id={id} src={user.image} userType='maker' />)
  const userList = [...commenters, ...voters, ...makers]

  // post comments
  const comments = post.comments.map(comment => <Comment comment={comment} />)

  // post statistics
  const stats = [
    ["Upvotes", post.votesCount],
    ["Comments", post.commentsCount],
    ["Views", post.viewsCount],
    ["Daily Rank", post.dailyFeedPosition],
    ["Weekly Rank", post.weeklyFeedPosition]
  ].map(stat => {
    return (
      <div className="stats__group">
        <p className="stats__group__label">{stat[0]}</p>
        <p className="stats__group__text">{stat[1]}</p>
      </div>
    )
  })

  // limit recirculation posts to three results
  const recircPosts = postsAll.slice(0,3).map(post => <RecirculationPost post={post} />)

  return (
    <main className="product">
      <section className="summary">
        <div className="header">
          <div className="header__left">
            <img className="logo" src={post.image}/>
            <h1>{post.title}</h1>
            <h2>{post.tagline}</h2>
          </div>
          <div className="header__right">
            <div className="buttons">
              <a className="buttons__link" href={post.url}>Visit</a>
              <button className="buttons__vote" onClick={onVoteClick}>
                {
                  hasVote
                  ? `UNVOTE ${post.votesCount}`
                  : `UPVOTE ${post.votesCount}`
                }  
              </button>
            </div>
          </div>
        </div>

        <div className="description">
          {post.description}
        </div>
        
        <div className="user-list">
          {userList}
        </div>
      </section>

      <section className="comments">
        <form className="comments__form" onSubmit={handleSubmit}>
          <UserIcon src="https://via.placeholder.com/200x200" />
          <input
            type="comment"
            name="comment"
            placeholder="What do you think?"
            value={inputs.comment}
            onChange={handleChange}
          />
          <button type="submit">Comment</button>
        </form>
        <ul className="comments__list">
          {comments}
        </ul>
      </section>

      <section className="stats">
        <h2>About this launch</h2>
        <div className="stats__container">
          {stats}
        </div>
        <footer>
          <span>Report</span>  •  <span>Edit this page</span>
        </footer>
      </section>
      
      <section className="recirc">
        <div className="recirc__header">
          <hr/>
          <div className="text">
            <h2>Trending launches</h2>
          </div>
          <hr/>
        </div>
        <div className="recirc__posts">
          {recircPosts}
        </div>
      </section>
    </main>
  );
}

renderComponent(PostsShow);
