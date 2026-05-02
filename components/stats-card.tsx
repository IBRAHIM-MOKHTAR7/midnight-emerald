import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend: string;
}

export function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <div className="bg-midnight-800 rounded-xl border border-midnight-600 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-emerald-500/10">
          <Icon className="w-6 h-6 text-emerald-500" />
        </div>
        <span className="text-emerald-500 text-sm font-medium">{trend}</span>
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
