import { useState, useEffect, useCallback } from 'react';
import type { Tool, PlanType, UsePlansReturn, PlansResponse } from '../types/plan';

const API_URL = 'http://localhost:3000/api/plans';

export function usePlans(): UsePlansReturn {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch plans');
        }
        const data: PlansResponse = await response.json();
        setTools(data.tools);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, []);
  const filterByBudget = useCallback((budget: number, planType?: PlanType): Tool[] => {
    return tools.map(tool => ({
      ...tool,
      plans: tool.plans
        .filter(plan => plan.price <= budget)
        .filter(plan => !planType || plan.type === planType)
        .sort((a, b) => b.price - a.price),
    }));
  }, [tools]);
  return { tools, isLoading, error, filterByBudget };
}
