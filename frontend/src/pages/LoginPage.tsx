import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Navigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';

const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters')
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage = () => {
    const { login, isAuthenticated, loginLoading, loginError } = useAuth();
    const [serverError, setServerError] = useState<string>('');
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    // Redirect if already authenticated
    if (isAuthenticated) {
        return <Navigate to={from} replace />;
    }

    const onSubmit = async (data: LoginFormData) => {
        try {
            setServerError('');
            await login(data);
            // Navigation will happen automatically via the useAuth hook and redirect logic
        } catch (error: any) {
            console.error('Login error:', error);
            const errorMessage = error?.response?.data?.message || error?.message || 'Login failed. Please try again.';
            setServerError(errorMessage);
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-background p-4">
            <Card className="p-8 max-w-md w-full">
                <div className="text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold">Welcome Back</h1>
                        <p className="text-muted-foreground">
                            Sign in to your account to continue
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                {...register('email')}
                                className={errors.email ? 'border-destructive' : ''}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                {...register('password')}
                                className={errors.password ? 'border-destructive' : ''}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {(serverError || loginError) && (
                            <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded">
                                {serverError || loginError?.message || 'An error occurred during login'}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loginLoading}
                        >
                            {loginLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
};