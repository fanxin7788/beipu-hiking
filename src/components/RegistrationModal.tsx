import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, User, Phone, AlertCircle, Car } from 'lucide-react';
import { HikingEvent, RegisteredTicket } from '../types.ts';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: HikingEvent;
  onSuccess: (ticket: RegisteredTicket) => void;
  onShowToast: (msg: string) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  event,
  onSuccess,
  onShowToast
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [experience, setExperience] = useState<'beginner' | 'moderate' | 'experienced'>('moderate');
  const [carpoolNeeded, setCarpoolNeeded] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      onShowToast('请输入参与者姓名');
      return;
    }
    if (!phone.trim()) {
      onShowToast('请输入有效的联络手机号');
      return;
    }
    if (!emergencyPhone.trim()) {
      onShowToast('请填写紧急联络人电话');
      return;
    }
    if (!agreeTerms) {
      onShowToast('请勾选并同意无痕山林与安全活动准则');
      return;
    }

    const ticket: RegisteredTicket = {
      ticketId: `BP-${Math.floor(100000 + Math.random() * 900000)}`,
      eventName: event.title,
      registeredAt: new Date().toLocaleDateString('zh-TW'),
      userName: name.trim(),
      userPhone: phone.trim(),
      emergencyContact: `${emergencyContact || '家人'} (${emergencyPhone.trim()})`,
      status: 'confirmed'
    };

    onSuccess(ticket);
    onShowToast('🎉 报名成功！已为您生成登山专属凭证');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-2xl p-5 shadow-2xl border border-[#c1c8c2]/40 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#727973] hover:text-[#1c1c18] hover:bg-[#ebe8e1] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#c7ebd4] flex items-center justify-center text-[#032517]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[18px] font-bold text-[#032517] font-display">
              报名徒步活动
            </h3>
            <p className="text-[12px] text-[#727973]">
              {event.title} · 免费志愿同行
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-[13px]">
          {/* Name */}
          <div>
            <label className="block font-bold text-[#1c1c18] mb-1">
              真实姓名 <span className="text-[#ba1a1a]">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-[#727973]" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例如：陈小明"
                className="w-full pl-9 pr-3 py-2 bg-[#f6f3ec] rounded-lg border border-[#c1c8c2]/40 focus:outline-none focus:ring-1 focus:ring-[#032517]"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block font-bold text-[#1c1c18] mb-1">
              联络手机号 <span className="text-[#ba1a1a]">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 w-4 h-4 text-[#727973]" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="例如：0912345678"
                className="w-full pl-9 pr-3 py-2 bg-[#f6f3ec] rounded-lg border border-[#c1c8c2]/40 focus:outline-none focus:ring-1 focus:ring-[#032517]"
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-[#1c1c18] mb-1">
                紧急联络人
              </label>
              <input
                type="text"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                placeholder="姓名/关系"
                className="w-full px-3 py-2 bg-[#f6f3ec] rounded-lg border border-[#c1c8c2]/40 focus:outline-none focus:ring-1 focus:ring-[#032517]"
              />
            </div>
            <div>
              <label className="block font-bold text-[#1c1c18] mb-1">
                紧急联络电话 <span className="text-[#ba1a1a]">*</span>
              </label>
              <input
                type="tel"
                required
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                placeholder="电话号码"
                className="w-full px-3 py-2 bg-[#f6f3ec] rounded-lg border border-[#c1c8c2]/40 focus:outline-none focus:ring-1 focus:ring-[#032517]"
              />
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block font-bold text-[#1c1c18] mb-1.5">
              登山徒步经验评估
            </label>
            <div className="grid grid-cols-3 gap-2 text-center text-[12px]">
              {(['beginner', 'moderate', 'experienced'] as const).map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setExperience(lvl)}
                  className={`py-2 px-1 rounded-lg border font-medium transition-all ${
                    experience === lvl
                      ? 'bg-[#1b3b2b] text-white border-[#032517]'
                      : 'bg-[#f6f3ec] text-[#424843] border-[#c1c8c2]/40'
                  }`}
                >
                  {lvl === 'beginner' && '初级体验'}
                  {lvl === 'moderate' && '中级常规'}
                  {lvl === 'experienced' && '丰富经验'}
                </button>
              ))}
            </div>
          </div>

          {/* Carpool Option */}
          <div className="p-3 rounded-lg bg-[#f1eee7] border border-[#c1c8c2]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-[#815433]" />
              <div>
                <span className="font-semibold text-[#1c1c18]">是否有共乘需求？</span>
                <p className="text-[11px] text-[#727973]">领队将在LINE群组分配新竹/竹北共乘伙伴</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={carpoolNeeded}
              onChange={(e) => setCarpoolNeeded(e.target.checked)}
              className="w-4 h-4 text-[#032517] rounded focus:ring-0 cursor-pointer"
            />
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start gap-2 pt-1 text-[11px] text-[#727973]">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 w-3.5 h-3.5 text-[#032517] rounded focus:ring-0"
            />
            <label htmlFor="terms" className="cursor-pointer">
              我已阅读并承诺遵守《无痕山林(LNT)自然公约》及个人体能责任声明。
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#032517] text-white font-bold text-[14px] hover:bg-[#1b3b2b] active:scale-[0.98] transition-all shadow-md mt-2 flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>确认提交报名</span>
          </button>
        </form>
      </div>
    </div>
  );
};
