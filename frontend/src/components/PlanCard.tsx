import { Zap, Cpu, Sparkles } from 'lucide-react';
import type { Plan } from '../types/plan';

interface PlanCardProps {
  plan: Plan;
}

export function PlanCard({ plan }: PlanCardProps) {
  const priceDisplay = plan.price === 0 ? 'Free' : `$${plan.price}/month`;
  return (
    <div
      data-testid="plan-card"
      className="rounded-xl border border-border bg-card p-4 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out animate-fade-in"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-card-foreground">{plan.name}</h3>
        <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">
          {priceDisplay}
        </span>
      </div>
      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground mb-1">
            <Zap className="h-3 w-3" />
            <span>Limits</span>
          </div>
          <ul className="space-y-1">
            {plan.limits.map((limit, index) => (
              <li key={index} className="text-sm text-card-foreground">{limit}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground mb-1">
            <Cpu className="h-3 w-3" />
            <span>Models</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {plan.models.map((model, index) => (
              <span
                key={index}
                className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded"
              >
                {model}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground mb-1">
            <Sparkles className="h-3 w-3" />
            <span>Highlights</span>
          </div>
          <ul className="space-y-1">
            {plan.highlights.map((highlight, index) => (
              <li key={index} className="text-sm text-card-foreground">{highlight}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
