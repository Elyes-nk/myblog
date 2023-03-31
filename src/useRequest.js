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
              posts
              accessToken
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

function useGetPosts() {
  return useQuery("get-posts", async () => {
    const { getPostList } = await graphQLClient.request(gql`
      query {
        getPostList {
          items {
            _id
            title
            desc
            img
            draft
            user
          }
        }
      }
    `);
    return getPostList;
  });
}

function useGetPost(postId) {
  return useQuery(["get-post", postId], async () => {
    const { getPost } = await graphQLClient.request(
      gql`
        query getPost($postId: ID!) {
          getPost(id: $postId) {
            _id
            title
            desc
            img
            draft
            user
          }
        }
      `,
      { postId }
    );
    return getPost;
  });
}

export { useLogin, useCreateUser, useGetPost, useGetPosts };
