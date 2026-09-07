import React, { useState, useEffect } from 'react';
import { INITIAL_HIKING_EVENT } from './data/hikingData.ts';
import { HikingEvent, RegisteredTicket, GearItem, Comment } from './types.ts';
import { Header } from './components/Header.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ScheduleLocationCard } from './components/ScheduleLocationCard.tsx';
import { LeaderCard } from './components/LeaderCard.tsx';
import { RouteSection } from './components/RouteSection.tsx';
import { GearChecklist } from './components/GearChecklist.tsx';
import { CommentsSection } from './components/CommentsSection.tsx';
import { BottomBar } from './components/BottomBar.tsx';
import { Navbar, NavTab } from './components/Navbar.tsx';
import { RegistrationModal } from './components/RegistrationModal.tsx';
import { MapModal } from './components/MapModal.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { NotificationModal } from './components/NotificationModal.tsx';
import { MyProfileView } from './components/MyProfileView.tsx';
import { Toast } from './components/Toast.tsx';

export default function App() {
  const [event, setEvent] = useState<HikingEvent>(INITIAL_HIKING_EVENT);
  const [activeTab, setActiveTab] = useState<NavTab>('activity');
  const [searchQuery, setSearchQuery] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userTicket, setUserTicket] = useState<RegisteredTicket | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [contactChannel, setContactChannel] = useState<'line' | 'whatsapp' | null>(null);
  const [notificationCount, setNotificationCount] = useState(3);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  const handleToggleBookmark = () => {
    const next = !isBookmarked;
    setIsBookmarked(next);
    showToast(next ? '⭐ 已收藏此徒步活动' : '已取消收藏');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: event.title,
          text: `${event.subtitle} - 2026年9月10日出发`,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('🔗 活动链接已复制至剪贴板，可直接分享给好友！');
    }
  };

  const handleToggleGear = (gearId: string) => {
    setEvent((prev) => ({
      ...prev,
      gearList: prev.gearList.map((item) =>
        item.id === gearId ? { ...item, checked: !item.checked } : item
      )
    }));
  };

  const handleAddComment = (content: string, locationTag?: string, photoUrl?: string) => {
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: userTicket ? userTicket.userName : '我 (山友)',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      time: '刚刚',
      content: locationTag ? `【${locationTag}】 ${content}` : content,
      likes: 1,
      userLiked: true
    };

    setEvent((prev) => ({
      ...prev,
      comments: [newComment, ...prev.comments]
    }));
  };

  const handleLikeComment = (commentId: string) => {
    setEvent((prev) => ({
      ...prev,
      comments: prev.comments.map((c) => {
        if (c.id === commentId) {
          const nextLiked = !c.userLiked;
          return {
            ...c,
            userLiked: nextLiked,
            likes: nextLiked ? c.likes + 1 : Math.max(0, c.likes - 1)
          };
        }
        return c;
      })
    }));
  };

  const handleRegisterSuccess = (ticket: RegisteredTicket) => {
    setUserTicket(ticket);
    setIsRegisterModalOpen(false);
    setEvent((prev) => ({
      ...prev,
      spotsLeft: Math.max(0, prev.spotsLeft - 1)
    }));
  };

  const handleCancelRegistration = () => {
    if (window.confirm('确定要取消此次徒步报名吗？名额将重新释放给其他山友。')) {
      setUserTicket(null);
      setEvent((prev) => ({
        ...prev,
        spotsLeft: prev.spotsLeft + 1
      }));
      showToast('已取消报名，期待下次与您同行！');
    }
  };

  // Filtered gear or comments based on search query
  const filteredGearList = searchQuery
    ? event.gearList.filter((g) =>
        g.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : event.gearList;

  const filteredComments = searchQuery
    ? event.comments.filter(
        (c) =>
          c.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : event.comments;

  return (
    <div className="bg-[#fcf9f2] text-[#1c1c18] font-body min-h-screen flex justify-center selection:bg-[#032517] selection:text-white">
      {/* Mobile Device Shell / Viewport Wrapper matching max-w-md */}
      <div className="w-full max-w-md bg-[#fcf9f2] min-h-screen relative flex flex-col pb-36 shadow-2xl">
        {/* Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isBookmarked={isBookmarked}
          onToggleBookmark={handleToggleBookmark}
          onOpenNotifications={() => {
            setIsNotificationOpen(true);
            setNotificationCount(0);
          }}
          onShare={handleShare}
          notificationCount={notificationCount}
        />

        {/* Search Results Alert if active */}
        {searchQuery && (
          <div className="mx-4 mb-2 p-2 bg-[#f1eee7] rounded-lg text-[12px] text-[#424843] flex items-center justify-between">
            <span>
              已过滤搜索：<strong>"{searchQuery}"</strong> (匹配装备与留言)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#032517] font-semibold underline ml-2"
            >
              重置
            </button>
          </div>
        )}

        {/* Tab View Content */}
        {activeTab === 'profile' ? (
          <MyProfileView
            userTicket={userTicket}
            event={event}
            gearList={event.gearList}
            onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
            onCancelRegistration={handleCancelRegistration}
            onShowToast={showToast}
          />
        ) : activeTab === 'route' ? (
          /* Focused Route Tab View */
          <main className="flex-1 flex flex-col gap-5 pt-1">
            <RouteSection
              event={event}
              onOpenMapModal={() => setIsMapModalOpen(true)}
            />
            <ScheduleLocationCard
              event={event}
              onOpenMapModal={() => setIsMapModalOpen(true)}
              onShowToast={showToast}
            />
            <LeaderCard
              event={event}
              onShowToast={showToast}
              onOpenContactModal={(ch) => setContactChannel(ch)}
            />
          </main>
        ) : activeTab === 'forum' ? (
          /* Focused Forum Tab View */
          <main className="flex-1 flex flex-col gap-5 pt-1">
            <CommentsSection
              comments={filteredComments}
              onAddComment={handleAddComment}
              onLikeComment={handleLikeComment}
              onShowToast={showToast}
            />
            <LeaderCard
              event={event}
              onShowToast={showToast}
              onOpenContactModal={(ch) => setContactChannel(ch)}
            />
          </main>
        ) : (
          /* Default Full Activity View (exact replica of provided HTML) */
          <main className="flex-1 flex flex-col gap-5 pt-1">
            {/* 1. HERO SECTION */}
            <HeroSection event={event} />

            {/* 2. ELEVATED INFORMATION CARD (Date, Time, Location & Mini Map) */}
            <ScheduleLocationCard
              event={event}
              onOpenMapModal={() => setIsMapModalOpen(true)}
              onShowToast={showToast}
            />

            {/* 3. ORGANIZER & CONTACT CARD */}
            <LeaderCard
              event={event}
              onShowToast={showToast}
              onOpenContactModal={(ch) => setContactChannel(ch)}
            />

            {/* 4. ILLUSTRATED ROUTE MAP SECTION */}
            <RouteSection
              event={event}
              onOpenMapModal={() => setIsMapModalOpen(true)}
            />

            {/* 5. GEAR & HIGHLIGHTS CHECKLIST */}
            <GearChecklist
              gearList={filteredGearList}
              gearIntro={event.gearIntro}
              onToggleGear={handleToggleGear}
              onShowToast={showToast}
            />

            {/* 6. DISCUSSION & COMMENTS (Q&A) */}
            <CommentsSection
              comments={filteredComments}
              onAddComment={handleAddComment}
              onLikeComment={handleLikeComment}
              onShowToast={showToast}
            />
          </main>
        )}

        {/* 7. STICKY BOTTOM ACTION BAR (Transactional CTA + Registration Status) */}
        <BottomBar
          spotsLeft={event.spotsLeft}
          userTicket={userTicket}
          onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
          onViewTicket={() => setActiveTab('profile')}
        />

        {/* 8. BOTTOM NAVBAR (Shared Component Anchor) */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Modals */}
        <RegistrationModal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
          event={event}
          onSuccess={handleRegisterSuccess}
          onShowToast={showToast}
        />

        <MapModal
          isOpen={isMapModalOpen}
          onClose={() => setIsMapModalOpen(false)}
          event={event}
          onShowToast={showToast}
        />

        <ContactModal
          channel={contactChannel}
          onClose={() => setContactChannel(null)}
          event={event}
          onShowToast={showToast}
        />

        <NotificationModal
          isOpen={isNotificationOpen}
          onClose={() => setIsNotificationOpen(false)}
          onClearAll={() => setNotificationCount(0)}
        />

        {/* Toast Feedback */}
        <Toast message={toastMessage} />
      </div>
    </div>
  );
}
