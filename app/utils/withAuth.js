"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';


export function withAuth(Component) {
  return () => {
    const {isLoggedIn} = useAuth(); 
    const router = useRouter();

    useEffect(() => {
      // Check if the user is logged in
      if (!isLoggedIn) {
        // Redirect the user to the login page 
        router.push('/signIn'); 
      }
    }, [[isLoggedIn, router]]);

    return <Component />;
  };
}