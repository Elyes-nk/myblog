import { useMutation, useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

const API_URL = `http://localhost:3030/graphql`;

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
});

function useLogin({ username, password }) {
  return useMutation(
    async () => {
      const { login } = await graphQLClient.request(
        gql`
          query Login($username: String, $password: String) {
            login(username: $username, password: $password) {
              username
              profilePic
              accessToken
              _id
            }
          }
        `,
        { username, password }
      );
      return login;
    },
    { enabled: false, manual: true }
  );
}

function useCreateUser({ username, email, password }) {
  return useMutation(
    async () => {
      const { createUser } = await graphQLClient.request(
        gql`
          query CreateUser(
            $username: String
            $email: String
            $password: String
          ) {
            createUser(
              username: $username
              email: $email
              password: $password
            ) {
              username
            }
          }
        `,
        { username, email, password }
      );
      return createUser;
    },
    { enabled: false, manual: true }
  );
}

function useGetPosts(options = {}) {
  return useQuery(["get-posts", options], async () => {
    const { cat, user, withDraft } = options;
    const { getPosts } = await graphQLClient.request(
      gql`
        query GetPosts($user: ID, $cat: String, $withDraft: Boolean) {
          getPosts(user: $user, cat: $cat, withDraft: $withDraft) {
            _id
            title
            desc
            img
            cat
            draft
            updatedAt
            user {
              username
            }
          }
        }
      `,
      { user, cat, withDraft }
    );
    return getPosts;
  });
}

function useGetPost(postId) {
  return useQuery(["get-post", postId], async () => {
    const { getPost } = await graphQLClient.request(
      gql`
        query GetPost($postId: ID!) {
          getPost(id: $postId) {
            _id
            title
            desc
            img
            draft
            user {
              username
            }
          }
        }
      `,
      { postId }
    );
    return getPost;
  });
}

function useDelete(postId) {
  return useMutation(async (id) => {
    const { createUser } = await graphQLClient.request(
      gql`
        query DeletePost($deletePostId: ID!) {
          deletePost(id: $deletePostId)
        }
      `,
      { deletePostId: postId }
    );
    return createUser;
  });
}

function useCreatePost({ desc, title, cat, img, draft, user }) {
  return useMutation(
    async () => {
      const { createPost } = await graphQLClient.request(
        gql`
          mutation CreatePost(
            $desc: String
            $title: String
            $cat: String
            $img: String
            $draft: Boolean
            $user: ID!
          ) {
            createPost(
              desc: $desc
              title: $title
              cat: $cat
              img: $img
              draft: $draft
              user: $user
            ) {
              _id
              title
              desc
              img
              cat
              draft
              updatedAt
              user {
                username
              }
            }
          }
        `,
        { desc, title, cat, img, draft, user }
      );
      return createPost;
    },
    { enabled: false, manual: true }
  );
}

export {
  useLogin,
  useCreateUser,
  useGetPost,
  useGetPosts,
  useDelete,
  useCreatePost,
};
