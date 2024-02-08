import { useMutation } from '@tanstack/react-query';
import { INewUser } from '@/types';

const createUserAccount = async (user: INewUser): Promise<any> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
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

const signInAccount = async (user: { email: string; password: string }): Promise<any> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error || 'Failed to sign in');
  }
  return response.json();
};

export const useCreateUserAccount = () => useMutation({
  mutationFn: createUserAccount
});

export const useSignInAccount = () => useMutation({
  mutationFn: signInAccount
});
