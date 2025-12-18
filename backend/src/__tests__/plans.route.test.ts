import request from 'supertest';
import express from 'express';
import plansRouter from '../routes/plans.route';

describe('Plans API', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use(plansRouter);
  });

  describe('GET /api/plans', () => {
    it('should return status 200', async () => {
      const response = await request(app).get('/api/plans');
      expect(response.status).toBe(200);
    });

    it('should return Content-Type application/json', async () => {
      const response = await request(app).get('/api/plans');
      expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    it('should return response with tools array containing 4 elements', async () => {
      const response = await request(app).get('/api/plans');
      expect(response.body).toHaveProperty('tools');
      expect(Array.isArray(response.body.tools)).toBe(true);
      expect(response.body.tools).toHaveLength(4);
    });

    it('should return tools in correct order: GitHub Copilot, Cursor, Claude Code, Windsurf', async () => {
      const response = await request(app).get('/api/plans');
      const tools = response.body.tools;
      
      expect(tools[0].name).toBe('GitHub Copilot');
      expect(tools[1].name).toBe('Cursor');
      expect(tools[2].name).toBe('Claude Code');
      expect(tools[3].name).toBe('Windsurf');
    });

    it('should return each tool with required properties', async () => {
      const response = await request(app).get('/api/plans');
      const tools = response.body.tools;

      tools.forEach((tool: any) => {
        expect(tool).toHaveProperty('id');
        expect(tool).toHaveProperty('name');
        expect(tool).toHaveProperty('slug');
        expect(tool).toHaveProperty('plans');
        expect(Array.isArray(tool.plans)).toBe(true);
      });
    });

    it('should return each plan with required properties', async () => {
      const response = await request(app).get('/api/plans');
      const tools = response.body.tools;

      tools.forEach((tool: any) => {
        tool.plans.forEach((plan: any) => {
          expect(plan).toHaveProperty('id');
          expect(plan).toHaveProperty('name');
          expect(plan).toHaveProperty('price');
          expect(typeof plan.price).toBe('number');
          expect(plan).toHaveProperty('limits');
          expect(Array.isArray(plan.limits)).toBe(true);
          expect(plan).toHaveProperty('models');
          expect(Array.isArray(plan.models)).toBe(true);
          expect(plan).toHaveProperty('highlights');
          expect(Array.isArray(plan.highlights)).toBe(true);
        });
      });
    });

    it('should return GitHub Copilot with correct plans', async () => {
      const response = await request(app).get('/api/plans');
      const copilot = response.body.tools.find((tool: any) => tool.id === 'github-copilot');
      
      expect(copilot).toBeDefined();
      expect(copilot.plans).toHaveLength(3);
      expect(copilot.plans[0].name).toBe('Free');
      expect(copilot.plans[0].price).toBe(0);
      expect(copilot.plans[1].name).toBe('Pro');
      expect(copilot.plans[1].price).toBe(10);
      expect(copilot.plans[2].name).toBe('Pro+');
      expect(copilot.plans[2].price).toBe(39);
    });

    it('should return Cursor with correct plans', async () => {
      const response = await request(app).get('/api/plans');
      const cursor = response.body.tools.find((tool: any) => tool.id === 'cursor');
      
      expect(cursor).toBeDefined();
      expect(cursor.plans).toHaveLength(4);
      expect(cursor.plans[0].name).toBe('Hobby');
      expect(cursor.plans[0].price).toBe(0);
      expect(cursor.plans[1].name).toBe('Pro');
      expect(cursor.plans[1].price).toBe(20);
      expect(cursor.plans[2].name).toBe('Pro+');
      expect(cursor.plans[2].price).toBe(60);
      expect(cursor.plans[3].name).toBe('Ultra');
      expect(cursor.plans[3].price).toBe(200);
    });

    it('should return Claude Code with correct plans', async () => {
      const response = await request(app).get('/api/plans');
      const claude = response.body.tools.find((tool: any) => tool.id === 'claude-code');
      
      expect(claude).toBeDefined();
      expect(claude.plans).toHaveLength(3);
      expect(claude.plans[0].name).toBe('Pro');
      expect(claude.plans[0].price).toBe(20);
      expect(claude.plans[1].name).toBe('Max 5x');
      expect(claude.plans[1].price).toBe(100);
      expect(claude.plans[2].name).toBe('Max 20x');
      expect(claude.plans[2].price).toBe(200);
    });

    it('should return Windsurf with correct plans', async () => {
      const response = await request(app).get('/api/plans');
      const windsurf = response.body.tools.find((tool: any) => tool.id === 'windsurf');
      
      expect(windsurf).toBeDefined();
      expect(windsurf.plans).toHaveLength(3);
      expect(windsurf.plans[0].name).toBe('Free');
      expect(windsurf.plans[0].price).toBe(0);
      expect(windsurf.plans[1].name).toBe('Pro');
      expect(windsurf.plans[1].price).toBe(15);
      expect(windsurf.plans[2].name).toBe('Teams');
      expect(windsurf.plans[2].price).toBe(30);
    });
  });
});
