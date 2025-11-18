import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

export const DashboardPage = () => {
    const { user, logout, logoutLoading } = useAuth();
    const [count, setCount] = useState(0);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-background p-4">
            <Card className="p-8 max-w-md w-full">
                <div className="text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold">Welcome to React 19!</h1>
                        <p className="text-muted-foreground">
                            Hello, {user?.name || user?.email}!
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Counter Demo</p>
                            <p className="text-xl font-mono">{count}</p>
                        </div>
                        <div className="flex gap-4 justify-center">
                            <Button 
                                variant="outline" 
                                onClick={() => setCount(count - 1)}
                            >
                                -
                            </Button>
                            <Button 
                                onClick={() => setCount(count + 1)}
                            >
                                +
                            </Button>
                        </div>
                    </div>

                    <div className="pt-4 border-t">
                        <Button
                            variant="outline"
                            onClick={handleLogout}
                            disabled={logoutLoading}
                            className="w-full"
                        >
                            {logoutLoading ? 'Signing out...' : 'Sign Out'}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};