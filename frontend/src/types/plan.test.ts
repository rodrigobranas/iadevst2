import { describe, it, expect } from '@jest/globals'
import { Plan, Tool, PlansResponse } from './plan'

describe('Plan Types', () => {
  it('should create valid Plan object', () => {
    const plan: Plan = {
      id: 'test-plan',
      name: 'Test Plan',
      price: 10,
      type: 'individual',
      limits: ['1000 requests/month'],
      models: ['GPT-4'],
      highlights: ['Test highlight']
    }

    expect(plan.id).toBe('test-plan')
    expect(plan.name).toBe('Test Plan')
    expect(plan.price).toBe(10)
    expect(plan.limits).toEqual(['1000 requests/month'])
    expect(plan.models).toEqual(['GPT-4'])
    expect(plan.highlights).toEqual(['Test highlight'])
  })

  it('should create valid Tool object', () => {
    const plan: Plan = {
      id: 'test-plan',
      name: 'Test Plan',
      price: 10,
      type: 'individual',
      limits: ['1000 requests/month'],
      models: ['GPT-4'],
      highlights: ['Test highlight']
    }

    const tool: Tool = {
      id: 'test-tool',
      name: 'Test Tool',
      slug: 'test-tool',
      plans: [plan]
    }

    expect(tool.id).toBe('test-tool')
    expect(tool.name).toBe('Test Tool')
    expect(tool.slug).toBe('test-tool')
    expect(tool.plans).toEqual([plan])
  })

  it('should create valid PlansResponse object', () => {
    const plan: Plan = {
      id: 'test-plan',
      name: 'Test Plan',
      price: 10,
      type: 'individual',
      limits: ['1000 requests/month'],
      models: ['GPT-4'],
      highlights: ['Test highlight']
    }

    const tool: Tool = {
      id: 'test-tool',
      name: 'Test Tool',
      slug: 'test-tool',
      plans: [plan]
    }

    const response: PlansResponse = {
      tools: [tool]
    }

    expect(response.tools).toEqual([tool])
    expect(response.tools[0].plans[0].id).toBe('test-plan')
  })

  it('should handle empty arrays correctly', () => {
    const tool: Tool = {
      id: 'empty-tool',
      name: 'Empty Tool',
      slug: 'empty-tool',
      plans: []
    }

    const response: PlansResponse = {
      tools: []
    }

    expect(tool.plans).toEqual([])
    expect(response.tools).toEqual([])
  })
})
