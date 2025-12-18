import { useState, useMemo } from 'react';
import { usePlans } from './hooks/usePlans';
import { useTheme } from './hooks/useTheme';
import { ThemeToggle } from './components/ThemeToggle';
import { BudgetSlider } from './components/BudgetSlider';
import { ToolsGrid } from './components/ToolsGrid';
import { PlanTypeFilter } from './components/PlanTypeFilter';
import type { PlanType } from './types/plan';

const DEFAULT_BUDGET = 50;
const DEFAULT_PLAN_TYPE: PlanType = 'individual';

function App() {
  const [budget, setBudget] = useState(DEFAULT_BUDGET);
  const [planType, setPlanType] = useState<PlanType>(DEFAULT_PLAN_TYPE);
  const { isLoading, error, filterByBudget } = usePlans();
  useTheme();
  const filteredTools = useMemo(() => {
    return filterByBudget(budget, planType);
  }, [budget, planType, filterByBudget]);
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Error loading plans</h1>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              AI Code Assistant Comparator
            </h1>
            <ThemeToggle />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BudgetSlider value={budget} onChange={setBudget} />
            <PlanTypeFilter value={planType} onChange={setPlanType} />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="transition-all duration-300 ease-in-out">
            <ToolsGrid tools={filteredTools} />
          </div>
        )}
      </main>
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Prices shown are monthly. Data subject to change.
        </div>
      </footer>
    </div>
  );
}

export default App;
