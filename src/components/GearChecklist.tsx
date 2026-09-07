import React, { useState } from 'react';
import {
  Footprints,
  Droplet,
  Sun,
  HeartPulse,
  Compass,
  Check,
  Plus,
  Info,
  ShieldAlert
} from 'lucide-react';
import { GearItem } from '../types.ts';

interface GearChecklistProps {
  gearList: GearItem[];
  gearIntro: string;
  onToggleGear: (id: string) => void;
  onShowToast: (msg: string) => void;
}

export const GearChecklist: React.FC<GearChecklistProps> = ({
  gearList,
  gearIntro,
  onToggleGear,
  onShowToast
}) => {
  const [selectedTip, setSelectedTip] = useState<GearItem | null>(null);

  const mandatoryItems = gearList.filter((g) => g.isMandatory);
  const packedMandatoryCount = mandatoryItems.filter((g) => g.checked).length;
  const isAllReady = packedMandatoryCount === mandatoryItems.length;

  const getGearIcon = (name: string) => {
    if (name.includes('登山杖')) return <Compass className="w-4 h-4 text-[#032517]" />;
    if (name.includes('鞋')) return <Footprints className="w-4 h-4 text-[#032517]" />;
    if (name.includes('水')) return <Droplet className="w-4 h-4 text-[#003a4d]" />;
    if (name.includes('防晒') || name.includes('帽')) return <Sun className="w-4 h-4 text-[#815433]" />;
    if (name.includes('急救') || name.includes('药')) return <HeartPulse className="w-4 h-4 text-[#ba1a1a]" />;
    return <Check className="w-4 h-4 text-[#032517]" />;
  };

  const handleChipClick = (gear: GearItem) => {
    onToggleGear(gear.id);
    setSelectedTip(gear);
    onShowToast(`${gear.checked ? '已取消勾选' : '已勾选备妥'}: ${gear.name}`);
  };

  return (
    <section className="px-4 flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-bold text-[#1c1c18] font-display">
          行前装备推荐
        </h3>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#e5e2db] text-[#424843]">
          必备 {mandatoryItems.length} 项
        </span>
      </div>

      <p className="text-[13px] text-[#424843] leading-relaxed">
        {gearIntro}
      </p>

      {/* Readiness Progress Bar */}
      <div className="p-2.5 rounded-xl bg-white border border-[#c1c8c2]/30 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              isAllReady
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {isAllReady ? <Check className="w-3.5 h-3.5" /> : '!'}
          </div>
          <span className="text-[12px] font-medium text-[#1c1c18]">
            行前清单清点状态：
            <span className="font-bold text-[#032517]">
              {packedMandatoryCount}/{mandatoryItems.length}
            </span>
          </span>
        </div>
        <div className="w-24 bg-[#ebe8e1] h-2 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              isAllReady ? 'bg-[#032517]' : 'bg-[#815433]'
            }`}
            style={{
              width: `${(packedMandatoryCount / mandatoryItems.length) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Chips Flow */}
      <div className="flex flex-wrap gap-2 pt-1">
        {gearList.map((gear) => (
          <button
            key={gear.id}
            onClick={() => handleChipClick(gear)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium border transition-all active:scale-95 ${
              gear.checked
                ? 'bg-[#c7ebd4]/50 border-[#032517] text-[#032517] shadow-xs'
                : 'bg-[#f6f3ec] border-[#c1c8c2]/40 text-[#1c1c18] hover:bg-white'
            }`}
          >
            <div className="shrink-0">{getGearIcon(gear.name)}</div>
            <span>{gear.name}</span>
            {gear.checked && (
              <Check className="w-3.5 h-3.5 text-[#032517] stroke-[3]" />
            )}
          </button>
        ))}
      </div>

      {/* Gear Tip Callout if clicked */}
      {selectedTip && selectedTip.tips && (
        <div className="mt-1 p-2.5 rounded-lg bg-[#ffdcc5]/40 border border-[#ffdcc5] text-[12px] text-[#653d1e] flex items-start gap-2 animate-fadeIn">
          <Info className="w-4 h-4 text-[#815433] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">【{selectedTip.name} 说明】</span>
            <span>{selectedTip.tips}</span>
          </div>
        </div>
      )}
    </section>
  );
};
