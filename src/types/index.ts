export type AuthContextType = {
    user: IUser;
    isLoading: boolean;
    isAuthenticated: boolean;
    setUser: (user: IUser) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    checkAuthUser: () => Promise<void>;
}

export type INewUser = {
    accountId: string;
    businessname: string;
    location: string;
    number: string;
    email: string;
    password: string;
};

export type IUser = {
    id: string;
    number: string;
    email: string;
    businessname: string;
    location: string;
};

export type ISignInUser = {
    email: string;
    password: string;
};