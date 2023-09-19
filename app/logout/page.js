"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const LogOutPage = () => {
  const router = useRouter();
  const { signOutUser } = useAuth();

  useEffect(() => {
    // Perform the sign-out action
    const signOut = async () => {
      try {
        await signOutUser();
        // Redirect to the desired page after logout (e.g., the homepage)
        router.push('/');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };

    // Call the sign-out function
    signOut();
  }, [router, signOutUser]);

  return <div>
    
    Logging out...
    
    </div>;
};

export default LogOutPage;
