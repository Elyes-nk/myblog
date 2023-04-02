import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

const API_URL = `http://localhost:3030/graphql`;

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
});

function useLogin({ username, password }) {
  return useQuery(
    ["login", username],
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
  return useQuery(
    ["create-user", username],
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
    const { cat, user } = options;
    const { getPosts } = await graphQLClient.request(
      gql`
        query GetPosts($user: ID, $cat: String) {
          getPosts(user: $user, cat: $cat) {
            _id
            title
            desc
            img
            draft
            updatedAt
            user {
              username
            }
          }
        }
      `,
      { user, cat }
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

export { useLogin, useCreateUser, useGetPost, useGetPosts };
