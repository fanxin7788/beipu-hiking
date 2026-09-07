import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Compass, Mountain, Droplet, Clock } from 'lucide-react';
import { HikingEvent, Waypoint } from '../types.ts';

interface RouteSectionProps {
  event: HikingEvent;
  onOpenMapModal: () => void;
}

export const RouteSection: React.FC<RouteSectionProps> = ({ event, onOpenMapModal }) => {
  const [showWaypoints, setShowWaypoints] = useState(false);
  const [activeWaypoint, setActiveWaypoint] = useState<Waypoint | null>(event.waypoints[2]);

  return (
    <section id="routes-section" className="px-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-[#815433] uppercase tracking-wider font-display">
            Topography & Route
          </span>
          <h2 className="text-[20px] font-bold text-[#032517] tracking-tight font-display">
            路线图与沿途路标
          </h2>
        </div>
        <span className="text-[12px] font-medium text-[#424843] bg-[#f1eee7] px-2.5 py-1 rounded-full border border-[#c1c8c2]/30">
          {event.routeType}
        </span>
      </div>

      {/* Route Illustrated Card */}
      <div className="bg-white rounded-xl overflow-hidden border border-[#c1c8c2]/30 shadow-sm">
        <div
          onClick={onOpenMapModal}
          className="relative w-full bg-[#f1eee7] cursor-pointer group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onOpenMapModal()}
        >
          <img
            src={event.routeMapImage}
            alt="北埔五指山步道手绘地形与等高线路线图"
            className="w-full h-auto object-cover block group-hover:opacity-95 transition-opacity"
          />
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#032517] text-[11px] font-semibold shadow flex items-center gap-1.5 border border-white/60">
            <span className="w-2 h-2 rounded-full bg-[#032517] animate-pulse" />
            <span>{event.routeName}</span>
          </div>

          <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium flex items-center gap-1">
            <Compass className="w-3 h-3 text-emerald-400" />
            <span>点击查看高精度全图</span>
          </div>
        </div>

        {/* Trail Metrics Grid */}
        <div className="grid grid-cols-4 divide-x divide-[#c1c8c2]/20 p-3 bg-[#f6f3ec] text-center">
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-medium text-[#727973]">全长距离</span>
            <span className="text-[15px] font-bold text-[#032517] mt-0.5">
              {event.distanceKm} km
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-medium text-[#727973]">预计用时</span>
            <span className="text-[15px] font-bold text-[#032517] mt-0.5">
              {event.durationHours} 小时
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-medium text-[#727973]">补给站点</span>
            <span className="text-[15px] font-bold text-[#815433] mt-0.5">
              {event.waterStationsCount} 处泉站
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-medium text-[#727973]">最高峰</span>
            <span className="text-[15px] font-bold text-[#032517] mt-0.5">
              {event.maxAltitudeMeters.toLocaleString()} m
            </span>
          </div>
        </div>

        {/* Elevation Timeline Accordion Toggle */}
        <div className="px-4 py-2.5 bg-white border-t border-[#c1c8c2]/20 flex items-center justify-between">
          <button
            onClick={() => setShowWaypoints(!showWaypoints)}
            className="w-full flex items-center justify-between text-[13px] font-semibold text-[#032517] hover:text-[#1b3b2b]"
          >
            <div className="flex items-center gap-1.5">
              <Mountain className="w-4 h-4 text-[#815433]" />
              <span>查看 5 个分段路标与海拔爬升详情</span>
            </div>
            {showWaypoints ? (
              <ChevronUp className="w-4 h-4 text-[#727973]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#727973]" />
            )}
          </button>
        </div>

        {/* Expandable Waypoint Details */}
        {showWaypoints && (
          <div className="p-4 bg-[#fcf9f2] border-t border-[#c1c8c2]/20 flex flex-col gap-3">
            <div className="space-y-2">
              {event.waypoints.map((wp, idx) => (
                <div
                  key={wp.id}
                  onClick={() => setActiveWaypoint(wp)}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    activeWaypoint?.id === wp.id
                      ? 'bg-white border-[#032517] shadow-sm'
                      : 'bg-[#f6f3ec] border-transparent hover:bg-white/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#1b3b2b] text-white text-[11px] font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-[13px] font-bold text-[#1c1c18]">
                        {wp.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-mono">
                      <span className="text-[#815433] font-bold">
                        海拔 {wp.elevation}m
                      </span>
                      <span className="text-[#727973]">| {wp.time}</span>
                    </div>
                  </div>
                  <p className="text-[12px] text-[#424843] mt-1 pl-7">
                    {wp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
