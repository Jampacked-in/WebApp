import axios, { AxiosError } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { INewUser, IUser, ISignInUser } from '@/types';

const REACT_APP_API_URL = 'http://localhost:3000/api/auth';

const createUserAccount = async (user: INewUser): Promise<any> => {
  try {
    const response = await axios.post(`${REACT_APP_API_URL}/signup`, user);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || 'Failed to create user account');
    }
    throw error; // If it's not an AxiosError, rethrow it
  }
};

const signInAccount = async (user: ISignInUser): Promise<any> => {
  try {
    const response = await axios.post(`${REACT_APP_API_URL}/login`, user, {
      withCredentials: true 
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || 'Failed to sign in');
    }
    throw error;
  }
};

const signOutAccount = async (): Promise<any> => {
  try {
    const response = await axios.post(`${REACT_APP_API_URL}/logout`, {}, { 
      withCredentials: true 
    });
    window.location.reload();
    return response.data;
  } catch (error) {
    throw new Error('Failed to sign out');
  }
};

const fetchCurrentUser = async (): Promise<IUser> => {
  console.log("called verifyUser")
  try {
    const response = await axios.get(`${REACT_APP_API_URL}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log("hey")
      throw new Error(error.response.data.error || 'Failed to fetch current user');
    }
    throw error;
  }
};

export const useFetchCurrentUser = () => {
  return useQuery<IUser, Error>({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useCreateUserAccount = () => useMutation({
  mutationFn: createUserAccount
});

export const useSignInAccount = () => useMutation({
  mutationFn: signInAccount
});

export const useSignOutAccount = () =>  useMutation({
  mutationFn: signOutAccount
});