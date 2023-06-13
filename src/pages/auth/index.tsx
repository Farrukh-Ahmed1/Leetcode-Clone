import { authModalState } from '@/atoms/authModalAtom';
import AuthModal from '@/components/Modals/AuthModal';
import Navbar from '@/components/Navbar/Navbar';
import { auth } from '@/firebase/firebase';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue } from 'recoil';

type AuthPageProps = {};

const AuthPage:React.FC<AuthPageProps> = () => {
    const authModal = useRecoilValue(authModalState);
    const [user, loading, error] = useAuthState(auth);
    const [pageLoading, setPageLoading] = React.useState(true);
    const router = useRouter();

    useEffect(() => {
        if(user) router.push('/');
        if(!loading && !user) setPageLoading(false);
    }, [user,router,loading]);
    if(pageLoading) return null;
    
    return (
        <>
            <div className='bg-gradient-to-t from-gray-950 to to-gray-900 h-screen relative'>
                <div className="max-w-7xl mx-auto">
                    <Navbar/>
                    <div className='flex items-center justify-center h-[calc(100vh-5rem)] 
                    pointer-events-none select-none'>
                        <Image src="/hero.png" alt="Main Image" width={700} height={700}/>
                    </div>
                    {authModal.isOpen && <AuthModal/>}
                </div>
            </div>
        </>
    );
}
export default AuthPage;