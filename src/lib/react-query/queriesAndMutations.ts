import { useMutation, useQuery } from '@tanstack/react-query';
import { INewUser, IUser, ISignInUser } from '@/types';
const REACT_APP_API_URL = 'http://localhost:3000/api/auth';

const createUserAccount = async (user: INewUser): Promise<any> => {
  const response = await fetch(`${REACT_APP_API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error || 'Failed to create user account');
  }
  return response.json();
};

const signInAccount = async (user: ISignInUser): Promise<any> => {
  console.log("hello from queries")
  const response = await fetch(`${REACT_APP_API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  console.log("hello-after-response")
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error || 'Failed to sign in');
  }
  return response.json();
};

const signOutAccount = async (): Promise<any> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
    method: 'POST',
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error || 'Failed to sign out');
  }
  return response.json();
};

const fetchCurrentUser = async (): Promise<IUser> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/current-user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    },
  });
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }
  return response.json();
};

export const useFetchCurrentUser = () => {
  return useQuery<IUser, Error>({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
  });
};

export const useCreateUserAccount = () => useMutation({
  mutationFn: createUserAccount
});

export const useSignInAccount = () => useMutation({
  mutationFn: signInAccount
});

export const useSignOutAccount = () => useMutation({
  mutationFn: signOutAccount
});
