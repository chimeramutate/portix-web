import { Typography, Card, Steps, List } from 'antd';
import {
  FolderOutlined,
  RightOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const steps = [
  'Clone the repository',
  'Develop the Flutter UI inside portix_app.',
  'Build the Rust backend.',
  'Run the Flutter application.',
];

const repoStructure: [string, string][] = [
  ['portix_app/', 'Flutter desktop app'],
  ['portix_serv/', 'Rust SSH backend'],
  ['flatpak/', 'Flatpak packaging'],
  ['snap/', 'Snapcraft packaging'],
  ['packaging/', 'Additional resources'],
];

export default function GettingStarted() {
  return (
    <section id="getting-started" style={{ position: 'relative', paddingTop: 96, paddingBottom: 96 }}>
      <div className="mx-auto max-w-6xl px-6">
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <Text style={{ color: '#22d3ee', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Getting Started
          </Text>
          <Title level={2} style={{ color: '#fff', marginTop: 12, fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Up and running in minutes
          </Title>
          <Paragraph style={{ color: '#94a3b8', fontSize: 16, marginTop: 16 }}>
            <a
              href="https://github.com/chimeramutate/portix"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#34d399',
                textDecoration: 'none',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              View on GitHub <RightOutlined style={{ fontSize: 14 }} />
            </a>
          </Paragraph>
        </div>

        <div className="grid gap-8 lg:grid-cols-2" style={{ marginTop: 56 }}>
          {/* Development Workflow */}
          <Card
            style={{
              background: '#0b1018',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 12,
            }}
            styles={{ body: { padding: 24 } }}
          >
            <Title level={4} style={{ color: '#fff', margin: 0, fontSize: 16, fontWeight: 600 }}>
              Development Workflow
            </Title>
            <Steps
              direction="vertical"
              size="small"
              current={steps.length}
              style={{ marginTop: 20 }}
              items={steps.map((step, i) => ({
                title: <Text style={{ color: '#cbd5e1', fontSize: 14 }}>{step}</Text>,
                icon: <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399', fontSize: 13, fontWeight: 600 }}>{i + 1}</span>,
              }))}
            />
          </Card>

          {/* Repository Structure */}
          <Card
            style={{
              background: '#0b1018',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 12,
            }}
            styles={{ body: { padding: 24 } }}
          >
            <Title level={4} style={{ color: '#fff', margin: 0, fontSize: 16, fontWeight: 600 }}>
              Repository Structure
            </Title>
            <List
              style={{ marginTop: 16 }}
              dataSource={repoStructure}
              renderItem={([dir, desc]) => (
                <List.Item style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', padding: '8px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, fontFamily: '"JetBrains Mono", monospace', fontSize: 14 }}>
                    <FolderOutlined style={{ color: '#34d399', marginRight: 4 }} />
                    <span style={{ color: '#34d399' }}>{dir}</span>
                    <span style={{ color: '#475569' }}>—</span>
                    <span style={{ color: '#64748b' }}>{desc}</span>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>
    </section>
  );
}