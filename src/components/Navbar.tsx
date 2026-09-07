import React from 'react';
import { Compass, Mountain, MessageSquare, User } from 'lucide-react';

export type NavTab = 'activity' | 'route' | 'forum' | 'profile';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-[#fcf9f2]/95 backdrop-blur-lg border-t border-[#c1c8c2]/30 max-w-md mx-auto right-0 shadow-lg">
      {/* 1. 活动 */}
      <button
        onClick={() => setActiveTab('activity')}
        className={`flex flex-col items-center justify-center transition-all duration-150 active:scale-95 py-1 px-3.5 rounded-full ${
          activeTab === 'activity'
            ? 'text-[#032517] bg-[#1b3b2b]/15 font-bold'
            : 'text-[#424843] hover:text-[#032517]'
        }`}
      >
        <Compass
          className={`w-[22px] h-[22px] ${
            activeTab === 'activity' ? 'stroke-[2.5]' : 'stroke-[1.8]'
          }`}
        />
        <span className="text-[11px] mt-0.5">活动</span>
      </button>

      {/* 2. 路线 */}
      <button
        onClick={() => setActiveTab('route')}
        className={`flex flex-col items-center justify-center transition-all duration-150 active:scale-95 py-1 px-3.5 rounded-full ${
          activeTab === 'route'
            ? 'text-[#032517] bg-[#1b3b2b]/15 font-bold'
            : 'text-[#424843] hover:text-[#032517]'
        }`}
      >
        <Mountain
          className={`w-[22px] h-[22px] ${
            activeTab === 'route' ? 'stroke-[2.5]' : 'stroke-[1.8]'
          }`}
        />
        <span className="text-[11px] mt-0.5">路线</span>
      </button>

      {/* 3. 讨论 */}
      <button
        onClick={() => setActiveTab('forum')}
        className={`flex flex-col items-center justify-center transition-all duration-150 active:scale-95 py-1 px-3.5 rounded-full ${
          activeTab === 'forum'
            ? 'text-[#032517] bg-[#1b3b2b]/15 font-bold'
            : 'text-[#424843] hover:text-[#032517]'
        }`}
      >
        <MessageSquare
          className={`w-[22px] h-[22px] ${
            activeTab === 'forum' ? 'stroke-[2.5]' : 'stroke-[1.8]'
          }`}
        />
        <span className="text-[11px] mt-0.5">讨论</span>
      </button>

      {/* 4. 我的 */}
      <button
        onClick={() => setActiveTab('profile')}
        className={`flex flex-col items-center justify-center transition-all duration-150 active:scale-95 py-1 px-3.5 rounded-full ${
          activeTab === 'profile'
            ? 'text-[#032517] bg-[#1b3b2b]/15 font-bold'
            : 'text-[#424843] hover:text-[#032517]'
        }`}
      >
        <User
          className={`w-[22px] h-[22px] ${
            activeTab === 'profile' ? 'stroke-[2.5]' : 'stroke-[1.8]'
          }`}
        />
        <span className="text-[11px] mt-0.5">我的</span>
      </button>
    </nav>
  );
};
