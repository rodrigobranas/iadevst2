import { Slider } from './ui/slider';

interface BudgetSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const MIN_BUDGET = 0;
const MAX_BUDGET = 200;
const STEP = 10;

export function BudgetSlider({ value, onChange }: BudgetSliderProps) {
  const handleValueChange = (values: number[]) => {
    onChange(values[0]);
  };
  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-foreground">Monthly Budget</label>
        <span className="text-lg font-bold text-primary">${value}/month</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={handleValueChange}
        min={MIN_BUDGET}
        max={MAX_BUDGET}
        step={STEP}
        data-step={STEP}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>$0</span>
        <span>$200</span>
      </div>
    </div>
  );
}
