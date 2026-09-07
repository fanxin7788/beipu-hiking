import React from 'react';
import {
  ShieldCheck,
  QrCode,
  Calendar,
  MapPin,
  Phone,
  UserCheck,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { HikingEvent, RegisteredTicket, GearItem } from '../types.ts';

interface MyProfileViewProps {
  userTicket: RegisteredTicket | null;
  event: HikingEvent;
  gearList: GearItem[];
  onOpenRegisterModal: () => void;
  onCancelRegistration: () => void;
  onShowToast: (msg: string) => void;
}

export const MyProfileView: React.FC<MyProfileViewProps> = ({
  userTicket,
  event,
  gearList,
  onOpenRegisterModal,
  onCancelRegistration,
  onShowToast
}) => {
  const packedCount = gearList.filter((g) => g.checked).length;

  return (
    <div className="px-4 py-2 flex flex-col gap-4 animate-fadeIn pb-10">
      {/* Profile Header */}
      <div className="p-4 rounded-xl bg-white border border-[#c1c8c2]/30 shadow-xs flex items-center gap-3.5">
        <div className="w-14 h-14 rounded-full bg-[#1b3b2b] text-white flex items-center justify-center font-bold text-xl shadow-sm">
          {userTicket ? userTicket.userName[0] : '山'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-[18px] font-bold text-[#1c1c18] font-display">
              {userTicket ? userTicket.userName : '山野探索者'}
            </h2>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#c7ebd4] text-[#032517] font-semibold">
              {userTicket ? '已报名参队' : '访客'}
            </span>
          </div>
          <p className="text-[12px] text-[#727973] mt-0.5">
            {userTicket ? `联络号：${userTicket.userPhone}` : '未绑定手机号'}
          </p>
        </div>
      </div>

      {/* Digital Pass / Ticket Card */}
      {userTicket ? (
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#032517] to-[#1b3b2b] text-white p-5 shadow-lg border border-[#abcfb8]/20">
          {/* Top Pass Title */}
          <div className="flex items-start justify-between border-b border-white/20 pb-3">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#abcfb8] font-bold">
                BEIPU MOUNTAIN PASS · 电子入山凭证
              </span>
              <h3 className="text-[17px] font-bold mt-0.5 font-display text-white">
                {event.title}
              </h3>
            </div>
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#abcfb8]" />
            </div>
          </div>

          {/* Ticket Information */}
          <div className="grid grid-cols-2 gap-3 my-4 text-[12px]">
            <div>
              <span className="text-[#abcfb8] block text-[11px]">凭证编号</span>
              <span className="font-mono font-bold text-[14px] tracking-wider">
                {userTicket.ticketId}
              </span>
            </div>
            <div>
              <span className="text-[#abcfb8] block text-[11px]">出队日期</span>
              <span className="font-semibold text-[13px]">2026-09-10 07:30</span>
            </div>
            <div>
              <span className="text-[#abcfb8] block text-[11px]">集合坐标</span>
              <span className="font-semibold truncate block">五指山第一停车场</span>
            </div>
            <div>
              <span className="text-[#abcfb8] block text-[11px]">紧急联络人</span>
              <span className="font-semibold truncate block">
                {userTicket.emergencyContact}
              </span>
            </div>
          </div>

          {/* Barcode representation */}
          <div className="bg-white/95 rounded-xl p-3 text-black flex items-center justify-between">
            <div className="flex items-center gap-2">
              <QrCode className="w-10 h-10 text-[#032517]" />
              <div>
                <span className="text-[11px] font-bold text-[#032517] block">
                  现场点名验签码
                </span>
                <span className="text-[10px] text-[#727973] font-mono">
                  有效核验：出队当天 07:15~07:45
                </span>
              </div>
            </div>
            <span className="text-[11px] font-bold px-2 py-1 rounded bg-[#c7ebd4] text-[#032517]">
              已核发
            </span>
          </div>

          {/* Cancel Registration Option */}
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[11px]">
            <span className="text-[#abcfb8]">如行程变动请尽早退签以空出名额</span>
            <button
              onClick={onCancelRegistration}
              className="text-red-300 hover:text-red-200 underline font-semibold"
            >
              取消报名并释放名额
            </button>
          </div>
        </div>
      ) : (
        /* Not registered card */
        <div className="p-5 rounded-2xl bg-white border border-[#c1c8c2]/30 text-center shadow-xs flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[#ffdcc5] text-[#815433] flex items-center justify-center mb-3">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-[16px] font-bold text-[#1c1c18]">
            您尚未报名本期北埔徒步
          </h3>
          <p className="text-[12px] text-[#727973] mt-1 max-w-xs">
            当前活动仍有剩余名额，免收向导费与组织费，欢迎热爱自然的山友报名同行！
          </p>
          <button
            onClick={onOpenRegisterModal}
            className="mt-3.5 px-6 py-2.5 rounded-full bg-[#032517] text-white text-[13px] font-bold shadow-md hover:bg-[#1b3b2b] active:scale-95 transition-all"
          >
            立即报名参加 (免费)
          </button>
        </div>
      )}

      {/* Equipment Preparedness Overview */}
      <div className="p-4 rounded-xl bg-white border border-[#c1c8c2]/30 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[14px] font-bold text-[#1c1c18]">
            行前个人装备整备进度
          </h4>
          <span className="text-[12px] font-bold text-[#032517]">
            {packedCount} / {gearList.length} 件
          </span>
        </div>
        <div className="w-full bg-[#ebe8e1] h-2.5 rounded-full overflow-hidden mb-3">
          <div
            className="bg-[#032517] h-full transition-all duration-300 rounded-full"
            style={{ width: `${(packedCount / gearList.length) * 100}%` }}
          />
        </div>
        <p className="text-[12px] text-[#424843]">
          {packedCount >= 5
            ? '✅ 必备装备已准备就绪，注意出发前一天保证充足睡眠！'
            : '⚠️ 还有部分必备装备未勾选，请回到活动页面行前装备清单确认。'}
        </p>
      </div>

      {/* Emergency & Trail Guide */}
      <div className="p-4 rounded-xl bg-[#f6f3ec] border border-[#c1c8c2]/30 text-[12px] space-y-2">
        <div className="flex items-center gap-1.5 font-bold text-[#815433]">
          <AlertTriangle className="w-4 h-4" />
          <span>五指山步道紧急救援提示</span>
        </div>
        <p className="text-[#424843] leading-relaxed">
          • 北埔山区紧急救难台：新竹县消防局五峰分队 (03-5851019)
          <br />
          • 五指山步道部分路段手机信号微弱，遇大雾迷途请留在原步道木桩等待向导救援。
          <br />
          • 向导携带卫星对讲机与高山急救药包，全程保驾护航。
        </p>
      </div>
    </div>
  );
};
