// src/auth.js
import { gql } from '@apollo/client';
import client from './apolloClient';

let refreshIntervalId = null; // Holds the interval ID for clearing it when needed

export const startTokenRefreshLoop = (refreshTokenValue) => {
  // Clear any existing intervals to avoid multiple loops
  if (refreshIntervalId) clearInterval(refreshIntervalId);

  refreshIntervalId = setInterval(async () => {
    try {
      const newTokens = await refreshToken(refreshTokenValue);
      if (newTokens.token && newTokens.refreshToken) {
        localStorage.setItem('token', newTokens.token);
        localStorage.setItem('refreshToken', newTokens.refreshToken);
        console.log('Tokens are refreshed');
      } else {
        console.log('Failed to refresh tokens:', newTokens.errors);
        // Handle token refresh failure (e.g., stop the interval and log out the user)
        stopTokenRefreshLoop();
        // Implement a logout or token expiration handling here
      }
    } catch (error) {
      console.error('Error refreshing tokens:', error);
      // Handle unexpected errors (e.g., network issues)
    }
  }, 120000); // Refresh every 2 minutes (120000 milliseconds)
};

export const stopTokenRefreshLoop = () => {
  if (refreshIntervalId) clearInterval(refreshIntervalId);
};

export const authenticateUser = async (mobile) => {
  const mutation = gql`
  mutation TokenCreate($mobile: String!) {
    tokenCreate(mobileno: $mobile) {
      token
      refreshToken
      csrfToken
      user
      errors
    }
  }  
  `;

  const result = await client.mutate({
    mutation,
    variables: {
      mobile
    },
  });

  return result.data.tokenCreate;
};

export const refreshToken = async (refreshToken) => {
  const mutation = gql`
    mutation RefreshToken($refreshToken: String!) {
      refreshToken(refreshToken: $refreshToken) {
        token
        refreshToken
        errors {
          field
          message
        }
      }
    }
  `;

  const result = await client.mutate({
    mutation,
    variables: {
      refreshToken,
    },
  });

  return result.data.refreshToken;
};
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null;
};