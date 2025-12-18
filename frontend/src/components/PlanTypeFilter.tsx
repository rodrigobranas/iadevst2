import { Users, Building2 } from 'lucide-react';
import type { PlanType } from '../types/plan';

interface PlanTypeFilterProps {
  value: PlanType;
  onChange: (value: PlanType) => void;
}

export function PlanTypeFilter({ value, onChange }: PlanTypeFilterProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Plan Type</label>
      <div className="flex rounded-lg border border-border p-1 bg-secondary/30">
        <button
          onClick={() => onChange('individual')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            value === 'individual'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Users className="h-4 w-4" />
          Individual
        </button>
        <button
          onClick={() => onChange('enterprise')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            value === 'enterprise'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Building2 className="h-4 w-4" />
          Enterprise
        </button>
      </div>
    </div>
  );
}
