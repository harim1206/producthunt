import gql from 'graphql-tag';

// fetch post data
export const POST_QUERY = gql`
  query POST_QUERY($id: ID!) {
    post(id: $id) {
      id
      title
      image
      tagline
      description
      url
      votesCount
      commentsCount
      viewsCount
      dailyFeedPosition
      weeklyFeedPosition

      makers {
        id
        image
      }
      commenters {
        id
        image
      }
      voters {
        id
        image
      }
      comments {
        id
        user {
          id
          image
          name
          username
        }
        text
      }
    }
  }
`;

export const POSTS_ALL_QUERY = gql`
  query POSTS_ALL {
    postsAll {
      id
      image
      title
      tagline
      votesCount
      commentsCount
    }
  }
`

// mutation for adding a vote to the post
export const VOTE_ADD_MUTATION = gql`  
  mutation VOTE_ADD_MUTATION($id: ID!) {
    voteAdd (postId: $id){
      post {
        id
        title
        votesCount
      }
    }
  }
`

// mutation for removing a vote from the post
export const VOTE_REMOVE_MUTATION = gql`  
  mutation VOTE_REMOVE_MUTATION($id: ID!) {
    voteRemove (postId: $id){
      post {
        id
        title
        votesCount
      }
    }
  }
`

// query current user that is logged in
export const VIEWER_QUERY = gql`
  query VIEWER_QUERY {
    viewer{
      id
    }
  }
`