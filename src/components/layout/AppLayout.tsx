import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Compass, TreeDeciduous, Users, Gift, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function Navigation() {
  const tabs = [
    { name: 'Explore', href: '/', icon: Compass },
    { name: 'My Orchard', href: '/orchard', icon: TreeDeciduous },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-white border-t border-stone-200 flex items-center justify-center px-6 pb-safe z-50">
      <nav className="w-full flex justify-between items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.name}
              to={tab.href}
              className={({ isActive }) => 
                cn(
                  "flex flex-col items-center gap-1 transition-colors duration-200 text-center",
                  isActive ? "text-[#1A5F5A]" : "text-[#6B6B6B]"
                )
              }
            >
              <Icon className="w-6 h-6 mb-0.5" strokeWidth={1.5} />
              <span className="text-[9px] uppercase tracking-wider font-bold">{tab.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}

export function AppLayout() {
  const location = useLocation();
  const hideNav = location.pathname.includes('/login');

  return (
    <div className="min-h-[100dvh] bg-bg-base flex flex-col max-w-md mx-auto relative shadow-2xl overflow-hidden">
      <main className={cn("flex-1 w-full relative flex flex-col", !hideNav && "pb-[70px]")}>
        <Outlet />
      </main>
      {!hideNav && <Navigation />}
    </div>
  );
}
