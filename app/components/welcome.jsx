"use client"
import { useAuth } from "@/context/AuthContext";

const WelcomeUser = () => {
  const { email, isLoggedIn } = useAuth();

  return (
    <div className="text-xl font-sans relative">
      {isLoggedIn ? (
        <>
          <p>Welcome back</p>
          <h1>{email}</h1>
        </>
      ) : (
        <p>Welcome</p>
      )}
    </div>
  );
};

export default WelcomeUser;
