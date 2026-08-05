import { Typography, Card } from 'antd';
import {
  CodeOutlined,
  FolderOpenOutlined,
  ControlOutlined,
  ArrowDownOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import { useInView } from '@/hooks/useScroll';
import type { ReactNode } from 'react';

const { Title, Paragraph, Text } = Typography;

const flutterModules: { icon: ReactNode; label: string }[] = [
  { icon: <CodeOutlined />, label: 'Terminal' },
  { icon: <FolderOpenOutlined />, label: 'Workspace' },
  { icon: <FolderOpenOutlined />, label: 'File Manager' },
];

const rustModules = ['SSH', 'SFTP', 'PTY', 'Shell'];

export default function Architecture() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="architecture" style={{ position: 'relative', paddingTop: 96, paddingBottom: 96 }}>
      <div className="grid-bg radial-fade" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6">
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <Text style={{ color: '#22d3ee', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Architecture
          </Text>
          <Title level={2} style={{ color: '#fff', marginTop: 12, fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Two layers, one seamless experience
          </Title>
          <Paragraph style={{ color: '#94a3b8', fontSize: 16, marginTop: 16 }}>
            A Flutter desktop UI sits on top of a high-performance Rust backend, connected
            through Flutter Rust Bridge for native-speed communication.
          </Paragraph>
        </div>

        <div
          ref={ref}
          style={{
            marginTop: 64,
            transition: 'all 0.7s ease',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(32px)',
          }}
        >
          {/* Flutter layer */}
          <Card
            style={{
              maxWidth: 768,
              margin: '0 auto',
              background: '#0b1018',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16,
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)',
            }}
            styles={{ body: { padding: 32 } }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, color: '#94a3b8', fontSize: 14, fontWeight: 500 }}>
              <CodeOutlined style={{ color: '#34d399' }} /> Flutter UI
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {flutterModules.map((m) => (
                <div
                  key={m.label}
                  style={{
                    borderRadius: 10,
                    border: '1px solid rgba(255,255,255,0.05)',
                    background: '#0f1620',
                    padding: 16,
                    textAlign: 'center' as const,
                  }}
                >
                  <div style={{ fontSize: 24, color: '#34d399', margin: '0 auto 8px', width: 'fit-content' }}>{m.icon}</div>
                  <Text style={{ color: '#cbd5e1', fontSize: 14, fontWeight: 500 }}>{m.label}</Text>
                </div>
              ))}
            </div>
          </Card>

          {/* Bridge connector */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0' }}>
            <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(16,185,129,0.5), rgba(6,182,212,0.5))' }} />
            <div
              style={{
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.1)',
                background: '#0f1620',
                padding: '6px 16px',
                fontSize: 12,
                fontWeight: 500,
                color: '#94a3b8',
              }}
            >
              <ApartmentOutlined style={{ marginRight: 6 }} />
              Flutter Rust Bridge
            </div>
            <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(6,182,212,0.5), rgba(16,185,129,0.5))' }} />
            <ArrowDownOutlined style={{ color: '#475569', fontSize: 14 }} />
          </div>

          {/* Rust layer */}
          <Card
            style={{
              maxWidth: 768,
              margin: '0 auto',
              background: '#0b1018',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16,
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)',
            }}
            styles={{ body: { padding: 32 } }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, color: '#94a3b8', fontSize: 14, fontWeight: 500 }}>
              <ControlOutlined style={{ color: '#22d3ee' }} /> Rust Backend
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {rustModules.map((label) => (
                <div
                  key={label}
                  style={{
                    borderRadius: 10,
                    border: '1px solid rgba(255,255,255,0.05)',
                    background: '#0f1620',
                    padding: 16,
                    textAlign: 'center' as const,
                  }}
                >
                  <Text style={{ color: '#cbd5e1', fontSize: 14, fontWeight: 500 }}>{label}</Text>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
