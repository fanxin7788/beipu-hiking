import React, { useState } from 'react';
import {
  Heart,
  Send,
  MapPin,
  Image as ImageIcon,
  ChevronDown,
  CornerDownRight,
  Sparkles,
  X
} from 'lucide-react';
import { Comment } from '../types.ts';

interface CommentsSectionProps {
  comments: Comment[];
  onAddComment: (content: string, locationTag?: string, photoUrl?: string) => void;
  onLikeComment: (id: string) => void;
  onShowToast: (msg: string) => void;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({
  comments,
  onAddComment,
  onLikeComment,
  onShowToast
}) => {
  const [inputText, setInputText] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'likes'>('latest');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [attachedLocation, setAttachedLocation] = useState<string | null>(null);
  const [attachedPhoto, setAttachedPhoto] = useState<string | null>(null);

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'likes') return b.likes - a.likes;
    return 0; // maintain original chronological
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) {
      onShowToast('请输入留言内容后再发送');
      return;
    }
    onAddComment(inputText.trim(), attachedLocation || undefined, attachedPhoto || undefined);
    setInputText('');
    setAttachedLocation(null);
    setAttachedPhoto(null);
    onShowToast('💬 留言发表成功！');
  };

  const toggleLocation = () => {
    if (attachedLocation) {
      setAttachedLocation(null);
    } else {
      setAttachedLocation('新竹·北埔');
      onShowToast('已添加定位：新竹·北埔');
    }
  };

  const togglePhoto = () => {
    if (attachedPhoto) {
      setAttachedPhoto(null);
    } else {
      setAttachedPhoto(
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80'
      );
      onShowToast('已添加徒步装备实拍相片');
    }
  };

  return (
    <section id="forum-section" className="px-4 flex flex-col gap-3">
      {/* Header with Counter and Sort dropdown */}
      <div className="flex items-center justify-between border-b border-[#c1c8c2]/20 pb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-[20px] font-bold text-[#1c1c18] font-display">
            活动讨论与留言
          </h3>
          <span className="px-2 py-0.5 rounded-full bg-[#ebe8e1] text-[#424843] text-[11px] font-bold">
            {comments.length} 条
          </span>
        </div>

        {/* Sort Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="text-[12px] font-semibold text-[#032517] flex items-center gap-1 hover:text-[#1b3b2b]"
          >
            <span>{sortBy === 'latest' ? '最新排序' : '最赞排序'}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {showSortMenu && (
            <div className="absolute right-0 mt-1 w-28 bg-white rounded-lg shadow-lg border border-[#c1c8c2]/30 py-1 z-30">
              <button
                onClick={() => {
                  setSortBy('latest');
                  setShowSortMenu(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-[12px] ${
                  sortBy === 'latest'
                    ? 'font-bold text-[#032517] bg-[#f6f3ec]'
                    : 'text-[#424843]'
                }`}
              >
                最新排序
              </button>
              <button
                onClick={() => {
                  setSortBy('likes');
                  setShowSortMenu(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-[12px] ${
                  sortBy === 'likes'
                    ? 'font-bold text-[#032517] bg-[#f6f3ec]'
                    : 'text-[#424843]'
                }`}
              >
                最赞排序
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Discussion Thread */}
      <div className="flex flex-col gap-3">
        {sortedComments.map((c) => (
          <div
            key={c.id}
            className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-[#c1c8c2]/25 shadow-xs"
          >
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full overflow-hidden bg-[#ebe8e1] shrink-0 border border-[#c1c8c2]/30">
              <img
                src={c.avatar}
                alt={c.author}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Body */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-[#1c1c18]">
                  {c.author}
                </span>
                <span className="text-[11px] text-[#727973] font-medium">
                  {c.time}
                </span>
              </div>

              <p className="text-[13px] text-[#1c1c18] mt-1 leading-relaxed">
                {c.content}
              </p>

              {/* Reply block if present */}
              {c.reply && (
                <div className="mt-2 bg-[#f6f3ec] rounded-lg p-2.5 flex items-start gap-2 border border-[#c1c8c2]/20">
                  <CornerDownRight className="w-3.5 h-3.5 text-[#032517] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[12px] font-bold text-[#032517] mr-1">
                      {c.reply.author} 回复:
                    </span>
                    <span className="text-[12px] text-[#424843] leading-normal">
                      {c.reply.content}
                    </span>
                  </div>
                </div>
              )}

              {/* Comment Actions (Like / Reply) */}
              <div className="mt-2 flex items-center justify-end gap-3 text-[12px]">
                <button
                  onClick={() => onLikeComment(c.id)}
                  className={`flex items-center gap-1 transition-colors ${
                    c.userLiked
                      ? 'text-[#ba1a1a] font-semibold'
                      : 'text-[#727973] hover:text-[#ba1a1a]'
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      c.userLiked ? 'fill-[#ba1a1a]' : ''
                    }`}
                  />
                  <span>{c.likes}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leave a comment input card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-3 border border-[#c1c8c2]/30 flex flex-col gap-2.5 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <label
            htmlFor="comment-input"
            className="text-[11px] font-bold text-[#727973] tracking-wider uppercase"
          >
            发表留言 · SHARE YOUR THOUGHTS
          </label>
          <span className="text-[11px] text-[#815433] flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>社区友善交流</span>
          </span>
        </div>

        <div className="relative">
          <textarea
            id="comment-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={2}
            placeholder="发表对这次徒步的提问或分享准备心得..."
            className="w-full rounded-lg bg-[#f6f3ec] border border-[#c1c8c2]/40 p-2.5 text-[13px] text-[#1c1c18] placeholder:text-[#727973] focus:outline-none focus:ring-1 focus:ring-[#032517] focus:border-[#032517] transition-all resize-none"
          />
        </div>

        {/* Attachment preview pills if selected */}
        {(attachedLocation || attachedPhoto) && (
          <div className="flex items-center gap-2 flex-wrap">
            {attachedLocation && (
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[#c7ebd4] text-[#032517]">
                <MapPin className="w-3 h-3" />
                {attachedLocation}
                <button
                  type="button"
                  onClick={() => setAttachedLocation(null)}
                  className="hover:text-red-700 ml-0.5"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            )}
            {attachedPhoto && (
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[#ffdcc5] text-[#815433]">
                <ImageIcon className="w-3 h-3" />
                已附加装备照片
                <button
                  type="button"
                  onClick={() => setAttachedPhoto(null)}
                  className="hover:text-red-700 ml-0.5"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3 text-[#727973]">
            <button
              type="button"
              onClick={toggleLocation}
              aria-label="Add location"
              className={`p-1 rounded hover:text-[#032517] active:scale-95 transition-colors ${
                attachedLocation ? 'text-[#032517] bg-[#c7ebd4]/50' : ''
              }`}
              title="添加所在地点"
            >
              <MapPin className="w-[18px] h-[18px]" />
            </button>
            <button
              type="button"
              onClick={togglePhoto}
              aria-label="Add photo"
              className={`p-1 rounded hover:text-[#032517] active:scale-95 transition-colors ${
                attachedPhoto ? 'text-[#815433] bg-[#ffdcc5]/50' : ''
              }`}
              title="上传装备照片"
            >
              <ImageIcon className="w-[18px] h-[18px]" />
            </button>
          </div>

          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#032517] text-white text-[13px] font-semibold active:scale-95 hover:bg-[#1b3b2b] transition-all shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span>发送留言</span>
          </button>
        </div>
      </form>
    </section>
  );
};
