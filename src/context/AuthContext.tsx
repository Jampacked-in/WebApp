import { getCurrentUser } from '@/lib/appwrite/api';
import { IContextType, IUser } from '@/types';
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const INITIAL_USER = {
    id: '',
    email: '',
    number: '',
    businessname: '',
    location: '',
};

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({children} : {children: React.ReactNode}) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();
    const checkAuthUser = async () => {
        setIsLoading(true);
        try {
            const currentAccount = await getCurrentUser();
            if (currentAccount) {
                setUser(currentAccount);
                setIsAuthenticated(true);
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if(
            localStorage.getItem('cookieFallback')==='[]' || localStorage.getItem('cookieFallback')===null
        ) navigate('/sign-in');
        checkAuthUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isLoading,
                isAuthenticated,
                setIsAuthenticated,
                checkAuthUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);