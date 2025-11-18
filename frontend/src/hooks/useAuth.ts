import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth';
import { getStoredUser, isAuthenticated, clearAuthData } from '@/lib/api';
import type { User, LoginRequest } from '@/types/user';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(getStoredUser());
    const [loading, setLoading] = useState(true);
    const queryClient = useQueryClient();

    useEffect(() => {
        // Check if user is authenticated on mount
        const checkAuth = () => {
            const authenticated = isAuthenticated();
            const storedUser = getStoredUser();
            
            if (authenticated && storedUser) {
                setUser(storedUser);
            } else {
                setUser(null);
                clearAuthData();
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const loginMutation = useMutation({
        mutationFn: (credentials: LoginRequest) => authService.login(credentials),
        onSuccess: (response) => {
            setUser(response.user);
            queryClient.invalidateQueries();
        },
        onError: (error) => {
            console.error('Login failed:', error);
            setUser(null);
            clearAuthData();
        }
    });

    const logoutMutation = useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            setUser(null);
            clearAuthData();
            queryClient.clear();
        },
        onError: (error) => {
            console.error('Logout error:', error);
            // Clear auth data anyway
            setUser(null);
            clearAuthData();
            queryClient.clear();
        }
    });

    const login = (credentials: LoginRequest) => {
        return loginMutation.mutateAsync(credentials);
    };

    const logout = () => {
        return logoutMutation.mutateAsync();
    };

    return {
        user,
        login,
        logout,
        isAuthenticated: !!user,
        loading,
        loginLoading: loginMutation.isPending,
        loginError: loginMutation.error,
        logoutLoading: logoutMutation.isPending
    };
};