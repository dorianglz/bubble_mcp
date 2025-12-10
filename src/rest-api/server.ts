import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { BubbleService } from '../bubbleService.js';

export function createServer(bubbleService: BubbleService) {
  const app = express();

  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan('combined'));

  // Health check
  app.get('/health', (_req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'bubble-rest-api'
    });
  });

  // Get Bubble schema
  app.get('/schema', async (_req, res) => {
    try {
      const schema = await bubbleService.getSchema();
      res.json({ success: true, schema });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  // List records
  app.post('/list', async (req, res) => {
    try {
      const { dataType, limit, cursor } = req.body;

      if (!dataType) {
        return res.status(400).json({
          success: false,
          error: 'dataType is required'
        });
      }

      const result = await bubbleService.list(dataType, { limit, cursor });
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  // Get single record
  app.post('/get', async (req, res) => {
    try {
      const { dataType, id } = req.body;

      if (!dataType || !id) {
        return res.status(400).json({
          success: false,
          error: 'dataType and id are required'
        });
      }

      const result = await bubbleService.get(dataType, id);
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  // Create record
  app.post('/create', async (req, res) => {
    try {
      const { dataType, data } = req.body;

      if (!dataType || !data) {
        return res.status(400).json({
          success: false,
          error: 'dataType and data are required'
        });
      }

      const result = await bubbleService.create(dataType, data);
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  // Update record
  app.post('/update', async (req, res) => {
    try {
      const { dataType, id, data } = req.body;

      if (!dataType || !id || !data) {
        return res.status(400).json({
          success: false,
          error: 'dataType, id and data are required'
        });
      }

      const result = await bubbleService.update(dataType, id, data);
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  // Delete record
  app.post('/delete', async (req, res) => {
    try {
      const { dataType, id } = req.body;

      if (!dataType || !id) {
        return res.status(400).json({
          success: false,
          error: 'dataType and id are required'
        });
      }

      const result = await bubbleService.delete(dataType, id);
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  // Execute workflow
  app.post('/workflow', async (req, res) => {
    try {
      const { workflowName, data } = req.body;

      if (!workflowName) {
        return res.status(400).json({
          success: false,
          error: 'workflowName is required'
        });
      }

      const result = await bubbleService.executeWorkflow(workflowName, data || {});
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  return app;
}
