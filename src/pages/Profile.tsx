import React from 'react';
import { useStore } from '../store/useStore';
import { auth } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

export default function Profile() {
  const { user } = useStore();

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (e: any) {
      if (e.code === 'auth/popup-closed-by-user') {
        console.log('Sign-in popup closed by user.');
      } else {
        console.error(e);
      }
    }
  };

  return (
    <div className="p-4 pt-12">
      <h1 className="text-3xl font-heading font-bold text-primary mb-2">Profile</h1>
      
      {user ? (
        <div className="mt-8">
          <div className="flex items-center gap-4 mb-8">
            <img 
              src={user.photoURL || `https://ui-avatars.com/api/?name=${user.name}&background=1A5F5A&color=fff`} 
              alt="Avatar" 
              className="w-20 h-20 rounded-full border-4 border-surface shadow-sm object-cover"
            />
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-text-sub">{user.email}</p>
            </div>
          </div>
          
          <button 
            onClick={() => signOut(auth)}
            className="w-full py-4 rounded-xl bg-surface border border-gray-200 text-error font-medium hover:bg-gray-50 transition-colors"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="mt-20 text-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">👋</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">Welcome to Treekart</h2>
          <p className="text-text-sub mb-8 px-4">Sign in to rent trees, track your orchard, and join the community.</p>
          <button 
            onClick={handleLogin}
            className="flex items-center justify-center gap-3 w-full max-w-xs mx-auto py-4 rounded-xl bg-primary text-surface font-semibold shadow-lg hover:bg-primary-light transition-all active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.09-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
            Continue with Google
          </button>
        </div>
      )}
    </div>
  );
}
