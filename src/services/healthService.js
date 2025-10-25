import api from './api';

export const healthService = {
  // Check server health
  checkServerHealth: async () => {
    try {
      const response = await api.get('/health', { timeout: 5000 });
      return {
        status: 'connected',
        data: response.data,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        status: 'disconnected',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  },

  // Check detailed server health
  checkDetailedHealth: async () => {
    try {
      const response = await api.get('/health/detailed', { timeout: 10000 });
      return {
        status: 'connected',
        data: response.data,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        status: 'disconnected',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  },

  // Simple ping check
  ping: async () => {
    try {
      const start = Date.now();
      await api.get('/ping', { timeout: 3000 });
      const latency = Date.now() - start;
      return {
        status: 'connected',
        latency: `${latency}ms`,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        status: 'disconnected',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
};