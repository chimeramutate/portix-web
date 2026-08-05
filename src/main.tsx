import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, theme } from 'antd';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#10b981',
          colorInfo: '#10b981',
          colorSuccess: '#10b981',
          colorLink: '#22d3ee',
          borderRadius: 8,
          fontFamily: 'Inter, system-ui, sans-serif',
          colorBgContainer: '#0b1018',
          colorBgElevated: '#0f1620',
          colorBgBase: '#070a0f',
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
);
