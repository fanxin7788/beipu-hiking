import React, { useState } from 'react';
import { X, MapPin, ExternalLink, Download, Layers, Compass } from 'lucide-react';
import { HikingEvent } from '../types.ts';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: HikingEvent;
  onShowToast: (msg: string) => void;
}

export const MapModal: React.FC<MapModalProps> = ({
  isOpen,
  onClose,
  event,
  onShowToast
}) => {
  const [mapMode, setMapMode] = useState<'route' | 'cartography'>('route');

  if (!isOpen) return null;

  const handleOpenGoogleMaps = () => {
    // Beipu Cold Springs & Wuzhishan trailhead coordinates ~ 24.6728, 121.0872
    const url = 'https://www.google.com/maps/search/?api=1&query=新竹北埔五指山登山口第一停車場';
    window.open(url, '_blank');
  };

  const handleDownloadGPX = () => {
    const dummyGpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Beipu Hiking">
  <metadata><name>北埔五指山鹅公髻山纵走</name></metadata>
  <wpt lat="24.6728" lon="121.0872"><name>五指山第一停车场</name><ele>320</ele></wpt>
  <wpt lat="24.6542" lon="121.0950"><name>中指峰观景台</name><ele>1061</ele></wpt>
  <wpt lat="24.6321" lon="121.0789"><name>北埔冷泉步道口</name><ele>280</ele></wpt>
</gpx>`;
    const blob = new Blob([dummyGpx], { type: 'application/gpx+xml' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', '北埔五指山纵走_轨迹.gpx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('📍 已下载离线轨迹 GPX 文件，可导入健行笔记或各类户外APP');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#fcf9f2] rounded-2xl overflow-hidden shadow-2xl border border-[#c1c8c2]/50 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-3.5 bg-white border-b border-[#c1c8c2]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#032517]" />
            <div>
              <h3 className="text-[16px] font-bold text-[#032517]">
                北埔步道等高线手绘地图
              </h3>
              <p className="text-[11px] text-[#727973]">
                五指山 - 鹅公髻山 纵走连线 (全长 11.8 km)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#727973] hover:text-[#1c1c18] hover:bg-[#ebe8e1] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Map Image Canvas */}
        <div className="relative flex-1 overflow-auto bg-[#f1eee7] min-h-[300px] flex items-center justify-center">
          <img
            src={mapMode === 'route' ? event.routeMapImage : event.mapImage}
            alt="详细路线图"
            className="w-full h-auto object-contain max-h-[50vh]"
          />

          {/* Toggle Map Mode Button */}
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-lg border border-[#c1c8c2]/30 shadow-xs">
            <button
              onClick={() => setMapMode('route')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                mapMode === 'route'
                  ? 'bg-[#032517] text-white'
                  : 'text-[#424843] hover:text-[#032517]'
              }`}
            >
              手绘等高线全图
            </button>
            <button
              onClick={() => setMapMode('cartography')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                mapMode === 'cartography'
                  ? 'bg-[#032517] text-white'
                  : 'text-[#424843] hover:text-[#032517]'
              }`}
            >
              地形卫星定位
            </button>
          </div>
        </div>

        {/* Key Waypoint Summary */}
        <div className="p-3 bg-white border-t border-[#c1c8c2]/20 flex flex-wrap items-center justify-between text-[12px] gap-2">
          <div className="flex items-center gap-1 text-[#032517] font-semibold">
            <MapPin className="w-3.5 h-3.5 text-[#ba1a1a]" />
            <span>集合：五指山登山口第一停车场</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadGPX}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#f6f3ec] hover:bg-[#ebe8e1] text-[#032517] font-semibold text-[11px] border border-[#c1c8c2]/40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>下载 GPX</span>
            </button>
            <button
              onClick={handleOpenGoogleMaps}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#032517] hover:bg-[#1b3b2b] text-white font-semibold text-[11px] shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>导航至集合点</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
