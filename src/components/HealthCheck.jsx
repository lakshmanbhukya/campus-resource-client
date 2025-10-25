import React, { useState, useEffect } from 'react';
import { healthService } from '../services/healthService';

const HealthCheck = () => {
  const [health, setHealth] = useState({
    server: { status: 'checking' },
    client: { status: 'ok' }
  });

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const checkHealth = async () => {
    const serverHealth = await healthService.checkServerHealth();
    const clientHealth = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      online: navigator.onLine,
      connection: navigator.connection?.effectiveType || 'unknown'
    };

    setHealth({
      server: serverHealth,
      client: clientHealth
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
      case 'ok':
        return '#22c55e';
      case 'disconnected':
        return '#ef4444';
      default:
        return '#f59e0b';
    }
  };

  return (
    <div style={{ padding: '1rem', fontSize: '0.875rem', fontFamily: 'monospace' }}>
      <h3>System Health</h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div 
            style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              backgroundColor: getStatusColor(health.server.status) 
            }}
          />
          <span>Server: {health.server.status}</span>
        </div>
        {health.server.error && (
          <div style={{ color: '#ef4444', fontSize: '0.75rem', marginLeft: '1.25rem' }}>
            {health.server.error}
          </div>
        )}
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div 
            style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              backgroundColor: getStatusColor(health.client.status) 
            }}
          />
          <span>Client: {health.client.status}</span>
        </div>
        <div style={{ fontSize: '0.75rem', marginLeft: '1.25rem', color: '#6b7280' }}>
          Online: {health.client.online ? 'Yes' : 'No'}
        </div>
      </div>

      <button 
        onClick={checkHealth}
        style={{
          marginTop: '1rem',
          padding: '0.25rem 0.5rem',
          fontSize: '0.75rem',
          border: '1px solid #d1d5db',
          borderRadius: '4px',
          background: 'white',
          cursor: 'pointer'
        }}
      >
        Refresh
      </button>
    </div>
  );
};

export default HealthCheck;