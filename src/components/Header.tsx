import React from 'react';
import { Mountain, Bell, Bookmark, Share2, Search, X } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onOpenNotifications: () => void;
  onShare: () => void;
  notificationCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  isBookmarked,
  onToggleBookmark,
  onOpenNotifications,
  onShare,
  notificationCount
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#fcf9f2]/90 backdrop-blur-md border-b border-[#c1c8c2]/20">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 w-full max-w-md mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#1b3b2b]/10 text-[#032517]">
            <Mountain className="w-5 h-5 text-[#032517]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#032517] font-display">
            北埔徒步
          </span>
        </div>

        {/* Quick Action Icons */}
        <div className="flex items-center gap-1">
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="relative w-8 h-8 rounded-full flex items-center justify-center text-[#424843] hover:text-[#032517] active:scale-95 transition-all"
          >
            <Bell className="w-[20px] h-[20px]" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse" />
            )}
          </button>

          <button
            onClick={onToggleBookmark}
            aria-label="Favorite"
            className={`w-8 h-8 rounded-full flex items-center justify-center active:scale-95 transition-all ${
              isBookmarked
                ? 'text-[#815433] bg-[#fec299]/30'
                : 'text-[#424843] hover:text-[#032517]'
            }`}
          >
            <Bookmark
              className={`w-[20px] h-[20px] ${
                isBookmarked ? 'fill-[#815433]' : ''
              }`}
            />
          </button>

          <button
            onClick={onShare}
            aria-label="Share"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#424843] hover:text-[#032517] active:scale-95 transition-all"
          >
            <Share2 className="w-[20px] h-[20px]" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 pb-3 max-w-md mx-auto">
        <div className="relative flex items-center w-full">
          <Search className="absolute left-3 w-[18px] h-[18px] text-[#727973] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索路线或装备..."
            className="w-full pl-9 pr-24 py-2 bg-[#f6f3ec] rounded-full text-[13px] text-[#1c1c18] placeholder:text-[#727973] border border-[#c1c8c2]/40 focus:outline-none focus:border-[#032517] focus:ring-1 focus:ring-[#032517] transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-20 text-[#727973] hover:text-[#1c1c18] p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <div className="absolute right-2 flex items-center gap-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#e5e2db] text-[#424843] text-[11px] font-semibold">
              徒步山峰
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
