export type PlanType = 'individual' | 'enterprise';

export interface Plan {
  id: string;
  name: string;
  price: number;
  type: PlanType;
  limits: string[];
  models: string[];
  highlights: string[];
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  plans: Plan[];
}

export interface PlansResponse {
  tools: Tool[];
}

export interface UsePlansReturn {
  tools: Tool[];
  isLoading: boolean;
  error: Error | null;
  filterByBudget: (budget: number, planType?: PlanType) => Tool[];
}
