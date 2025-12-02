import React from 'react';
import { Home, BookOpen, Shield, User, Menu, ShoppingBag, Settings } from 'lucide-react';
import { Screen, UserProfile } from '../types';

interface LayoutProps {
  currentScreen: Screen;
  setScreen: (s: Screen) => void;
  user: UserProfile;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentScreen, setScreen, user, children }) => {
  const navItems = [
    { id: Screen.HOME, icon: Home, label: 'Ana Sayfa' },
    { id: Screen.LEADERBOARD, icon: Shield, label: 'Lig' },
    { id: Screen.SHOP, icon: ShoppingBag, label: 'Mağaza' },
    { id: Screen.PROFILE, icon: User, label: 'Profil' },
    { id: Screen.ADMIN, icon: Settings, label: 'Admin' },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white max-w-7xl mx-auto shadow-xl overflow-hidden">
      
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 border-r-2 border-gray-200 p-4">
        <div className="mb-8 px-4">
          <h1 className="text-3xl font-extrabold text-primary tracking-tighter">Sözelio</h1>
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className={`flex items-center w-full p-3 rounded-xl transition-colors font-bold uppercase tracking-wide text-sm
                ${currentScreen === item.id 
                  ? 'bg-blue-50 text-blue-500 border-2 border-blue-200' 
                  : 'text-gray-500 hover:bg-gray-100 border-2 border-transparent'}`}
            >
              <item.icon className="w-6 h-6 mr-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Top Header (Mobile & Desktop) */}
        <header className="h-16 border-b-2 border-gray-200 flex items-center justify-between px-4 bg-white z-10 shrink-0">
          <div className="md:hidden">
            <h1 className="text-2xl font-extrabold text-primary tracking-tighter">Sözelio</h1>
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
             {/* Flags / Course */}
             <div className="hidden sm:flex items-center">
               <span className="bg-gray-100 px-3 py-1 rounded-lg font-bold text-gray-500 text-xs uppercase">{user.course} - {user.branch}</span>
             </div>

             {/* Streak */}
             <div className="flex items-center gap-1">
                <span className="text-orange-500 font-bold">{user.streak}</span>
                <span className="text-2xl">🔥</span>
             </div>

             {/* Gems */}
             <div className="flex items-center gap-1">
                <span className="text-brand-red font-bold">{user.gems}</span>
                <span className="text-2xl">💎</span>
             </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth pb-20 md:pb-0">
          {children}
        </div>

        {/* Bottom Nav (Mobile Only) */}
        <nav className="md:hidden absolute bottom-0 left-0 right-0 h-20 bg-white border-t-2 border-gray-200 flex justify-around items-center px-2 z-20 pb-4">
           {navItems.map((item) => (
             <button
               key={item.id}
               onClick={() => setScreen(item.id)}
               className={`p-2 rounded-lg flex flex-col items-center justify-center transition-transform active:scale-95
                 ${currentScreen === item.id ? 'text-brand-blue' : 'text-gray-400'}`}
             >
               <item.icon className={`w-7 h-7 ${currentScreen === item.id ? 'stroke-2' : 'stroke-2'}`} />
             </button>
           ))}
        </nav>
      </main>
    </div>
  );
};