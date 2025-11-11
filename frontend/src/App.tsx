import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const App = () => {
    const [count, setCount] = useState(0);

    return (
        <div className='h-screen w-screen flex items-center justify-center bg-background'>
            <Card className='p-8 max-w-md w-full mx-4'>
                <div className='text-center space-y-6'>
                    <h1 className='text-2xl font-bold'>Welcome to React 19!</h1>
                    <div className='space-y-4'>
                        <p className='text-xl font-mono'>{count}</p>
                        <div className='flex gap-4 justify-center'>
                            <Button 
                                variant='outline' 
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
                </div>
            </Card>
        </div>
    );
};
