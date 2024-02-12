import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser, AuthContextType } from '@/types';
import { useFetchCurrentUser } from '@/lib/react-query/queriesAndMutations';

export const INITIAL_USER: IUser = {
    id: '',
    email: '',
    number: '',
    businessname: '',
    location: '',
};

const INITIAL_STATE: AuthContextType = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => {},
};

const AuthContext = createContext<AuthContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    const { data: currentUser, isLoading: isFetchingCurrentUser, isError } = useFetchCurrentUser();

    useEffect(() => {
        if (currentUser && !isError) {
            setUser(currentUser);
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            if (!isFetchingCurrentUser) {
                // navigate('/sign-in');
            }
        }
    }, [currentUser, isError, isFetchingCurrentUser, navigate]);

    const checkAuthUser = async () => {};
      
    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            isLoading: isFetchingCurrentUser,
            isAuthenticated,
            setIsAuthenticated,
            checkAuthUser: async () => { await checkAuthUser(); }
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);
