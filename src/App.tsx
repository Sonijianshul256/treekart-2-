/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useStore } from './store/useStore';
import { AppLayout } from './components/layout/AppLayout';
import Explore from './pages/Explore';
import Orchard from './pages/Orchard';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Learn from './pages/Learn';
import TreeDetail from './pages/TreeDetail';

export default function App() {
  const { setUser, setIsLoading } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setIsLoading]);

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Explore />} />
        <Route path="orchard" element={<Orchard />} />
        <Route path="orchard/:id" element={<TreeDetail />} />
        <Route path="community" element={<Community />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/learn" element={<Learn />} />
    </Routes>
  );
}

