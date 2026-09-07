import React, { useState } from 'react';
import { Calendar, Clock, CalendarPlus, MapPin, Map, Check, ExternalLink } from 'lucide-react';
import { HikingEvent } from '../types.ts';
import { downloadICalFile } from '../utils/calendar.ts';

interface ScheduleLocationCardProps {
  event: HikingEvent;
  onOpenMapModal: () => void;
  onShowToast: (msg: string) => void;
}

export const ScheduleLocationCard: React.FC<ScheduleLocationCardProps> = ({
  event,
  onOpenMapModal,
  onShowToast
}) => {
  const [calendarAdded, setCalendarAdded] = useState(false);

  const handleAddCalendar = () => {
    downloadICalFile({
      title: event.title,
      description: `${event.subtitle}\n集合点：${event.departureCoords}\n路线：${event.routeName} (全长 ${event.distanceKm}km)`,
      location: `${event.departureLocation}, ${event.departureCoords}`,
      startDate: '2026-09-10',
      startTime: '07:30',
      endTime: '15:30'
    });
    setCalendarAdded(true);
    onShowToast('📅 已下载 iCal 行程文件，已成功添加徒步提醒！');
    setTimeout(() => setCalendarAdded(false), 4000);
  };

  const handleOpenGoogleCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=20260909T233000Z/20260910T073000Z&details=${encodeURIComponent(
      event.subtitle + ' ' + event.departureCoords
    )}&location=${encodeURIComponent(event.departureLocation)}`;
    window.open(gcalUrl, '_blank');
  };

  return (
    <section className="px-4">
      <div className="bg-white rounded-xl p-4 border border-[#c1c8c2]/30 shadow-[0_4px_20px_-2px_rgba(27,59,43,0.06)] flex flex-col gap-4">
        {/* Date & Time Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c7ebd4]/50 flex items-center justify-center text-[#032517] shrink-0 mt-0.5">
              <Calendar className="w-5 h-5 text-[#032517]" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#727973] tracking-wider uppercase">
                活动时间 · SCHEDULE
              </p>
              <p className="text-[15px] font-semibold text-[#1c1c18] mt-0.5">
                {event.date} ({event.timezone})
              </p>
              <div className="flex items-center gap-1.5 mt-0.5 text-[13px] text-[#815433] font-medium">
                <Clock className="w-4 h-4" />
                <span>{event.timeRange}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Add to iCal Buttons Row */}
        <div className="pt-1 flex gap-2">
          <button
            onClick={handleAddCalendar}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#003a4d] text-[#bee9ff] text-[13px] font-semibold hover:bg-[#1b3b2b] active:scale-[0.98] transition-all shadow-sm"
          >
            {calendarAdded ? (
              <>
                <Check className="w-[18px] h-[18px] text-emerald-400" />
                <span>已生成日历提醒 (.ics)</span>
              </>
            ) : (
              <>
                <CalendarPlus className="w-[18px] h-[18px]" />
                <span>添加到日历 / iCal</span>
              </>
            )}
          </button>

          <button
            onClick={handleOpenGoogleCalendar}
            title="在 Google 日历中打开"
            aria-label="在 Google 日历中打开"
            className="px-3.5 py-2.5 rounded-full bg-[#f6f3ec] text-[#003a4d] hover:bg-[#ebe8e1] active:scale-95 text-[13px] font-medium flex items-center gap-1 border border-[#c1c8c2]/40 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">Google</span>
          </button>
        </div>

        <div className="h-px bg-[#c1c8c2]/20 w-full" />

        {/* Location Details */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#ffdcc5]/50 flex items-center justify-center text-[#815433] shrink-0 mt-0.5">
            <MapPin className="w-5 h-5 text-[#815433]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold text-[#727973] tracking-wider uppercase">
                集合地点 · DEPARTURE
              </p>
              <span className="text-[11px] text-[#032517] font-bold">
                {event.departureCity}
              </span>
            </div>
            <p className="text-[15px] font-medium text-[#1c1c18] mt-0.5">
              {event.departureLocation}
            </p>
            <p className="text-[13px] text-[#424843] mt-0.5">
              {event.departureCoords}
            </p>
          </div>
        </div>

        {/* Interactive Style Mini Map Preview */}
        <div
          onClick={onOpenMapModal}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onOpenMapModal()}
          className="relative w-full h-36 rounded-xl overflow-hidden bg-[#f1eee7] border border-[#c1c8c2]/40 mt-1 cursor-pointer group select-none"
        >
          {/* Simulated Map Canvas Background */}
          <div
            className="absolute inset-0 bg-cover bg-center filter brightness-[0.92] contrast-[1.05] group-hover:scale-105 transition-transform duration-500"
            style={{ backgroundImage: `url('${event.mapImage}')` }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#fcf9f2]/70 via-transparent to-transparent pointer-events-none" />

          {/* Animated Pin on 北埔 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
            <div className="relative flex items-center justify-center">
              <div className="w-7 h-7 rounded-full bg-[#ba1a1a]/30 animate-ping-subtle absolute" />
              <div className="w-7 h-7 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shadow-lg border-2 border-white z-10">
                <MapPin className="w-4 h-4 fill-white" />
              </div>
            </div>
            <div className="mt-1 px-2 py-0.5 rounded bg-white/90 backdrop-blur-md shadow text-[11px] text-[#032517] font-bold border border-[#c1c8c2]/30">
              北埔集合点
            </div>
          </div>

          {/* Map Action Button */}
          <div className="absolute bottom-2.5 right-2.5 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenMapModal();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#032517] text-[11px] font-semibold border border-[#c1c8c2]/40 shadow hover:bg-white active:scale-95 transition-all"
            >
              <Map className="w-3.5 h-3.5" />
              <span>在地图中打开 (View in Maps)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
