import React from 'react';
import { X, Bell, CloudSun, Car, ShieldAlert, Check } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClearAll: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  onClearAll
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'n-1',
      icon: CloudSun,
      iconBg: 'bg-amber-100 text-amber-800',
      title: '行前天气预报：北埔五指山晴间多云',
      time: '今日 14:00',
      content: '9月10日当天新竹北埔气温约19~25°C，降水概率仅10%，步道体感舒适，请备妥防晒帽与透气排汗衣。'
    },
    {
      id: 'n-2',
      icon: Car,
      iconBg: 'bg-emerald-100 text-emerald-800',
      title: '共乘接龙与第一停车场车位更新',
      time: '今日 10:30',
      content: '五指山第一停车场具备40个免费车位，备有公用水龙头。新竹高铁站发车共乘组已集结3辆车。'
    },
    {
      id: 'n-3',
      icon: ShieldAlert,
      iconBg: 'bg-blue-100 text-blue-800',
      title: '生态护林安全叮咛',
      time: '昨日 18:00',
      content: '本活动严恪遵守无痕山林(LNT)准则，所有产生的垃圾请随身带下山，严禁采摘野生植物。'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-2xl p-5 shadow-2xl border border-[#c1c8c2]/40 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#c1c8c2]/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1b3b2b]/10 text-[#032517] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <h3 className="text-[17px] font-bold text-[#032517]">
              活动通知与公告
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#727973] hover:text-[#1c1c18] hover:bg-[#ebe8e1]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications list */}
        <div className="flex-1 overflow-y-auto py-3 space-y-3">
          {notifications.map((n) => {
            const IconComponent = n.icon;
            return (
              <div
                key={n.id}
                className="p-3.5 rounded-xl bg-[#f6f3ec] border border-[#c1c8c2]/25 flex items-start gap-3"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${n.iconBg}`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[13px] font-bold text-[#1c1c18]">
                      {n.title}
                    </h4>
                  </div>
                  <p className="text-[12px] text-[#424843] mt-1 leading-relaxed">
                    {n.content}
                  </p>
                  <span className="text-[10px] text-[#727973] block mt-1">
                    {n.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#c1c8c2]/20 flex justify-between items-center">
          <span className="text-[11px] text-[#727973]">所有重要通知已同步更新</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-[#032517] text-white text-[12px] font-semibold hover:bg-[#1b3b2b]"
          >
            我知道了
          </button>
        </div>
      </div>
    </div>
  );
};
