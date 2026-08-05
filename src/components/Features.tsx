import { Typography, Row, Col, Card } from 'antd';
import {
  CodeOutlined,
  SplitCellsOutlined,
  FolderOpenOutlined,
  HddOutlined,
  ConsoleSqlOutlined,
  ControlOutlined,
  DesktopOutlined,
} from '@ant-design/icons';
import { useInView } from '@/hooks/useScroll';
import type { ReactNode } from 'react';

const { Title, Paragraph, Text } = Typography;

const features: { icon: ReactNode; title: string; desc: string }[] = [
  {
    icon: <CodeOutlined />,
    title: 'Multi-tab Terminal Sessions',
    desc: 'Run multiple SSH sessions side by side in organized tabs. Switch between servers instantly without losing your shell state.',
  },
  {
    icon: <SplitCellsOutlined />,
    title: 'Split Workspace',
    desc: 'Divide your workspace into panes to monitor logs, run commands, and edit files — all visible at the same time.',
  },
  {
    icon: <FolderOpenOutlined />,
    title: 'Built-in SFTP File Manager',
    desc: 'Browse, upload, and download remote files with a native file manager. No extra tools, no context switching.',
  },
  {
    icon: <HddOutlined />,
    title: 'Remote File Browsing',
    desc: 'Navigate remote filesystems with speed. Tree view, permissions, and instant search built right in.',
  },
  {
    icon: <ConsoleSqlOutlined />,
    title: 'Command Autocomplete',
    desc: 'Smart suggestions as you type, powered by your history and context. Ship commands faster with fewer keystrokes.',
  },
  {
    icon: <ControlOutlined />,
    title: 'Native Rust SSH Engine',
    desc: 'A high-performance backend written in Rust handles SSH, PTY allocation, and streaming with zero compromise.',
  },
];

export default function Features() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="features" style={{ position: 'relative', paddingTop: 96, paddingBottom: 96 }}>
      <div className="mx-auto max-w-6xl px-6">
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <Text style={{ color: '#34d399', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Features
          </Text>
          <Title level={2} style={{ color: '#fff', marginTop: 12, fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Everything you need to manage servers
          </Title>
          <Paragraph style={{ color: '#94a3b8', fontSize: 16, marginTop: 16 }}>
            A complete toolkit for remote work — from terminal sessions to file management,
            powered by a fast, reliable Rust core.
          </Paragraph>
        </div>

        <div ref={ref}>
          <Row gutter={[20, 20]} style={{ marginTop: 64 }}>
            {features.map((f, i) => (
              <Col xs={24} sm={12} lg={8} key={f.title}>
                <Card
                  className={`group ${inView ? 'animate-fade-up' : 'opacity-0'}`}
                  style={{
                    height: '100%',
                    background: '#0b1018',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 12,
                    transition: 'all 0.5s ease',
                    animationDelay: `${i * 80}ms`,
                    animationFillMode: 'forwards',
                    overflow: 'hidden',
                  }}
                  styles={{ body: { padding: 24 } }}
                  hoverable
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(16,185,129,0.3)';
                    e.currentTarget.style.background = '#0f1620';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.background = '#0b1018';
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,182,212,0.1))',
                      border: '1px solid rgba(255,255,255,0.1)',
                      fontSize: 20,
                      color: '#34d399',
                      transition: 'transform 0.3s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    {f.icon}
                  </div>
                  <Title level={4} style={{ color: '#fff', marginTop: 16, marginBottom: 8, fontSize: 16, fontWeight: 600 }}>
                    {f.title}
                  </Title>
                  <Paragraph style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                    {f.desc}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, color: '#64748b' }}>
          <DesktopOutlined style={{ fontSize: 18 }} />
          <span style={{ fontSize: 14 }}>Cross-platform: Linux · macOS · Windows</span>
        </div>
      </div>
    </section>
  );
}
