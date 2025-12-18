import type { Tool } from '../types/plan';
import { PlanCard } from './PlanCard';

interface ToolsGridProps {
  tools: Tool[];
}

export function ToolsGrid({ tools }: ToolsGridProps) {
  return (
    <div
      data-testid="tools-grid"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {tools.map(tool => (
        <div key={tool.id} className="space-y-4">
          <h2
            data-testid="tool-header"
            className="text-xl font-bold text-foreground border-b border-border pb-2"
          >
            {tool.name}
          </h2>
          <div className="space-y-3">
            {tool.plans.length > 0 ? (
              tool.plans.map(plan => (
                <PlanCard key={plan.id} plan={plan} />
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No plans available for this budget
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
